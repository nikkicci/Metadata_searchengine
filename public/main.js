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

