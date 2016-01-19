$(function(){
  $('#search').on('keyup', function(e){

  // Here we Attach an event handler when user presses 'Enter'
    if(e.keyCode === 13) {
      var parameters = {
        search: $(this).val()
      };

      $.get('/searching', parameters, function(data) {
        // here we use ajax to send our params to our endpoint '/searching' and wait for the
        // data from OMDBapi and asynchronously append it to the <ul> in index.jade
        $.each(data, function(key, value) {

        var singleResultParams = {
          title: value.Title,
          poster: value.Poster,
          type: value.Type,
          year: value.Year
        }


          // generate list here
          $('#results').append("<li class='single-result'>" + value.Title + "<ul class='single-result__details'><li>Year: " + value.Year + "</li><li>Type: " + value.Type + "</li><li><img src='" + value.Poster + "'/></li></ul></li><button id='" + key + "'>Add to favorites</button>");

          // attach handler to each button every time that is going to send data to 'favorites' if clicked
          $('button#' + key).click(function(e){
            $.get('/addToFavorites', singleResultParams)
          })

          // hide details by default
          $('.single-result__details').css('display', 'none')
        });

      });
    };
  });

  $('#results').on('click', function(e) {
    // We add the event handler to the parent div, but we only care about the clicks on the children
    if (e.currentTarget !== e.target) {
      $(e.target).children('ul').toggle();
    }
  });
});
