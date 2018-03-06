(function(bounceit){

  bounceit.fn.bounce = function(settings) {
      if(typeof settings.interval == 'undefined'){
          settings.interval = 100;
      }

      if(typeof settings.distance == 'undefined'){
          settings.distance = 10;
      }

      if(typeof settings.times == 'undefined'){
          settings.times = 4;
      }

      if(typeof settings.complete == 'undefined'){
          settings.complete = function(){};
      }

      $(this).css('position','relative');

      for(var iter=0; iter<(settings.times+1); iter++){
          $(this).animate({ top:((iter%2 == 0 ? settings.distance : settings.distance * -1)) }, settings.interval);
      }

      $(this).animate({ top: 0}, settings.interval, settings.complete);  
  };
})(jQuery);


$(document).ready(function () {
    var winsCounter = 0;
    var losesCounter = 0;
    var totalScore = 0;
    var random;
    var numberOptions;
    var audio = new Audio("www.pacdv.com/sounds/mechanical_sound_effects/cling_1.wav");
    

    $('.crystal-image').click(function(e){
      audio.play();
      $(this).bounce({
          interval: 100,
          distance: 20,
          times: 5
      });
  });




    function setgame() {
      // Generate a new random number between 19 and 120.
      random = Math.floor(Math.random() * 120-19+1) +19;
      // Once we have our  number, we'll prepend it to the top of our random-number div.
      $("#number-to-guess").html(random);
      totalScore= 0;
        $("#AddScore").html(totalScore);

    }
    setgame();
    // Now for the hard part. Creating multiple crystals each with their own unique number value.
    // We begin by expanding our array to include four options.
    var imageCrystal = $("img");
    console.log(imageCrystal);
    
    function sevalues() {
    imageCrystal.each(function (index, item) {
      // for (var i = 0; i < imageCrystal.length; i++) {
        
      numberOptions = Math.floor(Math.random() * 12) + 1;
    
      var num = numberOptions
      $(item).attr("data-crystalvalue", numberOptions);
      console.log(numberOptions);
      // }

    });
    };
    
    // This time, our click event applies to every single crystal on the page. Not just one.
    sevalues()
    $(".crystal-image").on("click", function () {
      
    

      // Determining the crystal's value requires us to extract the value from the data attribute.
      // Using the $(this) keyword specifies that we should be extracting the crystal value of the clicked crystal.
      // Using the .attr("data-crystalvalue") allows us to grab the value out of the "data-crystalvalue" attribute.
      // Since attributes on HTML elements are strings, we must convert it to an integer before adding to the counter

      var crystalValue = ($(this).attr("data-crystalvalue"));
      crystalValue = parseInt(crystalValue);
      // We then add the crystalValue to the user's "counter" which is a global variable.
      // Every click, from every crystal adds to the global counter.
      totalScore += crystalValue;

      // All of the same game win-lose logic applies. So the rest remains unchanged.

      $("#AddScore").html(totalScore);

      if (totalScore === random) {
        winsCounter++
        $("#winScore").html(winsCounter);
        setgame();
        sevalues()

        
      }

      else if (totalScore >= random) {
        losesCounter++
        $("#loseScore").html(losesCounter);
        setgame();
        sevalues()

      }

    });
  });
