$(document).ready (function() {

  var searchMovie ="Ritorno al futuro";

  $.ajax (
    { "url": "https://api.themoviedb.org/3/search/movie",
    "data": {
      "api_key": "943e6e03b1c9ee8d9498785955588f72",
      "query": searchMovie,
      "language": "it-IT"
    },
     "method": "GET",
     "success": function(data) {
       console.log(data.results);
     },
     "error": function (err) {
       alert("Errore!");

     }
   }
  );

});

function renderMovie(movies) {
  // console.log(movies);

  var source = $("#films-template").html();
  var template = Handlebars.compile(source);

  // stampare ogni film ricevuto dalla chiamata api
  for (var i = 0; i < movies.length; i++) {
    var title = movies[i].title;
    var titleOriginal = movies[i].original_title;
    var lang = movies[i].original_language;
    var vote = movies[i].vote_everage;

  // prepariamo il nostro context
    var context = {
      "title": title,
      "title_original": titleOriginal,
      "lang": lang,
      "vote:": vote
    };

    // prepariamo il nostro html
    var html = template(context);
    // iniettiamo il nostro html nel tag ul
    $("#list-films").appen(html);
  }

}
