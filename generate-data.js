import { createConnection } from 'mysql2';

const db = createConnection({
    host: '5.189.183.23',
    port: 4567,
    user: 'dm24-hbg-grupp3',
    password: 'LRGUB58269',
    database: 'dm24-hbg-grupp3'
});

// Lista med böcker
const books = [
  {
    filename: 'barnens-varld.jpg',
    description: JSON.stringify({
      titel: "Barnens värld",
      författare: "Emma Dahl",
      utgivningsår: 2021,
      genre: "Barnbok",
      bild: "images/barnens-varld.jpg",
      format: "talbok",
      språk: "Svenska",
      isbn: "978-91-12345-08-9",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "äventyr", "familj"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3760, 13.1574],
      antal_sidor: 88
    })
  },
  {
    filename: 'morkrets-fotspar.jpg',
    description: JSON.stringify({
      titel: "Mörkrets fotspår",
      författare: "Lars Holmgren",
      utgivningsår: 2019,
      genre: "Deckare",
      bild: "images/morkrets-fotspår.jpg",
      format: "inbunden",
      språk: "Svenska",
      isbn: "978-91-98765-43-2",
      förlag: "Nordisk Spänning",
      nyckelord: ["mord", "polis", "gåta"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6004, 12.9941],
      antal_sidor: 320
    })
  },
  {
    filename: 'framtidens-skugga.jpg',
    description: JSON.stringify({
      titel: "Framtidens skugga",
      författare: "Maja Lindström",
      utgivningsår: 2022,
      genre: "Science Fiction",
      bild: "images/framtidens-skugga.jpg",
      format: "pocket",
      språk: "Svenska",
      isbn: "978-91-45678-12-3",
      förlag: "Framtidsförlaget",
      nyckelord: ["framtid", "robotar", "artificiell intelligens"],
      plats: "Lunds Universitetsbibliotek",
      gps: [55.7089, 13.1972],
      antal_sidor: 290
    })
  },
  {
    filename: 'den-sista-havsvinden.jpg',
    description: JSON.stringify({
      titel: "Den sista havsvinden",
      författare: "Jonas Österberg",
      utgivningsår: 2020,
      genre: "Roman",
      bild: "images/den-sista-havsvinden.jpg",
      format: "e-bok",
      språk: "Svenska",
      isbn: "978-91-11111-22-2",
      förlag: "Blå Horisont",
      nyckelord: ["natur", "förlust", "minnen"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0424, 12.6991],
      antal_sidor: 240
    })
  },
  {
    filename: 'tystnaden-inom-mig.jpg',
    description: JSON.stringify({
      titel: "Tystnaden inom mig",
      författare: "Nora Svensson",
      utgivningsår: 2023,
      genre: "Poesi",
      bild: "images/tystnaden-inom-mig.jpg",
      format: "inbunden",
      språk: "Svenska",
      isbn: "978-91-23456-78-9",
      förlag: "Vershuset",
      nyckelord: ["känslor", "självreflektion", "livet"],
      plats: "Landskrona Bibliotek",
      gps: [55.8739, 12.8374],
      antal_sidor: 112
    })
  },
  {
    filename: 'kodarnas-uppvaknande.jpg',
    description: JSON.stringify({
      titel: "Kodarnas uppvaknande",
      författare: "Henrik Wallin",
      utgivningsår: 2018,
      genre: "Teknik",
      bild: "images/ingen-bild.jpg",
      format: "pocket",
      språk: "Svenska",
      isbn: "978-91-76543-21-0",
      förlag: "IT-förlaget",
      nyckelord: ["programmering", "historia", "digitalisering"],
      plats: "Kristianstads Bibliotek",
      gps: [56.0315, 14.1612],
      antal_sidor: 198
    })
  },
  {
    filename: 'hjartats-melodier.jpg',
    description: JSON.stringify({
      titel: "Hjärtats melodier",
      författare: "Elin Norberg",
      utgivningsår: 2020,
      genre: "Romantik",
      bild: "images/hjartats-melodier.jpg",
      format: "e-bok",
      språk: "Svenska",
      isbn: "978-91-65432-10-1",
      förlag: "Kärlek & Liv",
      nyckelord: ["kärlek", "relationer", "förlust"],
      plats: "Ängelholms Bibliotek",
      gps: [56.2435, 12.8614],
      antal_sidor: 276
    })
  },
  {
    filename: 'skuggor-i-natten.jpg',
    description: JSON.stringify({
      titel: "Skuggor i natten",
      författare: "Anders Rydén",
      utgivningsår: 2017,
      genre: "Thriller",
      bild: "images/skuggor-i-natten.jpg",
      format: "inbunden",
      språk: "Svenska",
      isbn: "978-91-99887-76-5",
      förlag: "Mörka Nätter",
      nyckelord: ["spänning", "flykt", "hemligheter"],
      plats: "Ystads Bibliotek",
      gps: [55.4559, 13.932],
      antal_sidor: 344
    })
  },
  {
    filename: 'bortom-stjarnorna.jpg',
    description: JSON.stringify({
      titel: "Bortom stjärnorna",
      författare: "Sofia Björkman",
      utgivningsår: 2024,
      genre: "Fantasy",
      bild: "images/bortom-stjarnorna.jpg",
      format: "talbok",
      språk: "Svenska",
      isbn: "978-91-33333-44-4",
      förlag: "Drömfabriken",
      nyckelord: ["magik", "resor", "hjälte"],
      plats: "Hässleholms Bibliotek",
      gps: [56.1569, 13.7639],
      antal_sidor: 412
    })
  },
  {
    filename: 'resan-tillbaka.jpg',
    description: JSON.stringify({
      titel: "Resan tillbaka",
      författare: "Karin Ekström",
      utgivningsår: 2021,
      genre: "Biografi",
      bild: "images/resan-tillbaka.jpg",
      format: "inbunden",
      språk: "Svenska",
      isbn: "978-91-22222-55-6",
      förlag: "Livsresan Förlag",
      nyckelord: ["självbiografi", "kamp", "inspiration"],
      plats: "Svalövs Bibliotek",
      gps: [55.9133, 13.1084],
      antal_sidor: 360
    })
  }
];
 
 
db.query('TRUNCATE TABLE Books', (err) => {
  if (err) {
    console.error('Kunde inte tömma tabellen:', err);
    return;
  }
 
  console.log('Tabellen tömd. Lägger in böcker...');
 
  // Lägg in varje bok
  books.forEach(book => {
    
 
    const query = 'INSERT INTO Books (filename, description) VALUES (?, ?)';
    db.query(query, [book.filename, book.description], (err, result) => {
      if (err) {
        console.error('Fel vid insättning:', err);
      } else {
        console.log('✅ Bok inlagd med id:', result.insertId);
      }
    });
  });
})