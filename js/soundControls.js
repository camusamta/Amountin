$(document).ready(function(){

$(".fa-volume-off").hide();

});

$(".soundControls").on('click',function(){

$(".fa-volume-off").toggle();
$(".fa-volume-up").toggle();


});

$(".fa-volume-up").on('click',function(){

sound.pause();

});

$(".fa-volume-off").on('click',function(){

sound.play();

});
