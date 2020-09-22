$(document).ready (function() {

  $(".btn").click(function () {

    var richiesta = $("#search").val();
    ricercafilms(richiesta);
    // svuoto il search
    $("#search").val("");
  })


  $("#search").keyup(
    function(event) {

      if (event.which == 13) {
        var richiesta = $("#search").val();
        ricercafilms(richiesta);
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

    // prepariamo il nostro context
    var context = {
      "title": movies[i].title,
      "title_original": movies[i].original_title,
      "lang": movies[i].original_language,
      "vote:": movies[i].vote_everage
    };

    // prepariamo il nostro html
    var html = template(movies[i]);
    // iniettiamo il nostro html nel tag ul
    $("#list-films").append(html);
  }

}



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
