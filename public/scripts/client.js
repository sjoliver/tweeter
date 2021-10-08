/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {

  $("div.icon").on("click", function(e) {
    $('#tweet-text').focus();
  })

  // hides error container (div) 
  $('#error-container').hide();

  $(".tweet-form").on("submit", function(event) {
    event.preventDefault();
    console.log("Form was submitted");

    const data = $(this).serialize();
    const charCount = $('.counter').val();

    // hides error container on re-submit when message was previously rendered by the following form validation conditionals
    $('#error-container').hide();

    let errorMessage = '';

    if (charCount < 0) {
      errorMessage = "Tweet exceeds max character count, please edit your tweet and try again."

      // replaces text inside of the span element (which is inside of the error container div)
      $('.error-message').text(errorMessage);

      // shows the full error element to user after invalid submission (contains above errorMessage)
      $('#error-container').slideDown(400);
      return;
    }
    
    if (data === null || data === "text=") {
      errorMessage = "Tweet cannot be empty, please enter text before submitting.";
      $('.error-message').text(errorMessage);
      $('#error-container').slideDown(400);     
      return;
    }

    // POST REQUEST: processing form submission 
    $.ajax({
      url: '/tweets',
      method: 'POST',
      dataType: 'text',
      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
      data: $(this).serialize(),
    }).then((result) => {
      loadTweet();
    }).catch((error) => {
      console.log(`there was an error: ${error}`);
    })

    // clears textarea once user submits new tweet
    $('#tweet-text').val('');
    // resets counter back to 140 after textarea is cleared
    $('.counter').val(140);

  });

  // load a single tweet
  const loadTweet = function() {

    // use jQuery to make a request to /tweets 
    // receive array of tweets as JSON
    $.ajax({
      url: '/tweets',
      method: 'GET',
    }).then((data) => {
      // access the last element in the data array -- last element is new tweet post object
      const dataObj = data[data.length - 1];

      // pass the dataObj as an array pp renderTweets loops through array only
      renderTweets([dataObj]);
    }).catch((error) => {
      console.log(`there was an error: ${error}`);
    })

  };

  // responsible for fetching tweets from /tweets
  const loadTweets = function() {

    // use jQuery to make a request to /tweets 
    // receive array of tweets as JSON
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
    }).then((data) => {
      renderTweets(data);
    }).catch((error) => {
      console.log(`there was an error: ${error}`);
    })

  };

  loadTweets();

  //---------------//
  // RENDER TWEETS //
  //---------------//

  // takes in array of tweet objects
  // appends each tweet object to tweet-feed
  // renderTweets will need to leverage createTweetElement by passing tweet object to it, then use the returned jQ object by appending it to tweet-feed section
  const renderTweets = function (array) {
    let $tweet;

    // loop through tweets
    for (const tweetObject of array) {

      // calls createTweetElement for each tweet
      $tweet = createTweetElement(tweetObject);
      $('.tweet-feed').prepend($tweet);

    };
  };

  //---------------//
  // CREATE TWEETS //
  //---------------//

  // createTweetElement: takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet
  const createTweetElement = function (tweetObject) {
    
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };

    const createdTime = timeago.format(tweetObject["created_at"]);
    const $tweet = `<article class="tweet-post">

    <header>
      <div class="tweet-user">
        <img src="${tweetObject.user.avatars}" alt="Avatar icon">
        <p>${tweetObject.user.name}</p>
      </div>
      <p id="username"><b>${tweetObject.user.handle}</b></p>
    </header>

    <div>
      <p id="tweet-content"><b>${escape(tweetObject.content.text)}</b></p>
    </div>

    <footer>
      <p><b>${createdTime}</b></p>
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>

  </article>`

    // return a tweet <article> element containing HTML of tweet
    return $tweet;
  };

});