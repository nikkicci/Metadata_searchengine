/* Här jobbar vi med våra funktioner */

// ===========================
// US6 – Textsök + sidfilter
// ===========================

// Hämta UI-element
const elsText = {
  searchInput: document.getElementById('searchInput'),
  searchBtn:   document.getElementById('searchBtn') || document.getElementById('searchButton'),
  pagesOp:     document.getElementById('pagesOp'),
  pages:       document.getElementById('pages'),
  results:     document.getElementById('results'), // delas med US7
};

// Koppla klick på sökknappen till searchText-funktionen
elsText.searchBtn?.addEventListener('click', searchText);

// Backend-anrop till US6 endpoint
async function searchText() {
  const q       = (elsText.searchInput?.value ?? '').trim();
  const pages   = (elsText.pages?.value ?? '').trim();
  const pagesOp = elsText.pagesOp?.value ?? '';

  const params = new URLSearchParams();
  if (q) params.set('q', q);
  if (pages && pagesOp) {
    params.set('pages', pages);     // heltal
    params.set('pagesOp', pagesOp); // lt | eq | gt
  }

  try {
    const res = await fetch(`/api/search-text?${params.toString()}`);
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const items = await res.json();
    renderText(items);
  } catch (err) {
    console.error(err);
    elsText.results.innerHTML = `<div>Ett fel uppstod: ${err.message}</div>`;
  }
}

// Rendera sökresultat med toggler för "Visa mer"
function renderText(items) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = '';  // Rensa tidigare resultat

  if (!Array.isArray(items) || items.length === 0) {
    resultsDiv.innerHTML = '<div>Inga träffar.</div>';
    return;
  }

  // Loopar igenom alla böcker och skapar HTML för varje bok
  items.forEach((book, index) => {
    // Parsar metadata från beskrivningen (kan vara JSON-sträng eller objekt)
    const meta = typeof book.metadata === "string"
      ? JSON.parse(book.metadata)
      : book.metadata;

    // Bildhantering: ändra till jpg eller fallback-bild
    const imageName = book.filename?.replace(/\.[^/.]+$/, ".jpg") || "ingen-bild.jpg";
    const imagePath = `./images/${imageName}`;

    // GPS-länk, om GPS-data finns
    const hasGps = Array.isArray(meta.gps) && meta.gps.length === 2;
    const gpsLink = hasGps
      ? `<a href="https://www.google.com/maps?q=${meta.gps[0]},${meta.gps[1]}" target="_blank">Visa på karta</a>`
      : "Ej angiven";

    // HTML för varje bok med "Visa mer"-knapp och extra-info som är gömd initialt
    const bookHTML = `
      <div class="book">
        <img
          src="${imagePath}"
          alt="Bokomslag"
          onerror="this.onerror=null;this.src='/images/ingen-bild.jpg';"
        />
        <div class="info">
          <h2>${meta.titel || "Okänd titel"}</h2>
          <p><strong>Författare:</strong> ${meta.författare || "Okänd"}</p>
          <p><strong>Utgivningsår:</strong> ${meta.utgivningsår || "Okänt"}</p>
          <p><strong>Format:</strong> ${meta.format || "Okänt format"}</p>
          <p><strong>Bibliotek:</strong> ${meta.plats || "Ej angiven"}</p>

          <button class="toggle-btn" data-index="${index}">Visa mer</button>

          <div class="extra-info" id="extra-${index}" style="display:none; margin-top:1em;">
            <p><strong>Genre:</strong> ${meta.genre || "Ej angivet"}</p>
            <p><strong>Språk:</strong> ${meta.språk || "Ej angivet"}</p>
            <p><strong>ISBN:</strong> ${meta.isbn || "Ej angivet"}</p>
            <p><strong>Förlag:</strong> ${meta.förlag || "Ej angivet"}</p>
            <p><strong>Nyckelord:</strong> ${Array.isArray(meta.nyckelord) ? meta.nyckelord.join(", ") : "Ej angivna"}</p>
            <p><strong>Antal sidor:</strong> ${meta.antal_sidor || "Ej angivet"}</p>
            <p><strong>GPS:</strong> ${gpsLink}</p>
          </div>
        </div>
      </div>
    `;

    resultsDiv.innerHTML += bookHTML;
  });

  // Lägg till eventlyssnare för "Visa mer"-knappar för att toggla extra-info
  document.querySelectorAll(".toggle-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.getAttribute("data-index");
      const extraInfo = document.getElementById(`extra-${index}`);
      const isVisible = extraInfo.style.display === "block";

      extraInfo.style.display = isVisible ? "none" : "block";
      button.innerText = isVisible ? "Visa mer" : "Visa mindre";
    });
  });
}

// Backwards compatibility: om någon kallar `search()`, anropa `searchText()`
function search() {
  return searchText();
}

// Gör så att Enter-knappen triggar sökningen också
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("searchInput");
  const button = document.getElementById("searchButton") || document.getElementById("searchBtn");

  if (input) {
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        search();
      }
    });
  }

  if (button) {
    button.addEventListener("click", search);
  }
});

/* US7 – Geo-sök + kartbild */

let userLat = null;
let userLng = null;

const elsGeo = {
  useMyLocBtn: document.getElementById('useMyLocation'),
  radiusKm:    document.getElementById('radiusKm'),
  searchBtn:   document.getElementById('searchGeoBtn'),
  geoStatus:   document.getElementById('geoStatus'),
  results:     document.getElementById('results')
};

// Funktion för att bygga URL till statisk OSM-karta
function buildStaticMapUrl(lat, lng, zoom = 14, size = '400x200') {
  const base = 'https://staticmap.openstreetmap.fr/staticmap.php';
  const p = new URLSearchParams({
    center: `${lat},${lng}`,
    zoom: String(zoom),
    size,
    markers: `${lat},${lng},lightblue1`
  });
  return `${base}?${p.toString()}`;
}

// Formattera kilometer med två decimaler
function fmtKm(x) {
  const n = Number(x);
  return Number.isFinite(n) ? `${n.toFixed(2)} km` : '';
}

// 1) Hämta användarens position via Geolocation API
elsGeo.useMyLocBtn?.addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert('Geolocation stöds inte i din webbläsare.');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      userLat = coords.latitude;
      userLng = coords.longitude;
      elsGeo.geoStatus.textContent = `Position: ${userLat.toFixed(4)}, ${userLng.toFixed(4)}`;
    },
    () => alert('Kunde inte hämta position.')
  );
});

// 2) Sök böcker inom radie baserat på geo-koordinater
elsGeo.searchBtn?.addEventListener('click', searchGeo);

async function searchGeo() {
  if (userLat == null || userLng == null) {
    alert('Klicka på “Använd min position” först.');
    return;
  }
  const radius = elsGeo.radiusKm?.value || 10; // default 10 km

  const params = new URLSearchParams({
    geoLat: String(userLat),
    geoLng: String(userLng),
    geoRadiusKm: String(radius)
  });

  try {
    const res = await fetch(`/api/search?${params.toString()}`);
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
    const items = await res.json();
    renderGeo(items);
  } catch (error) {
    console.error(error);
    elsGeo.results.innerHTML = `<div>Ett fel uppstod vid sökningen: ${error.message}</div>`;
  }
}

// 3) Rendera geosökresultat med karta
function renderGeo(items) {
  elsGeo.results.innerHTML = '';

  if (!Array.isArray(items) || items.length === 0) {
    elsGeo.results.innerHTML = '<div>Inga träffar inom vald radie.</div>';
    return;
  }

  for (const it of items) {
    const title = it.title || it.filename || '(utan titel)';
    const distance = it.distance_km != null
      ? ` • ${Number(it.distance_km).toFixed(2)} km`
      : '';

    // Container för varje träff
    const card = document.createElement('div');
    card.style.margin = '1rem 0';

    // Titel + avstånd
    const titleRow = document.createElement('div');
    titleRow.innerHTML = `<strong>${title}</strong>${distance}`;
    card.appendChild(titleRow);

    // Visa karta om lat/lng finns
    if (it.lat != null && it.lng != null) {
      const a = document.createElement('a');
      a.href = `https://www.google.com/maps/search/?api=1&query=${it.lat},${it.lng}`;
      a.target = '_blank';
      a.rel = 'noopener';

      const img = document.createElement('img');
      img.src = buildStaticMapUrl(it.lat, it.lng);
      img.alt = 'Karta';
      img.style = 'display:block;margin-top:6px;border-radius:8px;max-width:100%;height:auto;';
      img.referrerPolicy = 'no-referrer'; // viktigt för vissa OSM-servrar

      // Fallback: visa textlänk om bild inte kan hämtas
      img.onerror = () => { a.textContent = 'Karta'; };

      a.appendChild(img);
      card.appendChild(a);
    }

    elsGeo.results.appendChild(card);
  }
}

