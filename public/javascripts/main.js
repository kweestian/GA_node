$(function(){
  $('#search').on('keyup', function(e){

  // Attach an event handler when user presses 'Enter'
    if(e.keyCode === 13) {
      var parameters = {
        search: $(this).val()
      };

      // Ajax
      $.get('/searching', parameters, function(data) {
        // here we send our params to our endpoint '/searching' and get 'data' from the omdb API

        //  there's usually more that one result, so need to loop through them using Jquery.each method
        // for each result we get the details and store it in singleResultParams
        $.each(data, function(key, value) {

          var singleResultParams = {
            title: value.Title,
            poster: value.Poster,
            type: value.Type,
            year: value.Year
          }


          // we create a list item for each result
          // the button needs to have a unique selector to target later 'key'
          $('#results').append("<li class='single-result'>" + value.Title + "<ul class='single-result__details'><li>Year: " + value.Year + "</li><li>Type: " + value.Type + "</li><li><img src='" + value.Poster + "'/></li></ul></li><button id='" + key + "'>Add to favorites</button>");

          // attach handler to each button
          // when clicked it is going to post data to '/favorites' and send back a success message
          $('button#' + key).click(function(e){
            $.post('/favorites', singleResultParams);
            alert("Succesfully favorited " + value.Title);
          });

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
