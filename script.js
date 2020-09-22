$(document).ready (function() {

  var searchMovie ="Star Wars";

  $.ajax (
    { "url": "https://api.themoviedb.org/3/search/movie",
    "data": {
      "api-key": "943e6e03b1c9ee8d9498785955588f72",
      "query": searchMovie,
      "language": "it-IT"
    },
     "method": "GET",
     "succes": function(data) {
       console.log(data);
     },
     "error": function (err) {
       alert("Errore");

     }
    }
  );

});
