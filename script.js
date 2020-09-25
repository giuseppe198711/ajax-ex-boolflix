$(document).ready (function() {

  $(".btn").click(function () {

    var richiesta = $("#search").val();
    ricercafilms(richiesta);
    ricercaTelefilms(richiesta);
    // svuoto il search
    $("#search").val("");
  })


  $("#search").keyup(
    function(event) {

      if (event.which == 13) {
        var richiesta = $("#search").val();
        ricercafilms(richiesta);
        ricercaTelefilms(richiesta);
        // svuoto il search
        $("#search").val("");
      }
    }
  );


});

// inizio di tutte le funzioni

// con queesta funzione mi vado a stampare i parametri dei film ricercati

function renderMovie(movies) {
  $("#list-films").html("")


  // console.log(movies);

  var source = $("#films-template").html();
  var template = Handlebars.compile(source);

  // stampare ogni film ricevuto dalla chiamata api
  for (var i = 0; i < movies.length; i++) {

    // invece di crearmi delle variabili vado direttamente a passarlo al mio
    // oggetto context che abbiamo sotto --> var contex =

    // var title = movies[i].title;
    // var titleOriginal =
    // var lang = movies[i].original_language;
    // var vote = movies[i].vote_everage;
    var strStar = changeVote(movies[i].vote_average);

    switch (strStar) {
      case 0:
        strStar = "<i class='far fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i>";
        break;

      case 1:
        strStar = "<i class='fas fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i>";
        break;
      case 2:
        strStar = "<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i>";
        break;
      case 3:
        strStar = "<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i>";
        break;
      case 4:
        strStar = "<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='far fa-star'></i>";
        break;
      case 5:
      strStar = "<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i>";
      break;
    };

    console.log(strStar);
     var strUrlFlag = "img/"+movies[i].original_language+".png";

     if (movies[i].poster_path == null) {
       var poster = "img/no-poster.png";
     } else {
       var poster = "https://image.tmdb.org/t/p/w185" + movies[i].poster_path;
     }

    // prepariamo il nostro context
    var context = {
      "title": movies[i].title,
      "original_title": movies[i].original_title,
      "lang": strUrlFlag,
      "vote": strStar,
      "poster_path": poster,
      "overview": movies[i].overview

    };

    // prepariamo il nostro html
    var html = template(context);
    // iniettiamo il nostro html nel tag ul
    $("#list-films").append(html);

  }


}

// per telefilms
function renderTelefilms(movies) {
  $("#list-telefilms").html("")


  // console.log(movies);

  var source = $("#telefilms-template").html();
  var template = Handlebars.compile(source);

  // stampare ogni film ricevuto dalla chiamata api
  for (var i = 0; i < movies.length; i++) {

    // invece di crearmi delle variabili vado direttamente a passarlo al mio
    // oggetto context che abbiamo sotto --> var contex =

    // var title = movies[i].title;
    // var titleOriginal =
    // var lang = movies[i].original_language;
    // var vote = movies[i].vote_everage;
    var strStar = changeVote(movies[i].vote_average);

    switch (strStar) {
      case 0:
        strStar = "<i class='far fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i>";
        break;

      case 1:
        strStar = "<i class='fas fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i>";
        break;
      case 2:
        strStar = "<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i>";
        break;
      case 3:
        strStar = "<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='far fa-star'></i><i class='far fa-star'></i>";
        break;
      case 4:
        strStar = "<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='far fa-star'></i>";
        break;
      case 5:
      strStar = "<i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i><i class='fas fa-star'></i>";
      break;
    };

     var strUrlFlag = "img/"+movies[i].original_language+".png";
     console.log(movies[i]);

    if (movies[i].poster_path == null) {
      var poster = "img/no-poster.png";
    } else {
      var poster = "https://image.tmdb.org/t/p/w185" + movies[i].poster_path;
    }

    // prepariamo il nostro context
    var context = {
      "name": movies[i].name,
      "original_name": movies[i].original_name,
      "lang": strUrlFlag,
      "vote": strStar,
      "poster_path": poster,
      "overview": movies[i].overview

    };

    // prepariamo il nostro html
    var html = template(context);
    // iniettiamo il nostro html nel tag ul
    $("#list-telefilms").append(html);

  }


}

function changeVote(vote) {

 var cambioVoto = vote / 2;
 var risultato = Math.ceil(cambioVoto);

 return risultato;
};

// con questa funzione vado a richiamare dal mio api cio che ha scritto
// l utente all'interno del search
function ricercafilms(testoUtente) {
  $.ajax (
    { "url": "https://api.themoviedb.org/3/search/movie",
    "data": {
      "api_key": "943e6e03b1c9ee8d9498785955588f72",
      "query": testoUtente,
      "language": "it-IT"
    },
     "method": "GET",
     "success": function(data) {
       renderMovie(data.results);
     },
     "error": function (err) {
       alert("Errore!");

     }
   }
  );
}

// con questa funzione vado a richiamare dal mio api cio che ha scritto
// l utente all'interno del search
function ricercaTelefilms(testoUtente) {
  $.ajax (
    { "url": "https://api.themoviedb.org/3/search/tv",
    "data": {
      "api_key": "943e6e03b1c9ee8d9498785955588f72",
      "query": testoUtente,
      "language": "it-IT"
    },
     "method": "GET",
     "success": function(data) {
       renderTelefilms(data.results);
     },
     "error": function (err) {
       alert("Errore!");

     }
   }
  );
}
