/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// createTweetElement: takes in a tweet object and is responsible for returning a tweet <article> element containing the entire HTML structure of the tweet

$(document).ready(function() {


  const createTweetElement = function(tweetObject) {

    // HEADER
    const $header = $(`<header></header>`);
    const $divTweetUser = $(`<div class="tweet-user"></div>`)
    const $avatar = $(`<img src="${tweetObject["user"]["avatars"]}" alt="Avatar icon">`);
    const $name = $(`<p>${tweetObject["user"]["name"]}</p>`);
    const $username = $(`<p id="username"><b>${tweetObject["user"]["handle"]}</b></p>`);

    // CONTENT
    const $div = $(`<div></div>`);
    const $content = $(`<p id="tweet-content"><b>${tweetObject["content"]["text"]}</b></p>`);

    // FOOTER
    const $footer = $(`<footer></footer>`);
    const $createdAt = $(`<p><b>${tweetObject["created_at"]}</b></p>`);
    const $iconLinks = $(`
      <div class="icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    `)

    // create hardcoded tweet
    const $tweet = $(`<article class="tweet-post"></article>`);

    // build tweet out
    $footer.append($createdAt, $iconLinks);
    $div.append($content);
    $divTweetUser.append($avatar, $name);
    $header.append($divTweetUser, $username);
    $tweet.append($header, $div, $footer);

    // return a tweet <article> element containing HTML of tweet
    return $tweet;
  };

  // Test / driver code (temporary). Eventually will get this from the server.
  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
  }

  const $tweet = createTweetElement(tweetData);

  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like

  $('.tweet-feed').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc

});
