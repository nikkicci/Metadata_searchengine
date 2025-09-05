/* Här kommer vi jobba med våra funktioner*/

// Skript-kod flyttad från index.html samt innehåll för user story 5:

/* ===========================
   US6 – Textsök + sidfilter
   =========================== */

// Hämta UI-element (stöder både #searchBtn och äldre #searchButton)
const elsText = {
  searchInput: document.getElementById('searchInput'),
  searchBtn:   document.getElementById('searchBtn') || document.getElementById('searchButton'),
  pagesOp:     document.getElementById('pagesOp'),
  pages:       document.getElementById('pages'),
  results:     document.getElementById('results'), // delas med US7
};

// Koppla klick på sökknappen -> nya US5-funktionen
elsText.searchBtn?.addEventListener('click', searchText);

// Backend-anrop till nya US5-endpointen
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
    if (!res.ok) throw new Error(`Serverfel: ${res.status}`);
    const items = await res.json();
    renderText(items);
  } catch (err) {
    console.error(err);
    elsText.results.innerHTML = `<div>Ett fel uppstod: ${err.message}</div>`;
  }
}

// Rendera US5-resultat (utan karta)
function renderText(items) {
  elsText.results.innerHTML = '';

  if (!Array.isArray(items) || items.length === 0) {
    elsText.results.innerHTML = '<div>Inga träffar.</div>';
    return;
  }

  for (const it of items) {
    const title = it.title || it.filename || '(utan titel)';
    const parts = [];
    if (it.author) parts.push(`av ${it.author}`);
    if (Number.isFinite(Number(it.pages))) parts.push(`${it.pages} sidor`);

    const row = document.createElement('div');
    row.style.margin = '1rem 0';
    row.innerHTML = `<strong>${title}</strong>${parts.length ? `<div>${parts.join(' — ')}</div>` : ''}`;
    elsText.results.appendChild(row);
  }
}

// Back-compat shim: om något fortfarande kallar `search()`, vidarebefordra till nya US5
function search() {
  return searchText();
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

// Gör så att både Enter och knappen kör samma sökning
document.addEventListener("DOMContentLoaded", () => {        // När sidan laddas, koppla knappen 
  const input = document.getElementById("searchInput");
  const button = document.getElementById("searchButton");

  // Kör sök om man trycker Enter
  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      search();
    }
  });

  // Kör sök om man trycker på knappen
  button.addEventListener("click", search);
});

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
