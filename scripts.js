$(function() {
   $('#get-button').on('click', function() { //setting the button on html to trigger this event
        $.ajax({
          url: '/tweets',
          contentType: 'application/json',
          success: function(response) {
            var namebodyEl = $('#namebody'); //changing to the namebody portion of html
            namebodyEl.html('');
            response.tweetinfo.forEach(function(tweet) //goes through each tweet to display them
            {//displays the text of all tweets on html
              namebodyEl.append('\
                <tr>\
                    <td <class="id">' + tweet.user.id_str + '</td>\
                    <td>' + tweet.user.screen_name + '</td>\
                    <td <class="id">' + tweet.user.name + '</td>\
                <tr>\
                ');
            });
          }
        });
    });


    //Get tweets
    $('#get-tweets-button').on('click', function(){ //setting the button on html to trigger this event
        $.ajax({
          url: '/tweetinfo',
          contentType: 'application.json',
          success: function(response) {
            console.log(response); //displays result text in console on success
            var tweetbodyEl = $('#tweetbody');
            tweetbodyEl.html('');
            response.tweetinfo.forEach(function(tweet) //go through all stored tweets to display on html
            {//displays tweets indidually
              tweetbodyEl.append('\
                <tr>\
                    <td <class="id">' + tweet.id_str + '</td>\
                    <td> ' + tweet.text + '</td>\
                    <td <class="id">' + tweet.created_at + '</td>\
                <tr>\
                ');
            });
          }

        });
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() {

    });


  //CREATE
  $('#create-form').on('submit', function(event){ //setting the button on html to trigger this event
        event.preventDefault();
        var createInput = $('#create-input');
        $.ajax({
          url: '/tweetinfo',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({ newText: createInput.val()}), //adds newly created tweet into our data
          success: function(response){
            console.log(response); //displays result text in console
            createInput.val('');
            $('#get-button').click();
          }
        })
        //for some reason I can not get the newly created tweets to also display the ID under the Users, and Tweets section. However, the text of the tweet displays fine.
  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){
    event.preventDefault();
    var userID = $('#search-input');
  });
  //script to update the users screen name
  $("#update-user").on('submit', function(event){
    event.preventDefault();
  var updateInput = $('#update-input');
  var inputString = updateInput.val();
  const parsedStrings = inputString.split(';'); //split the string into two parts so we can seperate the old and new name
  var name = parsedStrings[0]; //contains old screen name
  var newName = parsedStrings[1];//contains new desired screen name
  $.ajax({
          url: '/tweets/' + name,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({ newName: newName }),
          success: function(response) {
              console.log(response);
              $('#update-user').click();
          }
      });
});


  //DELETE
  //I had this entire function working earlier, after chaning some things in my code, it no longer works. Im really not sure what 
  //else to try, however I beleive that most of this code is correct, and I think im just missing a very tiny part
  $("#delete-form").on('submit', function() {
    var id = $('#delete-input')
    event.preventDefault();
    var delID = id.val();
    $.ajax({
            url: '/tweetinfo/' + delID,
            method: 'DELETE',
            contentType: 'application/json',
            data: JSON.stringify({ id: id}),
            success: function(response) {
                console.log(response);
                $('#get-button').click();
            }
        });

  });


});


                    
   