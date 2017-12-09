var dateArray = ['You definitely cant go lower than that','well, when?','Dec 2017','Jan 2018','Feb 2018','Mar 2018','Apr 2018','May 2018','Jun 2018','Jul 2018','Aug 2018','Nov 2018','Dec 2018','Jan 2019','Feb 2019','Mar 2019','Apr 2019','May 2019','Jun 2019','Jul 2019','Aug 2019','Sep 2019','Oct 2019','Nov 2019','Dec 2019','Youve reached the max for this prototype!'];
//Duplicate 'well, when's' as a 1 second solution to the problem of time moving foward while I worked on this assignment

var datePosition = 1;
var amount = 200;
var months = 0;

//variables for elements of the DOM I want to animate
var $body = $('body');

$(document).ready(function(){

$(".date-goal-incrementer").hide();
$('h1').delay(3300).fadeIn(1800);
$(".savings-goal-incrementer").delay(3300).fadeIn(1800);
$("#spanDate").text(dateArray[datePosition]);
$(".amount-output").text('$'+amount);

});


//Adding a savings amount

$(".amount-upwards").on("click",function() {

soundUpClick.play();
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

  addWaterfall();
}


if ($(".date-upwards").data('clicked')) {

  if (datePosition <= 1 || months <= 0) {

    $("#finalOutput").text('select a timeframe');
    console.log('Im firing!')
  } else {

   displayOutput();

  }



}


});

//Reducing the savings amount

$(".amount-downwards").on("click",function() {

soundDownClick.play();

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

  scene.remove(waterfall);
}

if ($(".date-upwards").data('clicked') && amount > 0) {

   displayOutput();

}
});

var cameraZ = 15;
//Adding a timeframe

$(".date-upwards").on("click",function() {

months++;
console.log(months);
datePosition++;
$("#spanDate").text(dateArray[datePosition])
addRock()
displayOutput();

if (months > 3 && months < 8) {
  cameraZ += 5;
  TweenLite.to(camera.position, 1.8, { z:cameraZ, Circ: Power1.easeInOut});
  // camera.position.z = 35;
  TweenMax.to(".daylight", 1, {css:{className:"spacelight"}});

}

//  TweenLite.to(camera.position, 5, { z:35 });

if (months > 11) {

TweenLite.to(camera.position, 2, { z: 40 });
// TweenLite.to(camera.position, 2, { y: 4});
// TweenLite.to(camera.rotation, 2, { x: -0.3});
//different approach
// TweenLite.to(scene.rotation, 2, { x: 0.15});

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

});

//detecting whether or not 'months incrementer' has been clicked already, so it can now update live, instead of showing '0 payments of infinity'
$(".date-upwards").on('click', function() {
     $(this).data('clicked', true);
     $(".controls-design").fadeIn();
     console.log('a true thing has happened!');
});

//the function that writes the sum of the calculator to the screen

function finalOutput(){

 if (months === 1 ) {
  $("#finalOutput").html('Put away a <span style="color:#476300"> &nbsp single payment &nbsp </span> of $'+Math.floor(amount/months));


} else {
  $("#finalOutput").html('Put away $'+Math.floor(amount/months)+'<span style="color:#476300"> &nbsp each month &nbsp </span> for '+months+' months' );


}

}

function finalOutputForts() {


  if (months === 1 ) {
   $("#finalOutput").text('Put away $'+Math.floor((amount/months)/2)+ ' fortnightly for '+months+' month');


 } else {

  $("#finalOutput").text('Put away $'+Math.floor((amount/months)/2)+ ' fortnightly for '+months+' months');
}
}

function finalOutputWeeks() {

if (months === 1 ) {
 $("#finalOutput").text('Put away $'+Math.floor((amount/months)/4)+ ' weekly for '+months+' month');


} else {

$("#finalOutput").text('Put away $'+Math.floor((amount/months)/4)+ ' weekly for '+months+' months');
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
  console.log('I am being clicked!')
  $("#months").toggleClass("selected");
  finalOutput();
// }

});

$("#fortnights").on('click', function() {

  if ($("#months").hasClass("selected")) {

    $("#months").toggleClass("selected");
  }

  if ($("#weeks").hasClass("selected")) {

    $("#weeks").toggleClass("selected");
  }

  console.log('I am being clicked!')
  $("#fortnights").toggleClass("selected");
  finalOutputForts();


});

$("#weeks").on('click', function() {

  if ($("#months").hasClass("selected")) {

    $("#months").toggleClass("selected");
  }

  if ($("#fortnights").hasClass("selected")) {

    $("#fortnights").toggleClass("selected");
  }
  console.log('I am being clicked!')
  $("#weeks").toggleClass("selected");
  finalOutputWeeks();


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
