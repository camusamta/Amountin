var monthsArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var yearsArray = [2017,2018,2019];


var monthNew = 10
var yearCounter = 0;
var thisMonth = monthsArray[monthNew];
var thisYear = yearsArray[yearCounter];


//on load events - ie, the default setting of the calculator
$(document).ready(function(){

$("#spanMonth").text(thisMonth);
$("#spanYear").text(thisYear);

});

//on click events

//Month and Year Upward Incrementer

$(".date-upwards").on("click",function() {


if (monthNew < (monthsArray.length -1)) {

  monthNew++;
  months++;
  $("#spanMonth").text(monthsArray[monthNew]);
  addRock();
  finalOutput();

}

else {

  monthNew = -1;
  monthNew++;
  yearCounter++;
  months++;
  addRock();
  $("#spanMonth").text(monthsArray[monthNew]);
  $("#spanYear").text(yearsArray[yearCounter]);
  finalOutput();

  if (yearCounter === 3) {

    console.log('maxed out years for this prototype!')

  }
}

if (months > 3) {

  camera.position.z = 35;
  $( "h2" ).removeClass("hide").addClass( "show" );
  $( "h1" ).removeClass("show").addClass( "hide" );
}

});

//Month and Year Downward De-incrementer - unfinished (fix: it has to cycle back through MONTHS before years)

$(".date-downwards").on('click',function() {


if (monthNew < 0 && yearCounter >= 0) {

  yearCounter--;
  monthNew === 11;
  monthNew--;
  $("#spanMonth").text(monthsArray[monthNew]);
  $("#spanYear").text(yearsArray[yearCounter]);

}

// if (monthNew >= 0) {
// monthNew--;
// $("#spanMonth").text(monthsArray[monthNew]);
// $("#spanYear").text(yearsArray[yearCounter]);
// }
//
// ///-------------
//
// if (months <= 0) {
//
//   $("#spanMonth").text('--');
//   $("#spanYear").text('--');
//
// } else {
//
// monthNew--;
// months--;
// yearCounter--;
// finalOutput();
// $("#spanMonth").text(monthsArray[monthNew]);
// $("#spanYear").text(yearsArray[yearCounter]);
//
// }

});
