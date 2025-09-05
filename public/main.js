/* Här kommer vi jobba med våra funktioner*/

// Skript-kod flyttad från index.html samt innehåll för user story 5:

async function search() {
  const query = document.getElementById("searchInput").value;
  try {
    const res = await fetch(
      `http://localhost:4567/api/Books/${encodeURIComponent(query)}`
    );
    if (!res.ok) throw new Error(`Serverfel: ${res.status}`);
    const books = await res.json();

    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    if (books.length === 0) {
      resultsDiv.innerHTML = "<p>Inga resultat hittades.</p>";
      return;
    }

    books.forEach((book) => {
      const meta = typeof book.description === "string"
        ? JSON.parse(book.description)
        : book.description;

      const imageName = book.filename?.replace(/\.[^/.]+$/, ".jpg") || "ingen-bild.jpg";
      const imagePath = `./images/${imageName}`;

      resultsDiv.innerHTML += `
        <div class="book">
          <img
            src="${imagePath}"
            alt="Bokomslag"
            onerror="this.onerror=null;this.src='/images/ingen-bild.jpg';"
          />
          <div class="info">
            <h2>${meta.titel || "Okänd titel"}</h2>
            <p><strong>Författare:</strong> ${meta.författare || "Okänd"}</p>
            <p><strong>Format:</strong> ${meta.format || "Okänt format"}</p>
            <p><strong>Bibliotek:</strong> ${meta.plats || "Ej angiven"}</p>
            <p><strong>GPS:</strong> ${
              meta.gps
                ? `Lat: ${meta.gps[0]}, Lng: ${meta.gps[1]}`
                : "Ej angiven"
            }</p>
          </div>
        </div>
      `;
    });
  } catch (error) {
    console.error("Fel vid sökning:", error);
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `<p>Ett fel uppstod vid sökningen: ${error.message}</p>`;
  }
}

// Bonus: gör så att Enter-knappen triggar sökningen
//document.addEventListener("DOMContentLoaded", () => {
  //const input = document.getElementById("searchInput");
  //input.addEventListener("keydown", function (event) {
   // if (event.key === "Enter") {
      // search();
   // }
//  });
//});


/* US7 – Geo-sök + kartbild */

let userLat = null;
let userLng = null;

const els = {
  useMyLocBtn: document.getElementById('useMyLocation'),
  radiusKm:    document.getElementById('radiusKm'),
  searchBtn:   document.getElementById('searchGeoBtn'),
  geoStatus:   document.getElementById('geoStatus'),
  results:     document.getElementById('results')
};

// OSM Static Map (ingen API-nyckel)
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

function fmtKm(x) {
  const n = Number(x);
  return Number.isFinite(n) ? `${n.toFixed(2)} km` : '';
}

// 1) Hämta min position
els.useMyLocBtn?.addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert('Geolocation stöds inte i din webbläsare.');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      userLat = coords.latitude;
      userLng = coords.longitude;
      els.geoStatus.textContent = `📍 ${userLat.toFixed(4)}, ${userLng.toFixed(4)}`;
    },
    () => alert('Kunde inte hämta position.')
  );
});

// 2) Sök böcker inom radie med endast geo-parametrar
els.searchBtn?.addEventListener('click', searchGeo);

async function searchGeo() {
  if (userLat == null || userLng == null) {
    alert('Klicka “Använd min position” först.');
    return;
  }
  const radius = els.radiusKm?.value || 10; // default 10 km

  const params = new URLSearchParams({
    geoLat: String(userLat),
    geoLng: String(userLng),
    geoRadiusKm: String(radius)
  });

  const res = await fetch(`/api/search?${params.toString()}`);
  const items = await res.json();
  renderGeo(items);
}

// 3) Rendera resultat + kartbild
function renderGeo(items) {
  els.results.innerHTML = '';

  if (!Array.isArray(items) || items.length === 0) {
    els.results.innerHTML = '<div>Inga träffar inom vald radie.</div>';
    return;
  }

  for (const it of items) {
    const title = it.title || it.filename || '(utan titel)';
    const distance = it.distance_km != null
      ? ` • ${Number(it.distance_km).toFixed(2)} km`
      : '';

    // Kort/container för raden
    const card = document.createElement('div');
    card.style.margin = '1rem 0';

    // Titel + avstånd
    const titleRow = document.createElement('div');
    titleRow.innerHTML = `<strong>${title}</strong>${distance}`;
    card.appendChild(titleRow);

    // === KARTAN (DOM-flöde med fallback) ===
    if (it.lat != null && it.lng != null) {
      const a = document.createElement('a');
      a.href = `https://www.google.com/maps/search/?api=1&query=${it.lat},${it.lng}`;
      a.target = '_blank';
      a.rel = 'noopener';

      const img = document.createElement('img');
      img.src = buildStaticMapUrl(it.lat, it.lng);
      img.alt = 'Karta';
      img.style = 'display:block;margin-top:6px;border-radius:8px;max-width:100%;height:auto;';
      img.referrerPolicy = 'no-referrer'; // viktig för vissa OSM-servrar

      // Om bilden inte går att hämta – visa textlänk i stället
      img.onerror = () => { a.textContent = 'Karta'; };

      a.appendChild(img);
      card.appendChild(a);
    }

    els.results.appendChild(card);
  }
}


