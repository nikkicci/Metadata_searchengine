// Ladda miljövariabler från .env-filen
// require('dotenv').config();
import dotenv from 'dotenv';
dotenv.config();


import { createConnection } from 'mysql2';

const db = createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
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
  },
  {
    filename: 'skogens-hemlighet.jpg',
    description: JSON.stringify({
      titel: "Skogens hemlighet",
      författare: ["Anna Lindholm", "Per Andersson"],
      utgivningsår: 2019,
      genre: ["Fantasy", "Äventyr"],
      bild: "images/skogens-hemlighet.jpg",
      format: ["inbunden", "e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-01-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["äventyr", "vänskap", "magi", "skog", "mystik"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 324
    })
  },
  {
    filename: 'historien-om-oss.jpg',
    description: JSON.stringify({
      titel: "Historien om oss",
      författare: "Erik Svensson",
      utgivningsår: 2020,
      genre: "Roman",
      bild: "images/historien-om-oss.jpg",
      format: ["pocket", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-01-2",
      förlag: "Bokhuset AB",
      nyckelord: ["kärlek", "historia", "relationer", "förlust", "drama"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 278
    })
  },
  {
    filename: 'barnens-aventyr.jpg',
    description: JSON.stringify({
      titel: "Barnens äventyr",
      författare: ["Lisa Dahl", "Henrik Månsson"],
      utgivningsår: 2021,
      genre: ["Barnbok", "Äventyr"],
      bild: "images/barnens-aventyr.jpg",
      format: ["talbok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-01-3",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "lek", "fantasi", "vänskap", "drömmar", "familj"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 96
    })
  },
  {
    filename: 'vagen-till-toppen.jpg',
    description: JSON.stringify({
      titel: "Vägen till toppen",
      författare: ["Maria Holm"],
      utgivningsår: 2018,
      genre: ["Biografi", "Motivation"],
      bild: "images/vagen-till-toppen.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Engelska",
      isbn: "978-91-10001-01-4",
      förlag: "StoryPrint",
      nyckelord: ["livsresa", "inspiration", "mål", "karriär"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 212
    })
  },
  {
    filename: 'morkrets-skugga.jpg',
    description: JSON.stringify({
      titel: "Mörkrets skugga",
      författare: ["Jonas Berg", "Caroline Lund"],
      utgivningsår: 2022,
      genre: ["Deckare", "Thriller"],
      bild: "images/morkrets-skugga.jpg",
      format: ["inbunden"],
      språk: "Svenska",
      isbn: "978-91-10001-01-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mysterium", "brott", "spänning", "gåta"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 354
    })
  },
  {
    filename: 'resan-genom-tiden.jpg',
    description: JSON.stringify({
      titel: "Resan genom tiden",
      författare: "Karin Ekström",
      utgivningsår: 2017,
      genre: ["Science Fiction"],
      bild: "images/resan-genom-tiden.jpg",
      format: ["pocket", "e-bok"],
      språk: "Engelska",
      isbn: "978-91-10001-01-6",
      förlag: "Bokhuset AB",
      nyckelord: ["framtid", "teknik", "äventyr", "tidsresor"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 289
    })
  },
  {
    filename: 'livet-vid-havet.jpg',
    description: JSON.stringify({
      titel: "Livet vid havet",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2023,
      genre: ["Roman", "Natur"],
      bild: "images/livet-vid-havet.jpg",
      format: ["talbok", "ljudbok", "inbunden"],
      språk: "Svenska",
      isbn: "978-91-10001-01-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "hav", "drama", "frihet", "miljö"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 301
    })
  },
  {
    filename: 'det-forsvunna-brevet.jpg',
    description: JSON.stringify({
      titel: "Det försvunna brevet",
      författare: "Helena Ström",
      utgivningsår: 2016,
      genre: ["Deckare"],
      bild: "images/det-forsvunna-brevet.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-01-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["gåta", "mysterium", "hemlighet", "intrig", "lösning"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 247
    })
  },
  {
    filename: 'stadens-hjarta.jpg',
    description: JSON.stringify({
      titel: "Stadens hjärta",
      författare: ["Fredrik Åberg"],
      utgivningsår: 2015,
      genre: ["Roman", "Drama"],
      bild: "images/stadens-hjarta.jpg",
      format: ["inbunden"],
      språk: "Svenska",
      isbn: "978-91-10001-01-9",
      förlag: "Bokhuset AB",
      nyckelord: ["stad", "liv", "möten", "kultur", "relationer"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 332
    })
  },
  {
    filename: 'barnens-drommar.jpg',
    description: JSON.stringify({
      titel: "Barnens drömmar",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Barnbok", "Fantasivärld"],
      bild: "images/barnens-drommar.jpg",
      format: ["pocket", "talbok"],
      språk: "Svenska",
      isbn: "978-91-10001-02-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "fantasi", "äventyr", "drömmar", "familj", "glädje"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 104
    })
  },
  {
    filename: 'magi-i-staden.jpg',
    description: JSON.stringify({
      titel: "Magi i staden",
      författare: ["Linnea Sjöberg", "David Olsson"],
      utgivningsår: 2018,
      genre: ["Fantasy", "Urban Fantasy"],
      bild: "images/magi-i-staden.jpg",
      format: ["inbunden", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-02-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["magi", "äventyr", "stad", "hemligheter", "fantasi"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 310
    })
  },
  {
    filename: 'hemlighetens-dal.jpg',
    description: JSON.stringify({
      titel: "Hemlighetens dal",
      författare: "Katarina Lind",
      utgivningsår: 2019,
      genre: ["Äventyr", "Mystik"],
      bild: "images/hemlighetens-dal.jpg",
      format: ["pocket", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-02-2",
      förlag: "Bokhuset AB",
      nyckelord: ["dolda skatter", "magi", "vandring", "vänskap"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 280
    })
  },
  {
    filename: 'resan-till-norr.jpg',
    description: JSON.stringify({
      titel: "Resan till Norr",
      författare: ["Emil Svensson", "Sara Berg"],
      utgivningsår: 2020,
      genre: ["Reseskildring", "Roman"],
      bild: "images/resan-till-norr.jpg",
      format: ["inbunden", "e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-02-3",
      förlag: "StoryPrint",
      nyckelord: ["resa", "äventyr", "natur", "vänskap", "kultur"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 342
    })
  },
  {
    filename: 'morgonrodnad.jpg',
    description: JSON.stringify({
      titel: "Morgonrodnad",
      författare: "Lars Holm",
      utgivningsår: 2017,
      genre: "Roman",
      bild: "images/morgonrodnad.jpg",
      format: ["pocket", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-02-4",
      förlag: "Bokhuset AB",
      nyckelord: ["kärlek", "familj", "förändring", "drömmar"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 265
    })
  },
  {
    filename: 'skuggornas-hemlighet.jpg',
    description: JSON.stringify({
      titel: "Skuggornas hemlighet",
      författare: ["Hanna Berg", "Johan Ek"],
      utgivningsår: 2021,
      genre: ["Deckare", "Thriller"],
      bild: "images/skuggornas-hemlighet.jpg",
      format: ["inbunden", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-02-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mysterium", "brott", "spänning", "hemlighet", "förföljelse"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 356
    })
  },
  {
    filename: 'tidens-vagar.jpg',
    description: JSON.stringify({
      titel: "Tidens vågar",
      författare: "Karin Dahl",
      utgivningsår: 2016,
      genre: ["Science Fiction"],
      bild: "images/tidens-vagar.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-02-6",
      förlag: "Bokhuset AB",
      nyckelord: ["framtid", "teknik", "äventyr", "tidsresor", "mystik"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 295
    })
  },
  {
    filename: 'vagar-mot-stjarnorna.jpg',
    description: JSON.stringify({
      titel: "Vägar mot stjärnorna",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Natur"],
      bild: "images/vagar-mot-stjarnorna.jpg",
      format: ["talbok", "ljudbok", "inbunden"],
      språk: "Svenska",
      isbn: "978-91-10001-02-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "hav", "drama", "frihet", "miljö"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 308
    })
  },
  {
    filename: 'hemliga-brevet.jpg',
    description: JSON.stringify({
      titel: "Hemliga brevet",
      författare: "Helena Ström",
      utgivningsår: 2015,
      genre: ["Deckare"],
      bild: "images/hemliga-brevet.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-02-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["gåta", "mysterium", "hemlighet", "intrig", "lösning"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 252
    })
  },
  {
    filename: 'stadens-ljus.jpg',
    description: JSON.stringify({
      titel: "Stadens ljus",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2018,
      genre: ["Roman", "Drama"],
      bild: "images/stadens-ljus.jpg",
      format: ["inbunden", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-02-9",
      förlag: "Bokhuset AB",
      nyckelord: ["stad", "liv", "möten", "kultur", "relationer"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 335
    })
  },
  {
    filename: 'barnens-fantasier.jpg',
    description: JSON.stringify({
      titel: "Barnens fantasier",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2020,
      genre: ["Barnbok", "Fantasivärld"],
      bild: "images/barnens-fantasier.jpg",
      format: ["pocket", "talbok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-03-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "fantasi", "äventyr", "drömmar", "familj", "glädje"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 108
    })
  },
  {
    filename: 'mysteriet-pa-slostad.jpg',
    description: JSON.stringify({
      titel: "Mysteriet på Slostad",
      författare: ["Albin Fors", "Clara Berg"],
      utgivningsår: 2021,
      genre: ["Deckare", "Mystik"],
      bild: "images/mysteriet-pa-slostad.jpg",
      format: ["inbunden", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-03-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["brott", "gåta", "hemligheter", "polis", "spaning", "mord"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 340
    })
  },
  {
    filename: 'resan-till-skogen.jpg',
    description: JSON.stringify({
      titel: "Resan till skogen",
      författare: "Julia Lind",
      utgivningsår: 2019,
      genre: ["Äventyr", "Barnbok"],
      bild: "images/resan-till-skogen.jpg",
      format: ["pocket", "talbok"],
      språk: "Svenska",
      isbn: "978-91-10001-03-2",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "lek", "vänskap", "fantasi", "djur"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 120
    })
  },
  {
    filename: 'tidens-mysterier.jpg',
    description: JSON.stringify({
      titel: "Tidens mysterier",
      författare: ["Erik Holm", "Sofia Bergström"],
      utgivningsår: 2020,
      genre: ["Science Fiction", "Äventyr"],
      bild: "images/tidens-mysterier.jpg",
      format: ["inbunden", "e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-03-3",
      förlag: "StoryPrint",
      nyckelord: ["tid", "resor", "magi", "framtid", "spänning", "mysterium"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 312
    })
  },
  {
    filename: 'skattens-hemlighet.jpg',
    description: JSON.stringify({
      titel: "Skattens hemlighet",
      författare: "Lars Dahl",
      utgivningsår: 2018,
      genre: ["Äventyr", "Barnbok"],
      bild: "images/skattens-hemlighet.jpg",
      format: ["pocket", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-03-4",
      förlag: "Barnens Bokhus",
      nyckelord: ["äventyr", "skatt", "mysterium", "vänskap"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 98
    })
  },
  {
    filename: 'morkret-over-stan.jpg',
    description: JSON.stringify({
      titel: "Mörkret över stan",
      författare: ["Caroline Holm", "Jonas Berg"],
      utgivningsår: 2022,
      genre: ["Deckare", "Thriller"],
      bild: "images/morkret-over-stan.jpg",
      format: ["inbunden", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-03-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["brott", "mysterium", "spänning", "polis", "hemlighet"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 362
    })
  },
  {
    filename: 'framtidens-vagar.jpg',
    description: JSON.stringify({
      titel: "Framtidens vägar",
      författare: "Karin Ekström",
      utgivningsår: 2017,
      genre: ["Science Fiction"],
      bild: "images/framtidens-vagar.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-03-6",
      förlag: "Bokhuset AB",
      nyckelord: ["framtid", "teknik", "uppfinningar", "äventyr", "resor"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 290
    })
  },
  {
    filename: 'stjarnornas-vagar.jpg',
    description: JSON.stringify({
      titel: "Stjärnornas vägar",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Natur"],
      bild: "images/stjarnornas-vagar.jpg",
      format: ["talbok", "ljudbok", "inbunden"],
      språk: "Svenska",
      isbn: "978-91-10001-03-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "universum", "drama", "frihet", "resor"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 306
    })
  },
  {
    filename: 'det-hemliga-brevet.jpg',
    description: JSON.stringify({
      titel: "Det hemliga brevet",
      författare: "Helena Ström",
      utgivningsår: 2016,
      genre: ["Deckare"],
      bild: "images/det-hemliga-brevet.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-03-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["gåta", "mysterium", "hemlighet", "lösning", "intrig", "polis"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 250
    })
  },
  {
    filename: 'ljus-over-staden.jpg',
    description: JSON.stringify({
      titel: "Ljus över staden",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2018,
      genre: ["Roman", "Drama"],
      bild: "images/ljus-over-staden.jpg",
      format: ["inbunden", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-03-9",
      förlag: "Bokhuset AB",
      nyckelord: ["stad", "liv", "möten", "relationer", "kultur"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 338
    })
  },
  {
    filename: 'barnens-drömmar.jpg',
    description: JSON.stringify({
      titel: "Barnens drömmar",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Barnbok", "Fantasivärld"],
      bild: "images/barnens-drömmar.jpg",
      format: ["pocket", "talbok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-04-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "fantasi", "äventyr", "drömmar", "familj", "glädje"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 110
    })
  },
  {
    filename: 'hemlighetens-skatt.jpg',
    description: JSON.stringify({
      titel: "Hemlighetens skatt",
      författare: ["Albin Fors", "Clara Berg"],
      utgivningsår: 2022,
      genre: ["Äventyr", "Mystik"],
      bild: "images/hemlighetens-skatt.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-04-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["äventyr", "skatt", "gåta", "vänskap", "magi"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 350
    })
  },
  {
    filename: 'resan-till-fjallen.jpg',
    description: JSON.stringify({
      titel: "Resan till fjällen",
      författare: "Julia Lind",
      utgivningsår: 2020,
      genre: ["Reseskildring", "Äventyr"],
      bild: "images/resan-till-fjallen.jpg",
      format: ["pocket", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-04-2",
      förlag: "StoryPrint",
      nyckelord: ["resa", "natur", "äventyr", "vänskap", "kultur"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 298
    })
  },
  {
    filename: 'tidens-hemlighet.jpg',
    description: JSON.stringify({
      titel: "Tidens hemlighet",
      författare: ["Erik Holm", "Sofia Bergström"],
      utgivningsår: 2021,
      genre: ["Science Fiction", "Mystik"],
      bild: "images/tidens-hemlighet.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-04-3",
      förlag: "Nordiska Förlaget",
      nyckelord: ["tid", "resor", "magi", "framtid", "gåta"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 325
    })
  },
  {
    filename: 'skogens-magi.jpg',
    description: JSON.stringify({
      titel: "Skogens magi",
      författare: "Lars Dahl",
      utgivningsår: 2019,
      genre: ["Äventyr", "Barnbok"],
      bild: "images/skogens-magi.jpg",
      format: ["pocket", "talbok"],
      språk: "Svenska",
      isbn: "978-91-10001-04-4",
      förlag: "Barnens Bokhus",
      nyckelord: ["äventyr", "magi", "vänskap", "skog", "fantasi"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 104
    })
  },
  {
    filename: 'morkret-i-staden.jpg',
    description: JSON.stringify({
      titel: "Mörkret i staden",
      författare: ["Caroline Holm", "Jonas Berg"],
      utgivningsår: 2022,
      genre: ["Deckare", "Thriller"],
      bild: "images/morkret-i-staden.jpg",
      format: ["inbunden", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-04-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["brott", "mysterium", "polis", "hemlighet", "spänning"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 358
    })
  },
  {
    filename: 'framtidens-resa.jpg',
    description: JSON.stringify({
      titel: "Framtidens resa",
      författare: "Karin Ekström",
      utgivningsår: 2018,
      genre: ["Science Fiction"],
      bild: "images/framtidens-resa.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-04-6",
      förlag: "Bokhuset AB",
      nyckelord: ["framtid", "teknik", "äventyr", "resor", "innovation"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 305
    })
  },
  {
    filename: 'stjarnornas-hemlighet.jpg',
    description: JSON.stringify({
      titel: "Stjärnornas hemlighet",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Natur"],
      bild: "images/stjarnornas-hemlighet.jpg",
      format: ["talbok", "ljudbok", "inbunden"],
      språk: "Svenska",
      isbn: "978-91-10001-04-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "universum", "resor", "frihet", "drama"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 312
    })
  },
  {
    filename: 'det-forsvunna-dokumentet.jpg',
    description: JSON.stringify({
      titel: "Det försvunna dokumentet",
      författare: "Helena Ström",
      utgivningsår: 2017,
      genre: ["Deckare"],
      bild: "images/det-forsvunna-dokumentet.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-04-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["gåta", "mysterium", "polis", "hemlighet", "lösning"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 255
    })
  },
  {
    filename: 'ljus-och-skugga.jpg',
    description: JSON.stringify({
      titel: "Ljus och skugga",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Roman", "Drama"],
      bild: "images/ljus-och-skugga.jpg",
      format: ["inbunden", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-04-9",
      förlag: "Bokhuset AB",
      nyckelord: ["stad", "liv", "möten", "relationer", "kultur", "vänskap"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 340
    })
  },
  {
    filename: 'barnens-hemligheter.jpg',
    description: JSON.stringify({
      titel: "Barnens hemligheter",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Barnbok", "Fantasivärld"],
      bild: "images/barnens-hemligheter.jpg",
      format: ["pocket", "talbok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-05-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "fantasi", "äventyr", "drömmar", "familj", "lek"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 112
    })
  },
  {
    filename: 'mysteriet-i-skogen.jpg',
    description: JSON.stringify({
      titel: "Mysteriet i skogen",
      författare: ["Albin Fors", "Clara Berg"],
      utgivningsår: 2022,
      genre: ["Äventyr", "Mystik"],
      bild: "images/mysteriet-i-skogen.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-05-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["äventyr", "gåta", "skatt", "magi", "vänskap"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 348
    })
  },
  {
    filename: 'resan-till-havet.jpg',
    description: JSON.stringify({
      titel: "Resan till havet",
      författare: "Julia Lind",
      utgivningsår: 2020,
      genre: ["Reseskildring", "Äventyr"],
      bild: "images/resan-till-havet.jpg",
      format: ["pocket", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-05-2",
      förlag: "StoryPrint",
      nyckelord: ["resor", "natur", "äventyr", "vänskap", "kultur"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 300
    })
  },
  {
    filename: 'tidens-vagar.jpg',
    description: JSON.stringify({
      titel: "Tidens vågar",
      författare: ["Erik Holm", "Sofia Bergström"],
      utgivningsår: 2021,
      genre: ["Science Fiction", "Mystik"],
      bild: "images/tidens-vagar.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-05-3",
      förlag: "Nordiska Förlaget",
      nyckelord: ["tid", "resor", "magi", "framtid", "gåta", "äventyr"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 328
    })
  },
  {
    filename: 'skogens-hemlighet.jpg',
    description: JSON.stringify({
      titel: "Skogens hemlighet",
      författare: "Lars Dahl",
      utgivningsår: 2019,
      genre: ["Äventyr", "Barnbok"],
      bild: "images/skogens-hemlighet.jpg",
      format: ["pocket", "talbok"],
      språk: "Svenska",
      isbn: "978-91-10001-05-4",
      förlag: "Barnens Bokhus",
      nyckelord: ["äventyr", "magi", "vänskap", "skog", "fantasi"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 102
    })
  },
  {
    filename: 'morkret-over-staden.jpg',
    description: JSON.stringify({
      titel: "Mörkret över staden",
      författare: ["Caroline Holm", "Jonas Berg"],
      utgivningsår: 2022,
      genre: ["Deckare", "Thriller"],
      bild: "images/morkret-over-staden.jpg",
      format: ["inbunden", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-05-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["brott", "mysterium", "polis", "hemlighet", "spänning", "gåta"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 360
    })
  },
  {
    filename: 'framtidens-vagar.jpg',
    description: JSON.stringify({
      titel: "Framtidens vägar",
      författare: "Karin Ekström",
      utgivningsår: 2018,
      genre: ["Science Fiction"],
      bild: "images/framtidens-vagar.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-05-6",
      förlag: "Bokhuset AB",
      nyckelord: ["framtid", "teknik", "äventyr", "resor", "innovation", "upptäckter"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 307
    })
  },
  {
    filename: 'stjarnornas-hemlighet.jpg',
    description: JSON.stringify({
      titel: "Stjärnornas hemlighet",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Natur"],
      bild: "images/stjarnornas-hemlighet.jpg",
      format: ["talbok", "ljudbok", "inbunden"],
      språk: "Svenska",
      isbn: "978-91-10001-05-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "universum", "resor", "frihet", "drama"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 314
    })
  },
  {
    filename: 'det-hemliga-brevet.jpg',
    description: JSON.stringify({
      titel: "Det hemliga brevet",
      författare: "Helena Ström",
      utgivningsår: 2017,
      genre: ["Deckare"],
      bild: "images/det-hemliga-brevet.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-05-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["gåta", "mysterium", "polis", "hemlighet", "lösning", "intrig"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 258
    })
  },
  {
    filename: 'ljus-over-staden.jpg',
    description: JSON.stringify({
      titel: "Ljus över staden",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Roman", "Drama"],
      bild: "images/ljus-over-staden.jpg",
      format: ["inbunden", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-05-9",
      förlag: "Bokhuset AB",
      nyckelord: ["stad", "liv", "möten", "relationer", "kultur", "vänskap"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 342
    })
  },
  {
    filename: 'barnens-äventyr.jpg',
    description: JSON.stringify({
      titel: "Barnens äventyr",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Barnbok", "Fantasivärld"],
      bild: "images/barnens-äventyr.jpg",
      format: ["pocket", "talbok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-06-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "fantasi", "äventyr", "drömmar", "familj", "lek"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 114
    })
  },
  {
    filename: 'skogens-hemligheter.jpg',
    description: JSON.stringify({
      titel: "Skogens hemligheter",
      författare: ["Albin Fors", "Clara Berg"],
      utgivningsår: 2022,
      genre: ["Äventyr", "Mystik"],
      bild: "images/skogens-hemligheter.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-06-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["äventyr", "gåta", "skatt", "magi", "vänskap", "skog"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 355
    })
  },
  {
    filename: 'resan-till-bergen.jpg',
    description: JSON.stringify({
      titel: "Resan till bergen",
      författare: "Julia Lind",
      utgivningsår: 2020,
      genre: ["Reseskildring", "Äventyr"],
      bild: "images/resan-till-bergen.jpg",
      format: ["pocket", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-06-2",
      förlag: "StoryPrint",
      nyckelord: ["resor", "natur", "äventyr", "vänskap", "kultur", "fjäll"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 310
    })
  },
  {
    filename: 'tidens-gåtor.jpg',
    description: JSON.stringify({
      titel: "Tidens gåtor",
      författare: ["Erik Holm", "Sofia Bergström"],
      utgivningsår: 2021,
      genre: ["Science Fiction", "Mystik"],
      bild: "images/tidens-gåtor.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-06-3",
      förlag: "Nordiska Förlaget",
      nyckelord: ["tid", "resor", "magi", "framtid", "gåta", "äventyr"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 330
    })
  },
  {
    filename: 'skogens-magi.jpg',
    description: JSON.stringify({
      titel: "Skogens magi",
      författare: "Lars Dahl",
      utgivningsår: 2019,
      genre: ["Äventyr", "Barnbok"],
      bild: "images/skogens-magi.jpg",
      format: ["pocket", "talbok"],
      språk: "Svenska",
      isbn: "978-91-10001-06-4",
      förlag: "Barnens Bokhus",
      nyckelord: ["äventyr", "magi", "vänskap", "skog", "fantasi", "djur"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 108
    })
  },
  {
    filename: 'morkret-over-byen.jpg',
    description: JSON.stringify({
      titel: "Mörkret över byn",
      författare: ["Caroline Holm", "Jonas Berg"],
      utgivningsår: 2022,
      genre: ["Deckare", "Thriller"],
      bild: "images/morkret-over-byen.jpg",
      format: ["inbunden", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-06-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["brott", "mysterium", "polis", "hemlighet", "spänning"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 362
    })
  },
  {
    filename: 'framtidens-äventyr.jpg',
    description: JSON.stringify({
      titel: "Framtidens äventyr",
      författare: "Karin Ekström",
      utgivningsår: 2018,
      genre: ["Science Fiction"],
      bild: "images/framtidens-äventyr.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-06-6",
      förlag: "Bokhuset AB",
      nyckelord: ["framtid", "teknik", "äventyr", "resor", "innovation"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 310
    })
  },
  {
    filename: 'stjarnornas-vagar.jpg',
    description: JSON.stringify({
      titel: "Stjärnornas vägar",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Natur"],
      bild: "images/stjarnornas-vagar.jpg",
      format: ["talbok", "ljudbok", "inbunden"],
      språk: "Svenska",
      isbn: "978-91-10001-06-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "universum", "resor", "frihet", "drama", "äventyr"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 316
    })
  },
  {
    filename: 'det-hemliga-dokumentet.jpg',
    description: JSON.stringify({
      titel: "Det hemliga dokumentet",
      författare: "Helena Ström",
      utgivningsår: 2017,
      genre: ["Deckare"],
      bild: "images/det-hemliga-dokumentet.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-06-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["gåta", "mysterium", "polis", "hemlighet", "lösning", "intrig"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 260
    })
  },
  {
    filename: 'ljus-och-mörker.jpg',
    description: JSON.stringify({
      titel: "Ljus och mörker",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Roman", "Drama"],
      bild: "images/ljus-och-mörker.jpg",
      format: ["inbunden", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-06-9",
      förlag: "Bokhuset AB",
      nyckelord: ["stad", "liv", "möten", "relationer", "kultur", "vänskap"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 345
    })
  },
  {
    filename: 'barnens-fantasier.jpg',
    description: JSON.stringify({
      titel: "Barnens fantasier",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Barnbok", "Fantasivärld"],
      bild: "images/barnens-fantasier.jpg",
      format: ["pocket", "talbok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-07-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "fantasi", "äventyr", "drömmar", "familj", "lek"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 116
    })
  },
  {
    filename: 'hemligheter-i-byen.jpg',
    description: JSON.stringify({
      titel: "Hemligheter i byn",
      författare: ["Albin Fors", "Clara Berg"],
      utgivningsår: 2022,
      genre: ["Äventyr", "Mystik"],
      bild: "images/hemligheter-i-byen.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-07-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["äventyr", "gåta", "magi", "vänskap", "hemlighet"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 352
    })
  },
  {
    filename: 'resan-till-skargarden.jpg',
    description: JSON.stringify({
      titel: "Resan till skärgården",
      författare: "Julia Lind",
      utgivningsår: 2020,
      genre: ["Reseskildring", "Äventyr"],
      bild: "images/resan-till-skargarden.jpg",
      format: ["pocket", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-07-2",
      förlag: "StoryPrint",
      nyckelord: ["resor", "natur", "äventyr", "vänskap", "kultur", "hav"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 315
    })
  },
  {
    filename: 'tidens-hemligheter.jpg',
    description: JSON.stringify({
      titel: "Tidens hemligheter",
      författare: ["Erik Holm", "Sofia Bergström"],
      utgivningsår: 2021,
      genre: ["Science Fiction", "Mystik"],
      bild: "images/tidens-hemligheter.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-07-3",
      förlag: "Nordiska Förlaget",
      nyckelord: ["tid", "resor", "magi", "framtid", "gåta", "äventyr"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 332
    })
  },
  {
    filename: 'skogens-magiska-värld.jpg',
    description: JSON.stringify({
      titel: "Skogens magiska värld",
      författare: "Lars Dahl",
      utgivningsår: 2019,
      genre: ["Äventyr", "Barnbok"],
      bild: "images/skogens-magiska-värld.jpg",
      format: ["pocket", "talbok"],
      språk: "Svenska",
      isbn: "978-91-10001-07-4",
      förlag: "Barnens Bokhus",
      nyckelord: ["äventyr", "magi", "vänskap", "skog", "fantasi", "djur"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 110
    })
  },
  {
    filename: 'morkret-i-byen.jpg',
    description: JSON.stringify({
      titel: "Mörkret i byn",
      författare: ["Caroline Holm", "Jonas Berg"],
      utgivningsår: 2022,
      genre: ["Deckare", "Thriller"],
      bild: "images/morkret-i-byen.jpg",
      format: ["inbunden", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-07-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["brott", "mysterium", "polis", "hemlighet", "spänning", "gåta"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 365
    })
  },
  {
    filename: 'framtidens-hemligheter.jpg',
    description: JSON.stringify({
      titel: "Framtidens hemligheter",
      författare: "Karin Ekström",
      utgivningsår: 2018,
      genre: ["Science Fiction"],
      bild: "images/framtidens-hemligheter.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-07-6",
      förlag: "Bokhuset AB",
      nyckelord: ["framtid", "teknik", "äventyr", "resor", "innovation"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 312
    })
  },
  {
    filename: 'stjarnornas-hemliga-vagar.jpg',
    description: JSON.stringify({
      titel: "Stjärnornas hemliga vägar",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Natur"],
      bild: "images/stjarnornas-hemliga-vagar.jpg",
      format: ["talbok", "ljudbok", "inbunden"],
      språk: "Svenska",
      isbn: "978-91-10001-07-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "universum", "resor", "frihet", "drama", "äventyr"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 318
    })
  },
  {
    filename: 'det-forsvunna-brevet.jpg',
    description: JSON.stringify({
      titel: "Det försvunna brevet",
      författare: "Helena Ström",
      utgivningsår: 2017,
      genre: ["Deckare"],
      bild: "images/det-forsvunna-brevet.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-07-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["gåta", "mysterium", "polis", "hemlighet", "lösning", "intrig"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 262
    })
  },
  {
    filename: 'ljus-och-skuggor.jpg',
    description: JSON.stringify({
      titel: "Ljus och skuggor",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Roman", "Drama"],
      bild: "images/ljus-och-skuggor.jpg",
      format: ["inbunden", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-07-9",
      förlag: "Bokhuset AB",
      nyckelord: ["stad", "liv", "möten", "relationer", "kultur", "vänskap"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 348
    })
  },
  {
    filename: 'barnens-magiska-värld.jpg',
    description: JSON.stringify({
      titel: "Barnens magiska värld",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Barnbok", "Fantasivärld"],
      bild: "images/barnens-magiska-värld.jpg",
      format: ["pocket", "talbok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-08-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "fantasi", "äventyr", "drömmar", "familj", "lek"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 118
    })
  },
  {
    filename: 'mysteriet-i-staden.jpg',
    description: JSON.stringify({
      titel: "Mysteriet i staden",
      författare: ["Albin Fors", "Clara Berg"],
      utgivningsår: 2022,
      genre: ["Äventyr", "Mystik"],
      bild: "images/mysteriet-i-staden.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-08-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["äventyr", "gåta", "skatt", "magi", "vänskap"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 356
    })
  },
  {
    filename: 'resan-till-sodra.jpg',
    description: JSON.stringify({
      titel: "Resan till södra",
      författare: "Julia Lind",
      utgivningsår: 2020,
      genre: ["Reseskildring", "Äventyr"],
      bild: "images/resan-till-sodra.jpg",
      format: ["pocket", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-08-2",
      förlag: "StoryPrint",
      nyckelord: ["resor", "natur", "äventyr", "vänskap", "kultur", "landskap"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 318
    })
  },
  {
    filename: 'tidens-mysterier.jpg',
    description: JSON.stringify({
      titel: "Tidens mysterier",
      författare: ["Erik Holm", "Sofia Bergström"],
      utgivningsår: 2021,
      genre: ["Science Fiction", "Mystik"],
      bild: "images/tidens-mysterier.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-08-3",
      förlag: "Nordiska Förlaget",
      nyckelord: ["tid", "resor", "magi", "framtid", "gåta", "äventyr"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 334
    })
  },
  {
    filename: 'skogens-hemlighet.jpg',
    description: JSON.stringify({
      titel: "Skogens hemlighet",
      författare: "Lars Dahl",
      utgivningsår: 2019,
      genre: ["Äventyr", "Barnbok"],
      bild: "images/skogens-hemlighet.jpg",
      format: ["pocket", "talbok"],
      språk: "Svenska",
      isbn: "978-91-10001-08-4",
      förlag: "Barnens Bokhus",
      nyckelord: ["äventyr", "magi", "vänskap", "skog", "fantasi", "djur"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 112
    })
  },
  {
    filename: 'morkret-i-staden.jpg',
    description: JSON.stringify({
      titel: "Mörkret i staden",
      författare: ["Caroline Holm", "Jonas Berg"],
      utgivningsår: 2022,
      genre: ["Deckare", "Thriller"],
      bild: "images/morkret-i-staden.jpg",
      format: ["inbunden", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-08-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["brott", "mysterium", "polis", "hemlighet", "spänning", "gåta"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 368
    })
  },
  {
    filename: 'framtidens-värld.jpg',
    description: JSON.stringify({
      titel: "Framtidens värld",
      författare: "Karin Ekström",
      utgivningsår: 2018,
      genre: ["Science Fiction"],
      bild: "images/framtidens-värld.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-08-6",
      förlag: "Bokhuset AB",
      nyckelord: ["framtid", "teknik", "äventyr", "resor", "innovation", "upptäckter"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 315
    })
  },
  {
    filename: 'stjarnornas-värld.jpg',
    description: JSON.stringify({
      titel: "Stjärnornas värld",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Natur"],
      bild: "images/stjarnornas-värld.jpg",
      format: ["talbok", "ljudbok", "inbunden"],
      språk: "Svenska",
      isbn: "978-91-10001-08-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "universum", "resor", "frihet", "drama", "äventyr"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 320
    })
  },
  {
    filename: 'det-forsvunna-brevet.jpg',
    description: JSON.stringify({
      titel: "Det försvunna brevet",
      författare: "Helena Ström",
      utgivningsår: 2017,
      genre: ["Deckare"],
      bild: "images/det-forsvunna-brevet.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-08-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["gåta", "mysterium", "polis", "hemlighet", "lösning", "intrig"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 264
    })
  },
  {
    filename: 'ljus-och-mörker.jpg',
    description: JSON.stringify({
      titel: "Ljus och mörker",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Roman", "Drama"],
      bild: "images/ljus-och-mörker.jpg",
      format: ["inbunden", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-08-9",
      förlag: "Bokhuset AB",
      nyckelord: ["stad", "liv", "möten", "relationer", "kultur", "vänskap"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 350
    })
  },
  {
    filename: 'barnens-äventyrsvärld.jpg',
    description: JSON.stringify({
      titel: "Barnens äventyrsvärld",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Barnbok", "Fantasivärld"],
      bild: "images/barnens-äventyrsvärld.jpg",
      format: ["pocket", "talbok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-09-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "fantasi", "äventyr", "drömmar", "familj", "lek"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 120
    })
  },
  {
    filename: 'hemliga-garden.jpg',
    description: JSON.stringify({
      titel: "Hemliga gården",
      författare: ["Albin Fors", "Clara Berg"],
      utgivningsår: 2022,
      genre: ["Äventyr", "Mystik"],
      bild: "images/hemliga-garden.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-09-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["äventyr", "gåta", "skatt", "magi", "vänskap", "hemlighet"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 358
    })
  },
  {
    filename: 'resan-till-norr.jpg',
    description: JSON.stringify({
      titel: "Resan till norr",
      författare: "Julia Lind",
      utgivningsår: 2020,
      genre: ["Reseskildring", "Äventyr"],
      bild: "images/resan-till-norr.jpg",
      format: ["pocket", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-09-2",
      förlag: "StoryPrint",
      nyckelord: ["resor", "natur", "äventyr", "vänskap", "kultur", "fjäll"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 320
    })
  },
  {
    filename: 'tidens-labyrint.jpg',
    description: JSON.stringify({
      titel: "Tidens labyrint",
      författare: ["Erik Holm", "Sofia Bergström"],
      utgivningsår: 2021,
      genre: ["Science Fiction", "Mystik"],
      bild: "images/tidens-labyrint.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-09-3",
      förlag: "Nordiska Förlaget",
      nyckelord: ["tid", "resor", "magi", "framtid", "gåta", "äventyr"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 336
    })
  },
  {
    filename: 'skogens-hemliga-rike.jpg',
    description: JSON.stringify({
      titel: "Skogens hemliga rike",
      författare: "Lars Dahl",
      utgivningsår: 2019,
      genre: ["Äventyr", "Barnbok"],
      bild: "images/skogens-hemliga-rike.jpg",
      format: ["pocket", "talbok"],
      språk: "Svenska",
      isbn: "978-91-10001-09-4",
      förlag: "Barnens Bokhus",
      nyckelord: ["äventyr", "magi", "vänskap", "skog", "fantasi", "djur"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 114
    })
  },
  {
    filename: 'morkret-i-skogen.jpg',
    description: JSON.stringify({
      titel: "Mörkret i skogen",
      författare: ["Caroline Holm", "Jonas Berg"],
      utgivningsår: 2022,
      genre: ["Deckare", "Thriller"],
      bild: "images/morkret-i-skogen.jpg",
      format: ["inbunden", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-09-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["brott", "mysterium", "polis", "hemlighet", "spänning", "gåta"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 370
    })
  },
  {
    filename: 'framtidens-hemliga-värld.jpg',
    description: JSON.stringify({
      titel: "Framtidens hemliga värld",
      författare: "Karin Ekström",
      utgivningsår: 2018,
      genre: ["Science Fiction"],
      bild: "images/framtidens-hemliga-värld.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-09-6",
      förlag: "Bokhuset AB",
      nyckelord: ["framtid", "teknik", "äventyr", "resor", "innovation"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 318
    })
  },
  {
    filename: 'stjarnornas-mystiska-värld.jpg',
    description: JSON.stringify({
      titel: "Stjärnornas mystiska värld",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Natur"],
      bild: "images/stjarnornas-mystiska-värld.jpg",
      format: ["talbok", "ljudbok", "inbunden"],
      språk: "Svenska",
      isbn: "978-91-10001-09-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "universum", "resor", "frihet", "drama", "äventyr"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 322
    })
  },
  {
    filename: 'det-hemliga-dokumentet.jpg',
    description: JSON.stringify({
      titel: "Det hemliga dokumentet",
      författare: "Helena Ström",
      utgivningsår: 2017,
      genre: ["Deckare"],
      bild: "images/det-hemliga-dokumentet.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-09-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["gåta", "mysterium", "polis", "hemlighet", "lösning", "intrig"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 266
    })
  },
  {
    filename: 'ljus-och-magi.jpg',
    description: JSON.stringify({
      titel: "Ljus och magi",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Roman", "Drama"],
      bild: "images/ljus-och-magi.jpg",
      format: ["inbunden", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-09-9",
      förlag: "Bokhuset AB",
      nyckelord: ["stad", "liv", "möten", "relationer", "kultur", "vänskap"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 352
    })
  },
  {
    filename: 'barnens-hemliga-värld.jpg',
    description: JSON.stringify({
      titel: "Barnens hemliga värld",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Barnbok", "Fantasivärld"],
      bild: "images/barnens-hemliga-värld.jpg",
      format: ["pocket", "talbok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-10-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "fantasi", "äventyr", "drömmar", "familj", "lek"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 122
    })
  },
  {
    filename: 'mysteriet-pa-slotten.jpg',
    description: JSON.stringify({
      titel: "Mysteriet på slottet",
      författare: ["Albin Fors", "Clara Berg"],
      utgivningsår: 2022,
      genre: ["Äventyr", "Mystik"],
      bild: "images/mysteriet-pa-slotten.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-10-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["äventyr", "gåta", "skatt", "magi", "vänskap", "slott"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 360
    })
  },
  {
    filename: 'resan-till-fjallen.jpg',
    description: JSON.stringify({
      titel: "Resan till fjällen",
      författare: "Julia Lind",
      utgivningsår: 2020,
      genre: ["Reseskildring", "Äventyr"],
      bild: "images/resan-till-fjallen.jpg",
      format: ["pocket", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-10-2",
      förlag: "StoryPrint",
      nyckelord: ["resor", "natur", "äventyr", "vänskap", "kultur", "fjäll", "vandring"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 322
    })
  },
  {
    filename: 'tidens-labyrinter.jpg',
    description: JSON.stringify({
      titel: "Tidens labyrinter",
      författare: ["Erik Holm", "Sofia Bergström"],
      utgivningsår: 2021,
      genre: ["Science Fiction", "Mystik"],
      bild: "images/tidens-labyrinter.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-10-3",
      förlag: "Nordiska Förlaget",
      nyckelord: ["tid", "resor", "magi", "framtid", "gåta", "äventyr"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 338
    })
  },
  {
    filename: 'skogens-mystiska-värld.jpg',
    description: JSON.stringify({
      titel: "Skogens mystiska värld",
      författare: "Lars Dahl",
      utgivningsår: 2019,
      genre: ["Äventyr", "Barnbok"],
      bild: "images/skogens-mystiska-värld.jpg",
      format: ["pocket", "talbok"],
      språk: "Svenska",
      isbn: "978-91-10001-10-4",
      förlag: "Barnens Bokhus",
      nyckelord: ["äventyr", "magi", "vänskap", "skog", "fantasi", "djur", "hemlighet"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 116
    })
  },
  {
    filename: 'morkret-over-sjön.jpg',
    description: JSON.stringify({
      titel: "Mörkret över sjön",
      författare: ["Caroline Holm", "Jonas Berg"],
      utgivningsår: 2022,
      genre: ["Deckare", "Thriller"],
      bild: "images/morkret-over-sjön.jpg",
      format: ["inbunden", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-10-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["brott", "mysterium", "polis", "hemlighet", "spänning", "gåta", "sjö"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 372
    })
  },
  {
    filename: 'framtidens-labyrint.jpg',
    description: JSON.stringify({
      titel: "Framtidens labyrint",
      författare: "Karin Ekström",
      utgivningsår: 2018,
      genre: ["Science Fiction"],
      bild: "images/framtidens-labyrint.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-10-6",
      förlag: "Bokhuset AB",
      nyckelord: ["framtid", "teknik", "äventyr", "resor", "innovation", "mystik"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 320
    })
  },
  {
    filename: 'stjarnornas-hemlighet.jpg',
    description: JSON.stringify({
      titel: "Stjärnornas hemlighet",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Natur"],
      bild: "images/stjarnornas-hemlighet.jpg",
      format: ["talbok", "ljudbok", "inbunden"],
      språk: "Svenska",
      isbn: "978-91-10001-10-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "universum", "resor", "frihet", "drama", "äventyr", "hemlighet"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 324
    })
  },
  {
    filename: 'det-forsvunna-dokumentet.jpg',
    description: JSON.stringify({
      titel: "Det försvunna dokumentet",
      författare: "Helena Ström",
      utgivningsår: 2017,
      genre: ["Deckare"],
      bild: "images/det-forsvunna-dokumentet.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-10-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["gåta", "mysterium", "polis", "hemlighet", "lösning", "intrig"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 268
    })
  },
  {
    filename: 'ljus-och-hemligheter.jpg',
    description: JSON.stringify({
      titel: "Ljus och hemligheter",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Roman", "Drama"],
      bild: "images/ljus-och-hemligheter.jpg",
      format: ["inbunden", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-10-9",
      förlag: "Bokhuset AB",
      nyckelord: ["stad", "liv", "möten", "relationer", "kultur", "vänskap", "hemlighet"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 354
    })
  },
  {
    filename: 'barnens-hemliga-äventyr.jpg',
    description: JSON.stringify({
      titel: "Barnens hemliga äventyr",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Barnbok", "Fantasivärld"],
      bild: "images/barnens-hemliga-äventyr.jpg",
      format: ["pocket", "talbok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-11-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "fantasi", "äventyr", "drömmar", "familj", "lek", "hemlighet"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 124
    })
  },
  {
    filename: 'hemligheter-i-staden.jpg',
    description: JSON.stringify({
      titel: "Hemligheter i staden",
      författare: ["Albin Fors", "Clara Berg"],
      utgivningsår: 2022,
      genre: ["Äventyr", "Mystik"],
      bild: "images/hemligheter-i-staden.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-12-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["äventyr", "gåta", "skatt", "magi", "vänskap", "hemlighet", "mysterium"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 364
    })
  },
  {
    filename: 'resan-till-sodra-öarna.jpg',
    description: JSON.stringify({
      titel: "Resan till södra öarna",
      författare: "Julia Lind",
      utgivningsår: 2020,
      genre: ["Reseskildring", "Äventyr"],
      bild: "images/resan-till-sodra-öarna.jpg",
      format: ["pocket", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-12-2",
      förlag: "StoryPrint",
      nyckelord: ["resor", "natur", "äventyr", "vänskap", "kultur", "öar", "segling"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 326
    })
  },
  {
    filename: 'tidens-mysterium.jpg',
    description: JSON.stringify({
      titel: "Tidens mysterium",
      författare: ["Erik Holm", "Sofia Bergström"],
      utgivningsår: 2021,
      genre: ["Science Fiction", "Mystik"],
      bild: "images/tidens-mysterium.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-12-3",
      förlag: "Nordiska Förlaget",
      nyckelord: ["tid", "resor", "magi", "framtid", "gåta", "äventyr", "hemlighet"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 342
    })
  },
  {
    filename: 'skogens-fantastiska-hemligheter.jpg',
    description: JSON.stringify({
      titel: "Skogens fantastiska hemligheter",
      författare: "Lars Dahl",
      utgivningsår: 2019,
      genre: ["Äventyr", "Barnbok"],
      bild: "images/skogens-fantastiska-hemligheter.jpg",
      format: ["pocket", "talbok"],
      språk: "Svenska",
      isbn: "978-91-10001-12-4",
      förlag: "Barnens Bokhus",
      nyckelord: ["äventyr", "magi", "vänskap", "skog", "fantasi", "djur", "hemlighet", "lek"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 120
    })
  },
  {
    filename: 'morkret-i-by.jpg',
    description: JSON.stringify({
      titel: "Mörkret i by",
      författare: ["Caroline Holm", "Jonas Berg"],
      utgivningsår: 2022,
      genre: ["Deckare", "Thriller"],
      bild: "images/morkret-i-by.jpg",
      format: ["inbunden", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-12-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["brott", "mysterium", "polis", "hemlighet", "spänning", "gåta"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 376
    })
  },
  {
    filename: 'framtidens-hemliga-labyrint.jpg',
    description: JSON.stringify({
      titel: "Framtidens hemliga labyrint",
      författare: "Karin Ekström",
      utgivningsår: 2018,
      genre: ["Science Fiction"],
      bild: "images/framtidens-hemliga-labyrint.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-12-6",
      förlag: "Bokhuset AB",
      nyckelord: ["framtid", "teknik", "äventyr", "resor", "innovation", "mystik"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 324
    })
  },
  {
    filename: 'stjarnornas-fantastiska-resor.jpg',
    description: JSON.stringify({
      titel: "Stjärnornas fantastiska resor",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Natur"],
      bild: "images/stjarnornas-fantastiska-resor.jpg",
      format: ["talbok", "ljudbok", "inbunden"],
      språk: "Svenska",
      isbn: "978-91-10001-12-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "universum", "resor", "frihet", "drama", "äventyr", "hemlighet"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 328
    })
  },
  {
    filename: 'det-forsvunna-hemliga-dokumentet.jpg',
    description: JSON.stringify({
      titel: "Det försvunna hemliga dokumentet",
      författare: "Helena Ström",
      utgivningsår: 2017,
      genre: ["Deckare"],
      bild: "images/det-forsvunna-hemliga-dokumentet.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-12-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["gåta", "mysterium", "polis", "hemlighet", "lösning", "intrig"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 272
    })
  },
  {
    filename: 'ljus-och-magiska-hemligheter.jpg',
    description: JSON.stringify({
      titel: "Ljus och magiska hemligheter",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Roman", "Drama"],
      bild: "images/ljus-och-magiska-hemligheter.jpg",
      format: ["inbunden", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-12-9",
      förlag: "Bokhuset AB",
      nyckelord: ["stad", "liv", "möten", "relationer", "kultur", "vänskap", "fantasi", "magi"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 358
    })
  },
  {
    filename: 'barnens-fantastiska-äventyr.jpg',
    description: JSON.stringify({
      titel: "Barnens fantastiska äventyr",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Barnbok", "Fantasivärld"],
      bild: "images/barnens-fantastiska-äventyr.jpg",
      format: ["pocket", "talbok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-13-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "fantasi", "äventyr", "drömmar", "familj", "lek", "magi"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 128
    })
  },
  {
    filename: 'mysteriet-i-byggnaden.jpg',
    description: JSON.stringify({
      titel: "Mysteriet i byggnaden",
      författare: ["Albin Fors", "Clara Berg"],
      utgivningsår: 2022,
      genre: ["Äventyr", "Mystik"],
      bild: "images/mysteriet-i-byggnaden.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-13-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["äventyr", "gåta", "skatt", "magi", "vänskap", "hemlighet", "mysterium"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 366
    })
  },
  {
    filename: 'resan-till-norra-öarna.jpg',
    description: JSON.stringify({
      titel: "Resan till norra öarna",
      författare: "Julia Lind",
      utgivningsår: 2020,
      genre: ["Reseskildring", "Äventyr"],
      bild: "images/resan-till-norra-öarna.jpg",
      format: ["pocket", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-13-2",
      förlag: "StoryPrint",
      nyckelord: ["resor", "natur", "äventyr", "vänskap", "kultur", "öar", "segling"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 328
    })
  },
  {
    filename: 'tidens-hemliga-vandring.jpg',
    description: JSON.stringify({
      titel: "Tidens hemliga vandring",
      författare: ["Erik Holm", "Sofia Bergström"],
      utgivningsår: 2021,
      genre: ["Science Fiction", "Mystik"],
      bild: "images/tidens-hemliga-vandring.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-13-3",
      förlag: "Nordiska Förlaget",
      nyckelord: ["tid", "resor", "magi", "framtid", "gåta", "äventyr", "hemlighet"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 344
    })
  },
  {
    filename: 'skogens-fantastiska-hemliga-värld.jpg',
    description: JSON.stringify({
      titel: "Skogens fantastiska hemliga värld",
      författare: "Lars Dahl",
      utgivningsår: 2019,
      genre: ["Äventyr", "Barnbok"],
      bild: "images/skogens-fantastiska-hemliga-värld.jpg",
      format: ["pocket", "talbok"],
      språk: "Svenska",
      isbn: "978-91-10001-13-4",
      förlag: "Barnens Bokhus",
      nyckelord: ["äventyr", "magi", "vänskap", "skog", "fantasi", "djur", "hemlighet", "lek"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 122
    })
  },
  {
    filename: 'morkret-i-skogen.jpg',
    description: JSON.stringify({
      titel: "Mörkret i skogen",
      författare: ["Caroline Holm", "Jonas Berg"],
      utgivningsår: 2022,
      genre: ["Deckare", "Thriller"],
      bild: "images/morkret-i-skogen.jpg",
      format: ["inbunden", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-13-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["brott", "mysterium", "polis", "hemlighet", "spänning", "gåta", "skog"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 378
    })
  },
  {
    filename: 'framtidens-hemliga-universum.jpg',
    description: JSON.stringify({
      titel: "Framtidens hemliga universum",
      författare: "Karin Ekström",
      utgivningsår: 2018,
      genre: ["Science Fiction"],
      bild: "images/framtidens-hemliga-universum.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-13-6",
      förlag: "Bokhuset AB",
      nyckelord: ["framtid", "teknik", "äventyr", "resor", "innovation", "mystik"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 326
    })
  },
  {
    filename: 'stjarnornas-hemliga-universum.jpg',
    description: JSON.stringify({
      titel: "Stjärnornas hemliga universum",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Natur"],
      bild: "images/stjarnornas-hemliga-universum.jpg",
      format: ["talbok", "ljudbok", "inbunden"],
      språk: "Svenska",
      isbn: "978-91-10001-13-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "universum", "resor", "frihet", "drama", "äventyr", "hemlighet"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 330
    })
  },
  {
    filename: 'det-forsvunna-hemliga-arkivet.jpg',
    description: JSON.stringify({
      titel: "Det försvunna hemliga arkivet",
      författare: "Helena Ström",
      utgivningsår: 2017,
      genre: ["Deckare"],
      bild: "images/det-forsvunna-hemliga-arkivet.jpg",
      format: ["e-bok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-13-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["gåta", "mysterium", "polis", "hemlighet", "lösning", "intrig"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 274
    })
  },
  {
    filename: 'ljus-och-magiska-resor.jpg',
    description: JSON.stringify({
      titel: "Ljus och magiska resor",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Roman", "Drama"],
      bild: "images/ljus-och-magiska-resor.jpg",
      format: ["inbunden", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-13-9",
      förlag: "Bokhuset AB",
      nyckelord: ["stad", "liv", "möten", "relationer", "kultur", "vänskap", "fantasi", "magi"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 360
    })
  },
  {
    filename: 'barnens-hemliga-fantasi.jpg',
    description: JSON.stringify({
      titel: "Barnens hemliga fantasi",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Barnbok", "Fantasivärld"],
      bild: "images/barnens-hemliga-fantasi.jpg",
      format: ["pocket", "talbok", "ljudbok"],
      språk: "Svenska",
      isbn: "978-91-10001-14-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "fantasi", "äventyr", "drömmar", "familj", "lek", "magi"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 130
    })
  },
  {
    filename: 'mysteriet-i-tornet.jpg',
    description: JSON.stringify({
      titel: "Mysteriet i tornet",
      författare: ["Albin Fors", "Clara Berg"],
      utgivningsår: 2022,
      genre: ["Äventyr", "Mystik"],
      bild: "images/mysteriet-i-tornet.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-14-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["äventyr", "gåta", "skatt", "magi", "vänskap", "hemlighet"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 368
    })
  },
  {
    filename: 'journey-to-the-mountains.jpg',
    description: JSON.stringify({
      titel: "Journey to the Mountains",
      författare: "Julia Lind",
      utgivningsår: 2020,
      genre: ["Travel", "Adventure"],
      bild: "images/journey-to-the-mountains.jpg",
      format: ["pocket", "e-bok"],
      språk: "English",
      isbn: "978-91-10001-14-2",
      förlag: "StoryPrint",
      nyckelord: ["travel", "nature", "adventure", "friendship", "culture", "hiking", "mountains"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 330
    })
  },
  {
    filename: 'les-mysteres-du-chateau.jpg',
    description: JSON.stringify({
      titel: "Les mystères du château",
      författare: ["Erik Holm", "Sofia Bergström"],
      utgivningsår: 2021,
      genre: ["Mystère", "Aventure"],
      bild: "images/les-mysteres-du-chateau.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Français",
      isbn: "978-91-10001-14-3",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mystère", "aventure", "magie", "secret", "énigme", "voyage"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 346
    })
  },
  {
    filename: 'der-geheime-wald.jpg',
    description: JSON.stringify({
      titel: "Der geheime Wald",
      författare: "Lars Dahl",
      utgivningsår: 2019,
      genre: ["Abenteuer", "Kinderbuch"],
      bild: "images/der-geheime-wald.jpg",
      format: ["pocket", "hörbuch"],
      språk: "Deutsch",
      isbn: "978-91-10001-14-4",
      förlag: "Barnens Bokhus",
      nyckelord: ["abenteuer", "magie", "freundschaft", "wald", "fantasie", "tiere", "geheimnis"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 124
    })
  },
  {
    filename: 'darkness-over-the-lake.jpg',
    description: JSON.stringify({
      titel: "Darkness Over the Lake",
      författare: ["Caroline Holm", "Jonas Berg"],
      utgivningsår: 2022,
      genre: ["Crime", "Thriller"],
      bild: "images/darkness-over-the-lake.jpg",
      format: ["hardcover", "audiobook"],
      språk: "English",
      isbn: "978-91-10001-14-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["crime", "mystery", "police", "secret", "thrill", "lake"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 380
    })
  },
  {
    filename: 'universum-der-zukunft.jpg',
    description: JSON.stringify({
      titel: "Universum der Zukunft",
      författare: "Karin Ekström",
      utgivningsår: 2018,
      genre: ["Science Fiction"],
      bild: "images/universum-der-zukunft.jpg",
      format: ["e-bok", "hörbuch"],
      språk: "Deutsch",
      isbn: "978-91-10001-14-6",
      förlag: "Bokhuset AB",
      nyckelord: ["zukunft", "technik", "abenteuer", "reisen", "innovation", "mystik"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 328
    })
  },
  {
    filename: 'les-etoiles-secretes.jpg',
    description: JSON.stringify({
      titel: "Les étoiles secrètes",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Nature"],
      bild: "images/les-etoiles-secretes.jpg",
      format: ["livre-audio", "inbunden"],
      språk: "Français",
      isbn: "978-91-10001-14-7",
      förlag: "StoryPrint",
      nyckelord: ["nature", "univers", "voyage", "liberté", "drame", "aventure", "secret"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 332
    })
  },
  {
    filename: 'the-lost-secret-document.jpg',
    description: JSON.stringify({
      titel: "The Lost Secret Document",
      författare: "Helena Ström",
      utgivningsår: 2017,
      genre: ["Crime"],
      bild: "images/the-lost-secret-document.jpg",
      format: ["e-book", "audiobook"],
      språk: "English",
      isbn: "978-91-10001-14-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mystery", "crime", "police", "secret", "solution", "intrigue"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 276
    })
  },
  {
    filename: 'light-and-magical-secrets.jpg',
    description: JSON.stringify({
      titel: "Light and Magical Secrets",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Novel", "Drama"],
      bild: "images/light-and-magical-secrets.jpg",
      format: ["hardcover", "e-book"],
      språk: "English",
      isbn: "978-91-10001-14-9",
      förlag: "Bokhuset AB",
      nyckelord: ["city", "life", "meetings", "relationships", "culture", "friendship", "fantasy", "magic"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 362
    })
  },
  {
    filename: 'barnens-secret-fantasy.jpg',
    description: JSON.stringify({
      titel: "Barnens Secret Fantasy",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Children", "Fantasy World"],
      bild: "images/barnens-secret-fantasy.jpg",
      format: ["pocket", "audiobook", "e-book"],
      språk: "English",
      isbn: "978-91-10001-15-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["children", "fantasy", "adventure", "dreams", "family", "play", "magic"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 132
    })
  },
  {
    filename: 'hemligheter-i-slottet.jpg',
    description: JSON.stringify({
      titel: "Hemligheter i slottet",
      författare: ["Albin Fors", "Clara Berg"],
      utgivningsår: 2022,
      genre: ["Äventyr", "Mystik"],
      bild: "images/hemligheter-i-slottet.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-15-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["äventyr", "gåta", "slott", "magi", "vänskap", "hemlighet"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 370
    })
  },
  {
    filename: 'voyage-au-coeur-de-la-forêt.jpg',
    description: JSON.stringify({
      titel: "Voyage au cœur de la forêt",
      författare: ["Julia Lind", "Sophie Durand"],
      utgivningsår: 2020,
      genre: ["Aventure", "Nature"],
      bild: "images/voyage-au-coeur-de-la-forêt.jpg",
      format: ["pocket", "livre-audio"],
      språk: "Français",
      isbn: "978-91-10001-15-2",
      förlag: "StoryPrint",
      nyckelord: ["forêt", "aventure", "exploration", "animaux", "secret", "amitié", "magie"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 332
    })
  },
  {
    filename: 'geheimnisse-des-schlosses.jpg',
    description: JSON.stringify({
      titel: "Geheimnisse des Schlosses",
      författare: ["Erik Holm", "Sofia Bergström"],
      utgivningsår: 2021,
      genre: ["Abenteuer", "Mystik"],
      bild: "images/geheimnisse-des-schlosses.jpg",
      format: ["inbunden", "hörbuch", "e-bok"],
      språk: "Deutsch",
      isbn: "978-91-10001-15-3",
      förlag: "Nordiska Förlaget",
      nyckelord: ["schloss", "mysterium", "abenteuer", "magie", "rätsel", "freundschaft"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 348
    })
  },
  {
    filename: 'the-mystery-of-the-castle.jpg',
    description: JSON.stringify({
      titel: "The Mystery of the Castle",
      författare: ["Lars Dahl", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Adventure", "Mystery"],
      bild: "images/the-mystery-of-the-castle.jpg",
      format: ["pocket", "audiobook"],
      språk: "English",
      isbn: "978-91-10001-15-4",
      förlag: "Barnens Bokhus",
      nyckelord: ["castle", "mystery", "adventure", "magic", "friendship", "animals"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 126
    })
  },
  {
    filename: 'darkness-in-the-city.jpg',
    description: JSON.stringify({
      titel: "Darkness in the City",
      författare: ["Caroline Holm", "Jonas Berg"],
      utgivningsår: 2022,
      genre: ["Crime", "Thriller"],
      bild: "images/darkness-in-the-city.jpg",
      format: ["hardcover", "audiobook"],
      språk: "English",
      isbn: "978-91-10001-15-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["crime", "mystery", "police", "secret", "thrill", "city"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 382
    })
  },
  {
    filename: 'univers-secret-de-lavenir.jpg',
    description: JSON.stringify({
      titel: "Univers secret de l'avenir",
      författare: ["Karin Ekström"],
      utgivningsår: 2018,
      genre: ["Science Fiction"],
      bild: "images/univers-secret-de-lavenir.jpg",
      format: ["e-book", "livre-audio"],
      språk: "Français",
      isbn: "978-91-10001-15-6",
      förlag: "Bokhuset AB",
      nyckelord: ["avenir", "technologie", "aventure", "voyage", "innovation", "mystère"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 330
    })
  },
  {
    filename: 'die-geheimnisse-der-sterne.jpg',
    description: JSON.stringify({
      titel: "Die Geheimnisse der Sterne",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Natur"],
      bild: "images/die-geheimnisse-der-sterne.jpg",
      format: ["hörbuch", "inbunden"],
      språk: "Deutsch",
      isbn: "978-91-10001-15-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "universum", "reise", "freiheit", "drama", "abenteuer", "geheimnis"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 334
    })
  },
  {
    filename: 'the-lost-secret-letter.jpg',
    description: JSON.stringify({
      titel: "The Lost Secret Letter",
      författare: "Helena Ström",
      utgivningsår: 2017,
      genre: ["Crime"],
      bild: "images/the-lost-secret-letter.jpg",
      format: ["e-book", "audiobook"],
      språk: "English",
      isbn: "978-91-10001-15-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mystery", "crime", "police", "secret", "solution", "intrigue", "letter"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 278
    })
  },
  {
    filename: 'light-and-secret-magic.jpg',
    description: JSON.stringify({
      titel: "Light and Secret Magic",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Novel", "Drama"],
      bild: "images/light-and-secret-magic.jpg",
      format: ["hardcover", "e-book"],
      språk: "English",
      isbn: "978-91-10001-15-9",
      förlag: "Bokhuset AB",
      nyckelord: ["city", "life", "meetings", "relationships", "culture", "friendship", "fantasy", "magic"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 364
    })
  },
  {
    filename: 'barnens-magiska-äventyr.jpg',
    description: JSON.stringify({
      titel: "Barnens magiska äventyr",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Children", "Fantasy World"],
      bild: "images/barnens-magiska-äventyr.jpg",
      format: ["pocket", "audiobook", "e-book"],
      språk: "English",
      isbn: "978-91-10001-16-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["children", "fantasy", "adventure", "dreams", "family", "play", "magic", "friendship"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 134
    })
  },
  {
    filename: 'hemligheter-pa-fjallet.jpg',
    description: JSON.stringify({
      titel: "Hemligheter på fjället",
      författare: ["Albin Fors", "Clara Berg"],
      utgivningsår: 2022,
      genre: ["Äventyr", "Mystik"],
      bild: "images/hemligheter-pa-fjallet.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-16-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["äventyr", "gåta", "fjäll", "magi", "vänskap", "hemlighet", "spänning"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 372
    })
  },
  {
    filename: 'journey-through-the-forest.jpg',
    description: JSON.stringify({
      titel: "Journey Through the Forest",
      författare: ["Julia Lind", "Sophie Durand"],
      utgivningsår: 2020,
      genre: ["Adventure", "Nature"],
      bild: "images/journey-through-the-forest.jpg",
      format: ["pocket", "audiobook", "e-book"],
      språk: "English",
      isbn: "978-91-10001-16-2",
      förlag: "StoryPrint",
      nyckelord: ["forest", "adventure", "exploration", "animals", "friendship", "magic", "secrets"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 334
    })
  },
  {
    filename: 'les-secrets-de-la-vallee.jpg',
    description: JSON.stringify({
      titel: "Les secrets de la vallée",
      författare: ["Erik Holm", "Sofia Bergström"],
      utgivningsår: 2021,
      genre: ["Mystère", "Aventure"],
      bild: "images/les-secrets-de-la-vallee.jpg",
      format: ["inbunden", "livre-audio", "e-book"],
      språk: "Français",
      isbn: "978-91-10001-16-3",
      förlag: "Nordiska Förlaget",
      nyckelord: ["vallée", "mystère", "aventure", "magie", "énigme", "amitié", "exploration"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 350
    })
  },
  {
    filename: 'das-geheime-tal.jpg',
    description: JSON.stringify({
      titel: "Das geheime Tal",
      författare: ["Lars Dahl", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Abenteuer", "Kinderbuch"],
      bild: "images/das-geheime-tal.jpg",
      format: ["pocket", "hörbuch"],
      språk: "Deutsch",
      isbn: "978-91-10001-16-4",
      förlag: "Barnens Bokhus",
      nyckelord: ["tal", "geheimnis", "abenteuer", "magie", "freundschaft", "tiere", "fantasie"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 128
    })
  },
  {
    filename: 'darkness-over-the-forest.jpg',
    description: JSON.stringify({
      titel: "Darkness Over the Forest",
      författare: ["Caroline Holm", "Jonas Berg"],
      utgivningsår: 2022,
      genre: ["Crime", "Thriller"],
      bild: "images/darkness-over-the-forest.jpg",
      format: ["hardcover", "audiobook"],
      språk: "English",
      isbn: "978-91-10001-16-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["crime", "mystery", "police", "secret", "thrill", "forest", "suspense"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 384
    })
  },
  {
    filename: 'univers-futur-secret.jpg',
    description: JSON.stringify({
      titel: "Univers futur secret",
      författare: ["Karin Ekström"],
      utgivningsår: 2018,
      genre: ["Science Fiction"],
      bild: "images/univers-futur-secret.jpg",
      format: ["e-book", "livre-audio"],
      språk: "Français",
      isbn: "978-91-10001-16-6",
      förlag: "Bokhuset AB",
      nyckelord: ["avenir", "technologie", "aventure", "voyage", "innovation", "mystère", "univers"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 332
    })
  },
  {
    filename: 'die-verborgenen-sterne.jpg',
    description: JSON.stringify({
      titel: "Die verborgenen Sterne",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Natur"],
      bild: "images/die-verborgenen-sterne.jpg",
      format: ["hörbuch", "inbunden"],
      språk: "Deutsch",
      isbn: "978-91-10001-16-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "universum", "reise", "freiheit", "drama", "abenteuer", "geheimnis", "sterne"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 336
    })
  },
  {
    filename: 'the-lost-secret-scroll.jpg',
    description: JSON.stringify({
      titel: "The Lost Secret Scroll",
      författare: "Helena Ström",
      utgivningsår: 2017,
      genre: ["Crime"],
      bild: "images/the-lost-secret-scroll.jpg",
      format: ["e-book", "audiobook"],
      språk: "English",
      isbn: "978-91-10001-16-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mystery", "crime", "police", "secret", "solution", "intrigue", "scroll"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 280
    })
  },
  {
    filename: 'light-and-magical-dreams.jpg',
    description: JSON.stringify({
      titel: "Light and Magical Dreams",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Novel", "Drama"],
      bild: "images/light-and-magical-dreams.jpg",
      format: ["hardcover", "e-book"],
      språk: "English",
      isbn: "978-91-10001-16-9",
      förlag: "Bokhuset AB",
      nyckelord: ["city", "life", "meetings", "relationships", "culture", "friendship", "fantasy", "magic", "dreams"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 366
    })
  },
  {
    filename: 'barnens-magical-journey.jpg',
    description: JSON.stringify({
      titel: "Barnens Magical Journey",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Children", "Fantasy World"],
      bild: "images/barnens-magical-journey.jpg",
      format: ["pocket", "audiobook", "e-book"],
      språk: "English",
      isbn: "978-91-10001-17-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["children", "fantasy", "adventure", "dreams", "family", "play", "magic", "friendship", "exploration"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 136
    })
  },
  {
    filename: 'hemligheter-i-staden.jpg',
    description: JSON.stringify({
      titel: "Hemligheter i staden",
      författare: ["Albin Fors", "Clara Berg"],
      utgivningsår: 2022,
      genre: ["Äventyr", "Mystik"],
      bild: "images/hemligheter-i-staden.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-17-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["äventyr", "gåta", "stad", "magi", "vänskap", "hemlighet", "spänning"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 374
    })
  },
  {
    filename: 'adventures-in-the-valley.jpg',
    description: JSON.stringify({
      titel: "Adventures in the Valley",
      författare: ["Julia Lind", "Sophie Durand"],
      utgivningsår: 2020,
      genre: ["Adventure", "Nature"],
      bild: "images/adventures-in-the-valley.jpg",
      format: ["pocket", "audiobook", "e-book"],
      språk: "English",
      isbn: "978-91-10001-17-2",
      förlag: "StoryPrint",
      nyckelord: ["valley", "adventure", "exploration", "animals", "friendship", "magic", "secrets"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 336
    })
  },
  {
    filename: 'les-aventures-du-chateau.jpg',
    description: JSON.stringify({
      titel: "Les aventures du château",
      författare: ["Erik Holm", "Sofia Bergström"],
      utgivningsår: 2021,
      genre: ["Aventure", "Mystère"],
      bild: "images/les-aventures-du-chateau.jpg",
      format: ["inbunden", "livre-audio", "e-book"],
      språk: "Français",
      isbn: "978-91-10001-17-3",
      förlag: "Nordiska Förlaget",
      nyckelord: ["château", "mystère", "aventure", "magie", "énigme", "amitié", "exploration"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 352
    })
  },
  {
    filename: 'das-verborgene-schloss.jpg',
    description: JSON.stringify({
      titel: "Das verborgene Schloss",
      författare: ["Lars Dahl", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Abenteuer", "Kinderbuch"],
      bild: "images/das-verborgene-schloss.jpg",
      format: ["pocket", "hörbuch"],
      språk: "Deutsch",
      isbn: "978-91-10001-17-4",
      förlag: "Barnens Bokhus",
      nyckelord: ["schloss", "geheimnis", "abenteuer", "magie", "freundschaft", "tiere", "fantasie"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 130
    })
  },
  {
    filename: 'mystery-in-the-forest.jpg',
    description: JSON.stringify({
      titel: "Mystery in the Forest",
      författare: ["Caroline Holm", "Jonas Berg"],
      utgivningsår: 2022,
      genre: ["Crime", "Thriller"],
      bild: "images/mystery-in-the-forest.jpg",
      format: ["hardcover", "audiobook"],
      språk: "English",
      isbn: "978-91-10001-17-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["crime", "mystery", "police", "secret", "thrill", "forest", "suspense"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 386
    })
  },
  {
    filename: 'univers-secret-du-futur.jpg',
    description: JSON.stringify({
      titel: "Univers secret du futur",
      författare: ["Karin Ekström"],
      utgivningsår: 2018,
      genre: ["Science Fiction"],
      bild: "images/univers-secret-du-futur.jpg",
      format: ["e-book", "livre-audio"],
      språk: "Français",
      isbn: "978-91-10001-17-6",
      förlag: "Bokhuset AB",
      nyckelord: ["avenir", "technologie", "aventure", "voyage", "innovation", "mystère", "univers"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 334
    })
  },
  {
    filename: 'die-verborgenen-sternbilder.jpg',
    description: JSON.stringify({
      titel: "Die verborgenen Sternbilder",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Natur"],
      bild: "images/die-verborgenen-sternbilder.jpg",
      format: ["hörbuch", "inbunden"],
      språk: "Deutsch",
      isbn: "978-91-10001-17-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "universum", "reise", "freiheit", "drama", "abenteuer", "geheimnis", "sterne"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 338
    })
  },
  {
    filename: 'the-lost-secret-manuscript.jpg',
    description: JSON.stringify({
      titel: "The Lost Secret Manuscript",
      författare: "Helena Ström",
      utgivningsår: 2017,
      genre: ["Crime"],
      bild: "images/the-lost-secret-manuscript.jpg",
      format: ["e-book", "audiobook"],
      språk: "English",
      isbn: "978-91-10001-17-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mystery", "crime", "police", "secret", "solution", "intrigue", "manuscript"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 282
    })
  },
  {
    filename: 'light-and-magical-journey.jpg',
    description: JSON.stringify({
      titel: "Light and Magical Journey",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Novel", "Drama"],
      bild: "images/light-and-magical-journey.jpg",
      format: ["hardcover", "e-book"],
      språk: "English",
      isbn: "978-91-10001-17-9",
      förlag: "Bokhuset AB",
      nyckelord: ["city", "life", "meetings", "relationships", "culture", "friendship", "fantasy", "magic", "dreams"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 368
    })
  },
  {
    filename: 'barnens-magical-adventure.jpg',
    description: JSON.stringify({
      titel: "Barnens Magical Adventure",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Children", "Fantasy World"],
      bild: "images/barnens-magical-adventure.jpg",
      format: ["pocket", "audiobook", "e-book"],
      språk: "English",
      isbn: "978-91-10001-18-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["children", "fantasy", "adventure", "dreams", "family", "play", "magic", "friendship", "exploration"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 138
    })
  },
  {
    filename: 'mysterier-i-skogen.jpg',
    description: JSON.stringify({
      titel: "Mysterier i skogen",
      författare: ["Albin Fors", "Clara Berg"],
      utgivningsår: 2022,
      genre: ["Äventyr", "Mystik"],
      bild: "images/mysterier-i-skogen.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-18-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["äventyr", "gåta", "skog", "magi", "vänskap", "hemlighet", "spänning"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 376
    })
  },
  {
    filename: 'journey-to-the-mountains.jpg',
    description: JSON.stringify({
      titel: "Journey to the Mountains",
      författare: ["Julia Lind", "Sophie Durand"],
      utgivningsår: 2020,
      genre: ["Adventure", "Nature"],
      bild: "images/journey-to-the-mountains.jpg",
      format: ["pocket", "audiobook", "e-book"],
      språk: "English",
      isbn: "978-91-10001-18-2",
      förlag: "StoryPrint",
      nyckelord: ["äventyr", "natur", "vandring", "vänskap", "utforskning", "hemlighet", "djur"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 338
    })
  },
  {
    filename: 'les-secrets-du-chateau.jpg',
    description: JSON.stringify({
      titel: "Les secrets du château",
      författare: ["Erik Holm", "Sofia Bergström"],
      utgivningsår: 2021,
      genre: ["Mystère", "Aventure"],
      bild: "images/les-secrets-du-chateau.jpg",
      format: ["inbunden", "livre-audio", "e-book"],
      språk: "Français",
      isbn: "978-91-10001-18-3",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mystik", "äventyr", "slott", "gåta", "magi", "vänskap", "hemlighet"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 354
    })
  },
  {
    filename: 'das-geheime-schloss.jpg',
    description: JSON.stringify({
      titel: "Das geheime Schloss",
      författare: ["Lars Dahl", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Abenteuer", "Kinderbuch"],
      bild: "images/das-geheime-schloss.jpg",
      format: ["pocket", "hörbuch"],
      språk: "Deutsch",
      isbn: "978-91-10001-18-4",
      förlag: "Barnens Bokhus",
      nyckelord: ["hemlighet", "äventyr", "slott", "magie", "vänskap", "djur", "fantasi"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 132
    })
  },
  {
    filename: 'darkness-over-the-lake.jpg',
    description: JSON.stringify({
      titel: "Darkness Over the Lake",
      författare: ["Caroline Holm", "Jonas Berg"],
      utgivningsår: 2022,
      genre: ["Crime", "Thriller"],
      bild: "images/darkness-over-the-lake.jpg",
      format: ["hardcover", "audiobook"],
      språk: "English",
      isbn: "978-91-10001-18-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mysterium", "brott", "polis", "hemlighet", "spänning", "sjö", "lösning"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 388
    })
  },
  {
    filename: 'universum-der-zukunft.jpg',
    description: JSON.stringify({
      titel: "Universum der Zukunft",
      författare: ["Karin Ekström"],
      utgivningsår: 2018,
      genre: ["Science Fiction"],
      bild: "images/universum-der-zukunft.jpg",
      format: ["e-book", "hörbuch"],
      språk: "Deutsch",
      isbn: "978-91-10001-18-6",
      förlag: "Bokhuset AB",
      nyckelord: ["framtid", "teknik", "äventyr", "resa", "innovation", "mystik", "universum"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 336
    })
  },
  {
    filename: 'les-etoiles-cachees.jpg',
    description: JSON.stringify({
      titel: "Les étoiles cachées",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Nature"],
      bild: "images/les-etoiles-cachees.jpg",
      format: ["livre-audio", "inbunden"],
      språk: "Français",
      isbn: "978-91-10001-18-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "universum", "resa", "frihet", "drama", "äventyr", "hemlighet", "stjärnor"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 340
    })
  },
  {
    filename: 'the-lost-secret-document.jpg',
    description: JSON.stringify({
      titel: "The Lost Secret Document",
      författare: "Helena Ström",
      utgivningsår: 2017,
      genre: ["Crime"],
      bild: "images/the-lost-secret-document.jpg",
      format: ["e-book", "audiobook"],
      språk: "English",
      isbn: "978-91-10001-18-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mysterium", "brott", "polis", "hemlighet", "lösning", "intrig", "dokument"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 284
    })
  },
  {
    filename: 'light-and-magical-secrets.jpg',
    description: JSON.stringify({
      titel: "Light and Magical Secrets",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Novel", "Drama"],
      bild: "images/light-and-magical-secrets.jpg",
      format: ["hardcover", "e-book"],
      språk: "English",
      isbn: "978-91-10001-18-9",
      förlag: "Bokhuset AB",
      nyckelord: ["stad", "liv", "möten", "relationer", "kultur", "vänskap", "fantasi", "magi", "drömmar"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 370
    })
  },
  {
    filename: 'barnens-magiska-resa.jpg',
    description: JSON.stringify({
      titel: "Barnens magiska resa",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Children", "Fantasy World"],
      bild: "images/barnens-magiska-resa.jpg",
      format: ["pocket", "audiobook", "e-book"],
      språk: "English",
      isbn: "978-91-10001-19-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "fantasy", "äventyr", "drömmar", "familj", "lek", "magi", "vänskap", "utforskning"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 140
    })
  },
  {
    filename: 'mysteriet-i-tornet.jpg',
    description: JSON.stringify({
      titel: "Mysteriet i tornet",
      författare: ["Albin Fors", "Clara Berg"],
      utgivningsår: 2022,
      genre: ["Äventyr", "Mystik"],
      bild: "images/mysteriet-i-tornet.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-19-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mysterium", "torn", "gåta", "äventyr", "vänskap", "hemlighet", "magisk"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 378
    })
  },
  {
    filename: 'journey-through-the-river.jpg',
    description: JSON.stringify({
      titel: "Journey Through the River",
      författare: ["Julia Lind", "Sophie Durand"],
      utgivningsår: 2020,
      genre: ["Adventure", "Nature"],
      bild: "images/journey-through-the-river.jpg",
      format: ["pocket", "audiobook", "e-book"],
      språk: "English",
      isbn: "978-91-10001-19-2",
      förlag: "StoryPrint",
      nyckelord: ["äventyr", "flod", "natur", "utforskning", "vänskap", "djur", "hemlighet"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 340
    })
  },
  {
    filename: 'les-mysteres-de-la-foret.jpg',
    description: JSON.stringify({
      titel: "Les mystères de la forêt",
      författare: ["Erik Holm", "Sofia Bergström"],
      utgivningsår: 2021,
      genre: ["Mystère", "Aventure"],
      bild: "images/les-mysteres-de-la-foret.jpg",
      format: ["inbunden", "livre-audio", "e-book"],
      språk: "Français",
      isbn: "978-91-10001-19-3",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mysterium", "skog", "äventyr", "gåta", "magi", "vänskap", "hemlighet"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 356
    })
  },
  {
    filename: 'das-verborgene-tor.jpg',
    description: JSON.stringify({
      titel: "Das verborgene Tor",
      författare: ["Lars Dahl", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Abenteuer", "Kinderbuch"],
      bild: "images/das-verborgene-tor.jpg",
      format: ["pocket", "hörbuch"],
      språk: "Deutsch",
      isbn: "978-91-10001-19-4",
      förlag: "Barnens Bokhus",
      nyckelord: ["hemlighet", "port", "äventyr", "magie", "vänskap", "djur", "fantasi"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 134
    })
  },
  {
    filename: 'shadow-over-the-lake.jpg',
    description: JSON.stringify({
      titel: "Shadow Over the Lake",
      författare: ["Caroline Holm", "Jonas Berg"],
      utgivningsår: 2022,
      genre: ["Crime", "Thriller"],
      bild: "images/shadow-over-the-lake.jpg",
      format: ["hardcover", "audiobook"],
      språk: "English",
      isbn: "978-91-10001-19-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mysterium", "brott", "polis", "hemlighet", "spänning", "sjö", "lösning"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 390
    })
  },
  {
    filename: 'futur-univers-secret.jpg',
    description: JSON.stringify({
      titel: "Futur Univers Secret",
      författare: ["Karin Ekström"],
      utgivningsår: 2018,
      genre: ["Science Fiction"],
      bild: "images/futur-univers-secret.jpg",
      format: ["e-book", "livre-audio"],
      språk: "Français",
      isbn: "978-91-10001-19-6",
      förlag: "Bokhuset AB",
      nyckelord: ["framtid", "universum", "äventyr", "resa", "innovation", "mystik", "teknik"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 338
    })
  },
  {
    filename: 'die-verborgenen-welten.jpg',
    description: JSON.stringify({
      titel: "Die verborgenen Welten",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Natur"],
      bild: "images/die-verborgenen-welten.jpg",
      format: ["hörbuch", "inbunden"],
      språk: "Deutsch",
      isbn: "978-91-10001-19-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "universum", "resa", "frihet", "drama", "äventyr", "hemlighet", "stjärnor"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 342
    })
  },
  {
    filename: 'the-lost-magic-scroll.jpg',
    description: JSON.stringify({
      titel: "The Lost Magic Scroll",
      författare: "Helena Ström",
      utgivningsår: 2017,
      genre: ["Crime"],
      bild: "images/the-lost-magic-scroll.jpg",
      format: ["e-book", "audiobook"],
      språk: "English",
      isbn: "978-91-10001-19-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mysterium", "brott", "polis", "hemlighet", "lösning", "intrig", "rullskript"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 286
    })
  },
  {
    filename: 'light-and-secret-dreams.jpg',
    description: JSON.stringify({
      titel: "Light and Secret Dreams",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Novel", "Drama"],
      bild: "images/light-and-secret-dreams.jpg",
      format: ["hardcover", "e-book"],
      språk: "English",
      isbn: "978-91-10001-19-9",
      förlag: "Bokhuset AB",
      nyckelord: ["stad", "liv", "möten", "relationer", "kultur", "vänskap", "fantasi", "magi", "drömmar"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 372
    })
  },
  {
    filename: 'barnens-magiska-äventyr-2.jpg',
    description: JSON.stringify({
      titel: "Barnens magiska äventyr 2",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Children", "Fantasy World"],
      bild: "images/barnens-magiska-äventyr-2.jpg",
      format: ["pocket", "audiobook", "e-book"],
      språk: "English",
      isbn: "978-91-10001-20-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "fantasy", "äventyr", "drömmar", "familj", "lek", "magi", "vänskap", "utforskning"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 142
    })
  },
  {
    filename: 'mysteriet-med-den-försvunna-skattkistan.jpg',
    description: JSON.stringify({
      titel: "Mysteriet med den försvunna skattkistan",
      författare: ["Albin Fors", "Clara Berg"],
      utgivningsår: 2022,
      genre: ["Äventyr", "Mystik"],
      bild: "images/mysteriet-med-den-försvunna-skattkistan.jpg",
      format: ["inbunden", "ljudbok", "e-bok"],
      språk: "Svenska",
      isbn: "978-91-10001-20-1",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mysterium", "skatt", "äventyr", "gåta", "vänskap", "hemlighet", "spänning"],
      plats: "Malmö Stadsbibliotek",
      gps: [55.6050, 13.0038],
      antal_sidor: 380
    })
  },
  {
    filename: 'adventure-in-the-mountains.jpg',
    description: JSON.stringify({
      titel: "Adventure in the Mountains",
      författare: ["Julia Lind", "Sophie Durand"],
      utgivningsår: 2020,
      genre: ["Adventure", "Nature"],
      bild: "images/adventure-in-the-mountains.jpg",
      format: ["pocket", "audiobook", "e-book"],
      språk: "English",
      isbn: "978-91-10001-20-2",
      förlag: "StoryPrint",
      nyckelord: ["äventyr", "berg", "natur", "utforskning", "vänskap", "djur", "hemlighet"],
      plats: "Lunds Stadsbibliotek",
      gps: [55.7047, 13.1910],
      antal_sidor: 342
    })
  },
  {
    filename: 'les-mysteres-du-jardin.jpg',
    description: JSON.stringify({
      titel: "Les mystères du jardin",
      författare: ["Erik Holm", "Sofia Bergström"],
      utgivningsår: 2021,
      genre: ["Mystère", "Aventure"],
      bild: "images/les-mysteres-du-jardin.jpg",
      format: ["inbunden", "livre-audio", "e-book"],
      språk: "Français",
      isbn: "978-91-10001-20-3",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mysterium", "trädgård", "äventyr", "gåta", "magi", "vänskap", "hemlighet"],
      plats: "Helsingborgs Stadsbibliotek",
      gps: [56.0465, 12.6945],
      antal_sidor: 358
    })
  },
  {
    filename: 'das-verborgene-tor-2.jpg',
    description: JSON.stringify({
      titel: "Das verborgene Tor 2",
      författare: ["Lars Dahl", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Abenteuer", "Kinderbuch"],
      bild: "images/das-verborgene-tor-2.jpg",
      format: ["pocket", "hörbuch"],
      språk: "Deutsch",
      isbn: "978-91-10001-20-4",
      förlag: "Barnens Bokhus",
      nyckelord: ["hemlighet", "port", "äventyr", "magie", "vänskap", "djur", "fantasi"],
      plats: "Trelleborgs Bibliotek",
      gps: [55.3751, 13.1569],
      antal_sidor: 136
    })
  },
  {
    filename: 'dark-shadow-over-the-lake.jpg',
    description: JSON.stringify({
      titel: "Dark Shadow Over the Lake",
      författare: ["Caroline Holm", "Jonas Berg"],
      utgivningsår: 2022,
      genre: ["Crime", "Thriller"],
      bild: "images/dark-shadow-over-the-lake.jpg",
      format: ["hardcover", "audiobook"],
      språk: "English",
      isbn: "978-91-10001-20-5",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mysterium", "brott", "polis", "hemlighet", "spänning", "sjö", "lösning"],
      plats: "Kristianstads Stadsbibliotek",
      gps: [56.0294, 14.1567],
      antal_sidor: 392
    })
  },
  {
    filename: 'futur-secret-univers.jpg',
    description: JSON.stringify({
      titel: "Futur Secret Univers",
      författare: ["Karin Ekström"],
      utgivningsår: 2018,
      genre: ["Science Fiction"],
      bild: "images/futur-secret-univers.jpg",
      format: ["e-book", "livre-audio"],
      språk: "Français",
      isbn: "978-91-10001-20-6",
      förlag: "Bokhuset AB",
      nyckelord: ["framtid", "universum", "äventyr", "resa", "innovation", "mystik", "teknik"],
      plats: "Ystads Stadsbibliotek",
      gps: [55.4297, 13.8201],
      antal_sidor: 340
    })
  },
  {
    filename: 'die-verborgenen-lande.jpg',
    description: JSON.stringify({
      titel: "Die verborgenen Lande",
      författare: ["Oskar Nilsson", "Greta Holm"],
      utgivningsår: 2022,
      genre: ["Roman", "Natur"],
      bild: "images/die-verborgenen-lande.jpg",
      format: ["hörbuch", "inbunden"],
      språk: "Deutsch",
      isbn: "978-91-10001-20-7",
      förlag: "StoryPrint",
      nyckelord: ["natur", "universum", "resa", "frihet", "drama", "äventyr", "hemlighet", "stjärnor"],
      plats: "Ängelholms Stadsbibliotek",
      gps: [56.2428, 12.8622],
      antal_sidor: 344
    })
  },
  {
    filename: 'the-lost-ancient-scroll.jpg',
    description: JSON.stringify({
      titel: "The Lost Ancient Scroll",
      författare: "Helena Ström",
      utgivningsår: 2017,
      genre: ["Crime"],
      bild: "images/the-lost-ancient-scroll.jpg",
      format: ["e-book", "audiobook"],
      språk: "English",
      isbn: "978-91-10001-20-8",
      förlag: "Nordiska Förlaget",
      nyckelord: ["mysterium", "brott", "polis", "hemlighet", "lösning", "intrig", "rullskript"],
      plats: "Höganäs Bibliotek",
      gps: [56.1991, 12.5559],
      antal_sidor: 288
    })
  },
  {
    filename: 'light-and-secret-adventures.jpg',
    description: JSON.stringify({
      titel: "Light and Secret Adventures",
      författare: ["Fredrik Åberg", "Anna Bergström"],
      utgivningsår: 2019,
      genre: ["Novel", "Drama"],
      bild: "images/light-and-secret-adventures.jpg",
      format: ["hardcover", "e-book"],
      språk: "English",
      isbn: "978-91-10001-20-9",
      förlag: "Bokhuset AB",
      nyckelord: ["stad", "liv", "möten", "relationer", "kultur", "vänskap", "fantasi", "magi", "drömmar"],
      plats: "Eslövs Stadsbibliotek",
      gps: [55.8370, 13.3036],
      antal_sidor: 374
    })
  },
  {
    filename: 'barnens-magiska-resa-3.jpg',
    description: JSON.stringify({
      titel: "Barnens magiska resa 3",
      författare: ["Sofia Karlsson", "Emma Dahl"],
      utgivningsår: 2021,
      genre: ["Children", "Fantasy World"],
      bild: "images/barnens-magiska-resa-3.jpg",
      format: ["pocket", "audiobook", "e-book"],
      språk: "English",
      isbn: "978-91-10001-21-0",
      förlag: "Barnens Bokhus",
      nyckelord: ["barn", "fantasy", "äventyr", "drömmar", "familj", "lek", "magi", "vänskap", "utforskning"],
      plats: "Landskrona Stadsbibliotek",
      gps: [55.8708, 12.8302],
      antal_sidor: 144
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