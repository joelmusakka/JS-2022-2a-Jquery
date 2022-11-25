//Hakukenttä tyhjenee, kun sivu päivitetään.
window.onload = document.getElementById("input").value = "";
//Kun käyttäjä painaa "Etsi"-nappia, suoritetaan hakufunktio input kentän arvolla.
document.getElementById("searchbutton").addEventListener("click", function () {
  getInformation();
});
//Kun käyttäjä painaa Enteriä, suoritetaan hakufunktio input-kentän arvolla.
document.getElementById("input").addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getInformation();
  }
});
//Kun käyttäjä painaa hakukentän kohdalla hiirtä, kenttä tyhjenee.
document.getElementById("input").addEventListener("click", function () {
  document.getElementById("input").value = "";
});

//Määritellään muuttujat
var theatreID;
var searchWord;
//luodaan aika muuttuja
var date = new Date();
var day = date.getDate();

var month = date.getMonth() + 1;

var year = date.getFullYear();
//Lisätään päiväykseen päivä,kuukausi ja vuosi
date = day + "." + month + "." + year;
document.getElementById("otsikko").innerHTML =
  "Finnkino elokuvat " + date + "<br> - Sami H ja Joel M";

//Funktio valitsee haun perusteella oikean teatterin ja sitä vastaavan ID:n.
function getInformation() {
  valinta = document.getElementById("input").value;
  valinta = valinta.trim();
  valinta = valinta.toLowerCase();

  switch (valinta) {
    case "pääkaupunkiseutu":
    case "pkseutu":
      theatreID = 1014;
      searchWord = "Pääkaupunkiseutu";
      break;

    case "helsinki":
    case "hki":
    case "stadi":
      theatreID = 1002;
      searchWord = "Helsinki";
      break;

    case "tampere":
    case "tre":
      theatreID = 1021;
      searchWord = "Tampere";
      break;

    case "turku ja raisio":
    case "raisio ja turku":
    case "turku & raisio":
    case "raisio turku":
      theatreID = 1047;
      searchWord = "Turku & Raisio";
      break;

    case "espoo omena":
    case "omena":
    case "iso omena":
    case "espoo - iso omena":
      theatreID = 1039;
      searchWord = "Espoo - Iso Omena";
      break;

    case "espoo - sello":
    case "espoo sello":
    case "sello":
      theatreID = 1038;
      searchWord = "Espoo - Sello";
      break;

    case "helsinki itis":
    case "helsinki itäkeskus":
    case "itis":
    case "itäkeskus":
    case "helsinki - itis":
      theatreID = 1045;
      searchWord = "Helsinki - Itis";
      break;

    case "helsinki kinopalatsi":
    case "kinopalatsi":
    case "kino":
    case "helsinki - kinopalatsi":
      theatreID = 1031;
      searchWord = "Helsinki - Kinopalatsi";
      break;

    case "helsinki maxim":
    case "maxim":
    case "helsinki - maxim":
      theatreID = 1032;
      searchWord = "Helsinki - Maxim";
      break;

    case "helsinki tennispalatsi":
    case "tennispalatsi":
    case "helsinki - tennispalatsi":
      theatreID = 1033;
      searchWord = "Helsinki - Tennispalatsi";
      break;

    case "vantaa flamingo":
    case "vantaa jumbo":
    case "vantaa":
    case "flamingo":
    case "jumbo":
    case "vantaa - flamingo":
      theatreID = 1013;
      searchWord = "Vantaa - Flamingo";
      break;

    case "jyväskylä fantasia":
    case "jyväskylä":
    case "fantasia":
    case "jyväskylä - fantasia":
      theatreID = 1015;
      searchWord = "Jyväskylä - Fantasia";
      break;

    case "kuopio scala":
    case "kuopio":
    case "scala":
    case "kuopio - scala":
      theatreID = 1016;
      searchWord = "Kuopio - Scala";
      break;

    case "lahti kuvapalatsi":
    case "lahti":
    case "kuvapalatsi":
    case "lahti - kuvapalatsi":
      theatreID = 1017;
      searchWord = "Lahti - Kuvapalatsi";
      break;

    case "lappeenranta strand":
    case "lappeenranta":
    case "strand":
    case "lappeenranta - strand":
      theatreID = 1041;
      searchWord = "Lappeenranta - Strand";
      break;

    case "oulu plaza":
    case "oulu":
    case "plaza":
    case "oulu - plaza":
      theatreID = 1018;
      searchWord = "Oulu - Plaza";
      break;

    case "pori - promenadi":
    case "pori promenadi":
    case "pori":
    case "promenadi":
      theatreID = 1019;
      searchWord = "Pori - Promenadi";
      break;

    case "tampere - cine atlas":
    case "tampere cine atlas":
    case "tre cine atlas":
    case "tre atlas":
    case "tre cine":
    case "cine atlas":
    case "cine":
    case "atlas":
    case "Tampere - Cine Atlas":
      theatreID = 1034;
      searchWord = "Tampere - Cine Atlas";
      break;

    case "tampere - plevna":
    case "tampere plevna":
    case "tre plevna":
    case "plevna":
    case "Tampere - Plevna":
      theatreID = 1035;
      searchWord = "Tampere - Plevna";
      break;

    case "turku - kinopalatsi":
    case "turku kinopalatsi":
    case "kinopalatsi turku":
    case "turku":
      theatreID = 1022;
      searchWord = "Turku - Kinopalatsi";
      break;

    case "raisio - luxe mylly":
    case "raisio luxe mylly":
    case "raisio":
    case "luxe mylly":
    case "luxe":
    case "mylly":
      theatreID = 1046;
      searchWord = "Raisio - Luxe Mylly";
      break;

    default:
      theatreID = null;
      searchWord = "";
      var haku = document.getElementById("input").value;
      alert(
        'Hakemaasi aluetta tai teatteria:  "' +
          haku +
          '" ei löytynyt. Ole hyvä ja kokeile toista hakusanaa tai valitse oikea teatteri valikosta.'
      );
      document.getElementById("input").value = "";
  }
  //Kun teatteri on valittu, suoritetaan XML datan haku ja tulostetaan oikea data näytölle.
  getXmlData();
  document.getElementById("input").value = searchWord;
}

function getXmlData() {
  //Jos theatreID on määritetty, tehdään kysely API:in.
  if (theatreID != undefined) {
    var url =
      "https://www.finnkino.fi/xml/Schedule/?area=" + theatreID + "&dt=" + date;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        parseXML(this);
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }
}
//XML datan parsiminen
function parseXML(xml) {
  xmlData = xml.responseXML;
  var x = xmlData.getElementsByTagName("Show");
  var table = "<table>";
  var i;
  //Tarkistetaan onko näytöksiä tälle päivälle.
  if (x.length == 0) {
    var listName = document.getElementById("input").value;
    var cinemaName;
    if (listName == "") {
      cinemaName = searchWord;
    } else {
      cinemaName = listName;
    }
    alert(
      cinemaName + " Ei näytöksiä tänään. Valitse toinen alue tai teatteri."
    );
    document.getElementById("input").value = "";
  } else {
    //For luupin avulla haetaan API:sta haluamamme tiedot
    for (i = 0; i < x.length; i++) {
      var eventLink =
        x[i].getElementsByTagName("EventURL")[0].childNodes[0].nodeValue;
      var moviePoster = x[i].getElementsByTagName("EventSmallImagePortrait")[0]
        .childNodes[0].nodeValue;
      var eventTitle =
        x[i].getElementsByTagName("Title")[0].childNodes[0].nodeValue;
      var length =
        x[i].getElementsByTagName("LengthInMinutes")[0].childNodes[0].nodeValue;
      var showStartTime = x[i]
        .getElementsByTagName("dttmShowStart")[0]
        .childNodes[0].nodeValue.slice(11, 16);
      var place = x[i].getElementsByTagName("TheatreAndAuditorium")[0]
        .childNodes[0].nodeValue;
      var ageRating =
        x[i].getElementsByTagName("RatingImageUrl")[0].childNodes[0].nodeValue;
      var buyTicket =
        x[i].getElementsByTagName("ShowURL")[0].childNodes[0].nodeValue;
      //tiedot tallennetaan table muuttujan sisään.
      table +=
        "<tr><td id='pic' rowspan='2'> <a href='" +
        eventLink +
        "' target='_blank'>" +
        "<img id='moviePoster' src='" +
        moviePoster +
        "'></img>" +
        "</a></td><td id='date'>" +
        date +
        "</td><td id='header'><a id='id' href='" +
        eventLink +
        "'><p id='id'>" +
        eventTitle +
        "</p></a>" +
        "<img id='rating' src='" +
        ageRating +
        "'></img>" +
        "</td><td id='duration' rowspan='1'> Kesto:<br>" +
        timeConvert(length) +
        "</td></tr><tr><td id='startTime'> Alkaa:<br>" +
        showStartTime +
        "</td><td id='place'>Finnkino " +
        place +
        "</td><td><a href='" +
        buyTicket +
        "'><button id='buyTicket'>Osta Liput</button></a></tr>";
    }
    table += "</table>";
    //Table muuttuja tulostetaan näytölle span elementin sisään.
    document.getElementById("elokuvat").innerHTML = table;
  }
}
//Muutetaan minuutit tunneiksi ja minuuteiksi.
function timeConvert(duration) {
  var minutes = duration % 60;
  var hours = (duration - minutes) / 60;
  return hours + " h " + minutes + " min";
}
