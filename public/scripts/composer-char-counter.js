// Solely responsible for the character counter

const maxCharCount = 140;

// $(document).ready runs a callback when the DOM is ready to be manipulated with jQuery
$(document).ready(function() {

  $("#tweet-text").on("input", function(event) {
    
    const inputLength = $(this).val().length;
    const charCount = maxCharCount - inputLength;
    $(".counter").val(charCount);

    const colour = charCount < 0 ? "red" : "inherit";
    
    $(".counter").css("color", colour)
  
  });

});