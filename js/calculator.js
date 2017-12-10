var dateArray = ['You definitely cant go lower than that','well, when?','Dec 2017','Jan 2018','Feb 2018','Mar 2018','Apr 2018','May 2018','Jun 2018','Jul 2018','Aug 2018','Nov 2018','Dec 2018','Jan 2019','Feb 2019','Mar 2019','Apr 2019','May 2019','Maximum reached!'];
//Duplicate 'well, when's' as a 1 second solution to the problem of time moving foward while I worked on this assignment

var datePosition = 1;
var amount = 200;
var months = 0;

//variables for elements of the DOM I want to animate
var $body = $('body');

$(document).ready(function(){

$(".date-goal-incrementer").hide();
$(".controls-design").css("display", "flex").hide();
$('h1').delay(3300).fadeIn(1800);
$(".savings-goal-incrementer").delay(3300).fadeIn(1800);
$("#spanDate").text(dateArray[datePosition]);
$(".amount-output").text('$'+amount);

});


//Adding a savings amount

$(".amount-upwards").on("click",function() {

// soundUpClick.play();
amount += 200;

$(".amount-output").text('$'+amount);

if (amount == 400 ) {

  GSAPweights(0, 1, mountainMesh, 0);

}

if (amount > 400) {

  $(".date-goal-incrementer").fadeIn();
}

if (amount == 600) {

  addTreeOne();
}

if (amount == 1600) {


  addTreeTwo();
}

if (amount == 2400) {

  addDeckChair()
}

if (amount == 4000) {

  addJetty();
}

if (amount === 6000) {


  addBoat();
}


if ($(".date-upwards").data('clicked')) {

  if (datePosition <= 1 || months <= 0) {

    $("#finalOutput").text('select a timeframe');

  } else {

   displayOutput();

  }



}


});

//Reducing the savings amount

$(".amount-downwards").on("click",function() {

// soundDownClick.play();

amount -= 200;
$(".amount-output").text('$'+amount);

if (amount <= 0) {

$(".amount-output").text('--');
amount = 0;

}

if (datePosition <= 1 || months <= 0) {

  $("#finalOutput").text('select a timeframe');

}

if (amount < 400 && amount >= 200) {

  GSAPweights(1, 0, mountainMesh, 0);
}

if (amount < 600) {

  scene.remove(treeModelOne);
}

if (amount < 1600) {

  scene.remove(treeModelTwo);
}

if (amount < 2400) {

  scene.remove(deckChair);
}

if (amount < 4000) {

  scene.remove(jetty);
}

if (amount < 6000) {

  scene.remove(boat);
}

if ($(".date-upwards").data('clicked') && amount > 0) {

   displayOutput();

}
});

//Global camera z-position variable for animating camera movement
var cameraZ = 15;


//Adding a timeframe

$(".date-upwards").on("click",function() {

months++;
datePosition++;
// largeSoundUpClick.play();
$("#spanDate").text(dateArray[datePosition]);


if (months <= 16) {
displayOutput();
addRock()
} else if (months > 16){

months = 17;
datePosition = 18;

  $("#finalOutput").text('Prototype limit reached!');
}

if (months > 3 && months < 8) {
  cameraZ += 5;
  TweenLite.to(camera.position, 1.6, { z:cameraZ, Circ: Power1.easeInOut});


}

if (months === 6) {

  TweenMax.to(".daylight", 1, {css:{className:"daylightDarker"}});
}

//  TweenLite.to(camera.position, 5, { z:35 });

if (months === 12) {

TweenLite.to(camera.position, 2, { z: 40 });
cameraZ = 40;
TweenMax.to(".daylightDarker", 4, {css:{className:"spacelight"}});

}

if (months > 12 && months < 14) {
  cameraZ += 5;
  TweenLite.to(camera.position, 1.6, { z:cameraZ, Circ: Power1.easeInOut});

}

});

//Removing a timeframe

$(".date-downwards").on("click",function(){

  months--;
  datePosition--;
  $("#spanDate").text(dateArray[datePosition])
  subtractRock();
  displayOutput();

  if (months <= 0) {

    months = 0;
    datePosition = 1;
    $("#finalOutput").text('select a timeframe');

  }
  if (months < 4) {

  TweenMax.to(".spacelight", 0.5, {css:{className:"daylight"}});
  TweenLite.to(camera.position, 1, { z: 15 });
  cameraZ = 15;


}

if (months === 5) {

  TweenMax.to(".daylightDarker", 1, {css:{className:"daylight"}});
}

if (months > 3 && months < 7) {
  cameraZ -= 5;
  TweenLite.to(camera.position, 1.6, { z:cameraZ, Circ: Power1.easeInOut});


}

if (months === 11) {

TweenLite.to(camera.position, 2, { z: 35 });
cameraZ = 35;
TweenMax.to(".spacelight", 0.5, {css:{className:"daylightDarker"}});

}

});

//detecting whether or not 'months incrementer' has been clicked already, so it can now update live, instead of showing '0 payments of infinity'
$(".date-upwards").on('click', function() {
     $(this).data('clicked', true);
     $(".controls-design").fadeIn();
});

//the function that writes the sum of the calculator to the screen

function finalOutput(){

 if (months === 1 ) {
  $("#finalOutput").html('Put away a <span style="color:#476300"> &nbsp single payment of $'+Math.floor(amount/months)+'</span>');


} else {
  $("#finalOutput").html('Put away&nbsp <span style="color:#476300">$'+Math.floor(amount/months)+'&nbsp each month!</span>' );


}

}

function finalOutputForts() {


  if (months === 1 ) {
   $("#finalOutput").html('Put away &nbsp<span style="color:#476300">$'+Math.floor((amount/months)/2)+ ' fortnightly</span>&nbsp for '+months+' month');


 } else {

  $("#finalOutput").html('Put away &nbsp <span style="color:#476300">$'+Math.floor((amount/months)/2)+ '&nbsp each fortnight!</span>');
}
}

function finalOutputWeeks() {

if (months === 1 ) {
 $("#finalOutput").html('Put away &nbsp<span style="color:#476300">$'+Math.floor((amount/months)/4)+ ' weekly</span>&nbsp for '+months+' month');


} else {

$("#finalOutput").html('Put away &nbsp<span style="color:#476300">$'+Math.floor((amount/months)/4)+ '&nbsp each week!</span>');
}

}

//This toggles between payment frequency


$("#months").on('click', function() {

  if ($("#fortnights").hasClass("selected")) {

    $("#fortnights").toggleClass("selected");
  }

  if ($("#weeks").hasClass("selected")) {

    $("#weeks").toggleClass("selected");
  }

  if (months <= 16){
    $("#months").toggleClass("selected");
    finalOutput();
  } else {
    $("#months").toggleClass("selected");
    $("#finalOutput").text('Prototype limit reached!');

  }
// }

});

$("#fortnights").on('click', function() {


  if ($("#months").hasClass("selected")) {

    $("#months").toggleClass("selected");
  }

  if ($("#weeks").hasClass("selected")) {

    $("#weeks").toggleClass("selected");
  }

if (months <= 16){
  $("#fortnights").toggleClass("selected");
  finalOutputForts();
} else {
  $("#fortnights").toggleClass("selected");
  $("#finalOutput").text('Prototype limit reached!');

}

});

$("#weeks").on('click', function() {

  if ($("#months").hasClass("selected")) {

    $("#months").toggleClass("selected");
  }

  if ($("#fortnights").hasClass("selected")) {

    $("#fortnights").toggleClass("selected");
  }

  if (months <= 16){
    $("#weeks").toggleClass("selected");
    finalOutputWeeks();
  } else {
    $("#weeks").toggleClass("selected");
    $("#finalOutput").text('Prototype limit reached!');

  }



});

//finalOutput Final function

function displayOutput(){

  if ($("#fortnights").hasClass("selected")) {

    finalOutputForts();
  } else if ($("#weeks").hasClass("selected")) {

    finalOutputWeeks()

  } else {

    finalOutput();
  }
}
