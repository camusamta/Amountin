var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( /*fov*/75,/*aspect ratio*/window.innerWidth / window.innerHeight, /*near(min)*/0.1, /*far*/1000 );

var renderer = new THREE.WebGLRenderer(

  {alpha:true, antialias: true}

);

//audio
var listener = new THREE.AudioListener();
camera.add( listener );
var sound = new THREE.PositionalAudio( listener );
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'sound/seagulls.ogg', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setRefDistance( 20 );
  sound.setLoop( true );
	// sound.play();
});


var soundUpClick = new THREE.PositionalAudio( listener );
audioLoader.load ('sound/increment.ogg', function( buffer) {
// soundUpClick.setVolume(2);
soundUpClick.setBuffer( buffer );

});

var soundDownClick = new THREE.PositionalAudio( listener );
audioLoader.load( 'sound/water-click.ogg', function( buffer ) {
	soundDownClick.setBuffer( buffer );
	//soundDownClick.setRefDistance( 20 );

});


//this sets the size of the render window - in mine, I've got it to match 'body', effectively.
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//this should allow the window to be somewhat responsive:

window.addEventListener('resize', function(){

var width = window.innerWidth;
var height = window.innerHeight;
renderer.setSize (width, height);
camera.aspect = width/height;
camera.updateProjectionMatrix();

});



//adding shadows

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


//moves the camera away from the central position
camera.position.z = 15;
console.log(camera);



var controls;
controls = new THREE.OrbitControls(camera, renderer.domElement);

controls.enableZoom = false;
controls.maxPolarAngle = Math.PI/2;
controls.minPolarAngle = Math.PI/2;;
controls.minAzimuthAngle = -0.349066; // radians
controls.maxAzimuthAngle = 0.349066; // radians

//Goal Mountain Loader
var loader = new THREE.JSONLoader();
var Amountmesh;
var mountainMesh;
loader.load("3D_json/mountain-standalone.json", addModel);

//callback function - goal mountain

function addModel(geometry, materials) {
//var material = new THREE.MeshBasicMaterial(materials);
//materials[0].morphTargets = true;
Amountmesh = new THREE.Mesh( geometry, materials);
//for heightmapped model
Amountmesh.scale.set (7,7,7);
//Amountmesh.morphTargetInfluences[0] = 0;
Amountmesh.position.y = -4;
Amountmesh.rotation.x = 0.3;
Amountmesh.rotation.y = 0.12;
Amountmesh.name = "amountmesh";
// Amountmesh.castShadow = true;
Amountmesh.receiveShadow = true;
scene.add(Amountmesh);
Amountmesh.add(sound);
}

loader.load("3D_json/newMorphTain.json", addMountain);

function addMountain(geometry, materials) {

mountainMesh = new THREE.Mesh (geometry, materials);
materials[0].morphTargets = true;
//mountainMesh.morphTargetInfluences[0] = 1;

mountainMesh.scale.set (2,2,2);
mountainMesh.position.y = 2;
mountainMesh.position.z = 2.2;
mountainMesh.rotation.x = 4.98692;
mountainMesh.rotation.z = 4.7;
mountainMesh.castShadow = true;
mountainMesh.receiveShadow = true;
scene.add(mountainMesh);
}


function GSAPweights(startvalue, endvalue, object, blendweightnum) {
  var tl = new TimelineLite();
  var blankobj = {
    weight: startvalue
  }
  tl.to(blankobj, 0.8, {
    weight: endvalue,
    onUpdate: updateHandler
  });
  function updateHandler() {
     object.morphTargetInfluences[blendweightnum] = blankobj.weight;
  }
}

//
// function cameraMove() {
//
//   var tl = new TimelineLite();
//
//   tl.to(camera.position, 1, {
//     z: months + 10
//   });
//
// };


//for Maya model through above loader
//Amountmesh.scale.set (15,15,15);
//Amountmesh.rotation.x = 0.1;
//Amountmesh.rotation.y = 4.7123889804;

//------Liams class experiments
//callback function - goal mountain
//unction addModel(geometry, materials) {
// var material = new THREE.MeshLambertMaterial(materials);
// Amountmesh = new THREE.Mesh( geometry, materials);
// Amountmesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial({
//   morphTargets: true  //This is a important requirement for morphtargets
// }));
// Amountmesh.morphTargetInfluences[0] = 0;
// // console.log(Amountmesh.morphTargetInfluences[0]);
// // Amountmesh.morphTargetInfluences[0] = 0;
// // Amountmesh.scale.set (15,15,15);
// Amountmesh.rotation.x = 0.1;
// Amountmesh.rotation.y = 4.7123889804;
// Amountmesh.name = "amountmesh";
// scene.add(Amountmesh);
// console.log("Test amount mesh");
// console.log(Amountmesh);
// }
//
// function shapeMorph(){
//   if (amount == 600) {
//
//     var tl = new TimelineLite();
//     // var obj = morphTargetInfluences[0];
//
//     // tl.to(Amountmesh, 1, {
//     //   "morphTargetInfluences[0]": "1"
//     // });
//     var test = {amount:0};
//     tl.to(test, 1, {
//       amount: 1
//     });
//     console.log(test.amount + "testamount");
//     Amountmesh.morphTargetInfluences[0] = test.amount;
//     console.log(Amountmesh.morphTargetInfluences[0] + "meshamount");

    // Amountmesh.morphTargetInfluences[0] = 1;
//   }
// }

// THIS WORKS AND IS A BACKUP
// function shapeMorph(){
//   if (amount == 600) {
//     Amountmesh.morphTargetInfluences[0] = 1;
//   }
// }





//function that runs the Bird Loader, which, when run, loads the bird

var BirdModel;
function addBird() {

//Bird Loader
var loader = new THREE.JSONLoader();

loader.load("3D_json/bird.json", callBird);

}


//callback function - bird
function callBird(geometry, materials) {
var material = new THREE.MeshBasicMaterial(materials);
BirdModel = new THREE.Mesh( geometry, materials);
BirdModel.scale.set (3,3,3);
BirdModel.position.x = 1;
BirdModel.position.y = 3;
BirdModel.position.z = 4;
// BirdModel.castShadow = true;
// BirdModel.receiveShadow = true;
scene.add(BirdModel);
var tl = new TimelineMax({repeat: -1, yoyo: true});
tl.to(BirdModel.position, 13, {x: -2, ease: Power1.easeInOut});
tl.to(BirdModel.rotation, 3, {x: 0.9},'-=7');
tl.to(BirdModel.position, 10, {x: 2, ease: Power1.easeInOut});
tl.to(BirdModel.rotation, 3, {x: 0},'-=8');
tl.to(BirdModel.position, 10, {y: 2},'-=13');

}

addBird();

//function that adds jetty
var jetty;

function addJetty() {
var loader = new THREE.JSONLoader();
loader.load("3D_json/jetty.json", callJetty);

}

//callback function - jetty

function callJetty(geometry, materials) {
var material = new THREE.MeshBasicMaterial(materials);
jetty = new THREE.Mesh( geometry, materials);
jetty.scale.set(0.01,0.01,0.01);
jetty.position.y = -0.9;
jetty.position.z = 6;
jetty.position.x = 3;
jetty.rotation.y = -0.89;
jetty.rotation.x = 0.4
jetty.castShadow = true;
// jetty.receiveShadow = true;
TweenLite.to(jetty.scale, 0.6, {x:0.3, y:0.3, z:0.3, ease: Back.easeOut.config(1.7)})
scene.add(jetty);

}

//function that adds boat
var boat;

function addBoat() {
var loader = new THREE.JSONLoader();
loader.load("3D_json/boat.json", callBoat);

}

//callback function - boat

function callBoat(geometry, materials) {
var material = new THREE.MeshBasicMaterial(materials);
boat = new THREE.Mesh( geometry, materials);
boat.scale.set(0.01,0.01,0.01);
boat.position.y = -1.30;
boat.position.z = 7;
boat.position.x = 2;
boat.rotation.y = 0.29;
boat.rotation.x = 0.34;
// boat.castShadow = true;
boat.receiveShadow = true;
TweenLite.to(boat.scale, 0.6, {x:0.2, y:0.2, z:0.2, ease: Back.easeOut.config(1.7)})
scene.add(boat);
var tl = new TimelineMax({repeat: -1, yoyo: true});
tl.to(boat.rotation, 5, {x: 0.25, ease: Power1.easeInOut});


}





//function that adds treeOne

function addTreeOne() {

var loader = new THREE.JSONLoader();
var treeModelOne;
loader.load("3D_json/treeOne.json", callTree);

}

//callback function - treeOne

function callTree(geometry, materials) {
var material = new THREE.MeshBasicMaterial(materials);
treeModelOne = new THREE.Mesh( geometry, materials);
treeModelOne.scale.set(0.1,0.1,0.1);
treeModelOne.position.x = -2;
//treeModelOne.position.y = 4;
//treeModelOne.rotation.x = 0.1;
treeModelOne.rotation.y = 4.7123889804;
// treeModelOne.receiveShadow = true;
// treeModelOne.castShadow = true;
//TweenLite.to(treeModelOne.scale, 0.6, { x: 1, y: 1, z: 1 });
TweenLite.to(treeModelOne.scale, 0.6, {x:1, y:1, z:1, ease: Back.easeOut.config(1.7)})
scene.add(treeModelOne);

}

//function that adds treeTwo

function addTreeTwo() {

var loader = new THREE.JSONLoader();
var treeModelTne;
loader.load("3D_json/treeTwo.json", callTreeTwo);

}

//callback function - treeTwo

function callTreeTwo (geometry, materials) {
var material = new THREE.MeshBasicMaterial(materials);
treeModelTwo = new THREE.Mesh( geometry, materials);
treeModelTwo.scale.set(0.1,0.1,0.1);
treeModelTwo.position.x = 1.8;
treeModelTwo.position.z = 3;
treeModelTwo.position.y = -0.8;
treeModelTwo.rotation.x = 0.4;
treeModelTwo.receiveShadow = true;
//TweenLite.to(treeModelTwo.scale, 0.3, { x: 1, y: 1, z: 1 });
TweenLite.to(treeModelTwo.scale, 0.5, {x:1, y:1, z:1, ease: Back.easeOut.config(1.7)})
scene.add(treeModelTwo);

}


//Beachball loader - needs to be wrapped in a function to be called by an event
var beachBall;
loader.load("3D_json/beachBall.json", callBeachBall);



//callback function - beachball
function callBeachBall(geometry, materials) {
beachBall = new THREE.Mesh( geometry, materials);
beachBall.scale.set (0.15,0.15,0.15);

beachBall.position.x = -4;
beachBall.position.z = 6;
beachBall.position.y = -1.2;
beachBall.rotation.z = 1;
beachBall.castShadow = true;
beachBall.receiveShadow = true;
// scene.add(beachBall);

// scene.add(beachBall);
var tl = new TimelineMax({repeat: -1, yoyo: true});
tl.to(beachBall.position, 3, {y: -1.1, ease: Power1.easeInOut});

}

//buoy

var buoy;
loader.load("3D_json/buoy.json", callBuoy);



//callback function - beachball
function callBuoy(geometry, materials) {
buoy = new THREE.Mesh( geometry, materials);
buoy.scale.set (0.45,0.45,0.45);

buoy.position.x = -4;
buoy.position.z = 6;
buoy.position.y = -1.45;
buoy.rotation.z = 0.1;
buoy.rotation.x = 0.349066;
buoy.castShadow = true;
buoy.receiveShadow = true;
scene.add(buoy);

var tl = new TimelineMax({repeat: -1, yoyo: true});
tl.to(buoy.position, 3, {y: -1.4, ease: Power1.easeInOut});
tl.to(buoy.rotation, 6, {z: -0.2, ease: Power1.easeInOut})

}

//Deckchair loader - needs to be wrapped in a function to be called by an event

function addDeckChair() {
var deckChair;
loader.load("3D_json/chair.json", callDeckChair);

}

//callback function - deckchair
function callDeckChair(geometry, materials) {
deckChair = new THREE.Mesh( geometry, materials);
deckChair.scale.set (0.01,0.01,0.01);

// deckChair.position.x = -3;
deckChair.position.z = 4.9;
deckChair.position.x = -1;
deckChair.position.y = -0.7;
deckChair.rotation.y = -0.90;
deckChair.rotation.x = 0.3;
deckChair.castShadow = true;
deckChair.receiveShadow = true;
TweenLite.to(deckChair.scale, 0.55, {x:0.17, y:0.17, z:0.17, ease: Back.easeOut.config(2.7)})
//previously scale sie was 0.2
//mountainMesh.rotation.z = 4.7;
// deckChair.rotation.z = 0.8;

scene.add(deckChair);

}



//modelRock loader
var sceneRock;
loader.load("3D_json/modelRocks.json", callSceneRock);


//callback function - sceneRock
function callSceneRock(geometry, materials) {
sceneRock = new THREE.Mesh( geometry, materials);
sceneRock.scale.set (0.2,0.2,0.2);

sceneRock.position.x = -2;
sceneRock.position.z = 3;
sceneRock.position.y = 0;
sceneRock.rotation.x = 0.3;
sceneRock.castShadow = true;
sceneRock.receiveShadow = true;
scene.add(sceneRock);

}

//modelRock loader 2
var sceneRock2;
loader.load("3D_json/modelRocks.json", callSceneRock2);


//callback function - sceneRock
function callSceneRock2(geometry, materials) {
sceneRock2 = new THREE.Mesh( geometry, materials);
sceneRock2.scale.set (0.1,0.1,0.1);

sceneRock2.position.x = 1.2;
sceneRock2.position.z = 4;
sceneRock2.position.y = -0.31;
sceneRock2.rotation.x = 0.3;
sceneRock2.castShadow = true;
sceneRock2.receiveShadow = true;
scene.add(sceneRock2);
console.log('Rock two is loaded!')

}

//waterfallLoader

function addWaterfall(){
var waterfall;
loader.load("3D_json/waterfall.json", callWaterfall);
}

//callback function - waterfall
function callWaterfall(geometry, materials) {
waterfall = new THREE.Mesh( geometry, materials);
waterfall.scale.set(3,4,3);
waterfall.position.z = 4.2;
waterfall.position.x = -2;
waterfall.position.y = -3.3;
waterfall.rotation.y = 1.7;
waterfall.rotation.z = 0.3;
waterfall.castShadow = true;
waterfall.receiveShadow = true;
// TweenLite.to(waterfall.scale, 2, { x:3, ease: Power1.easeInOut});
//morphtargets this one
scene.add(waterfall);


}



//creates a light, then adds that light to the scene
var light = new THREE.DirectionalLight(0xFFFFFF, 1.2);
scene.add(light);
light.position.z = 2;
light.position.x = 2;
light.position.y = 5;
light.castShadow = true;
light.shadowDarkness = 0.2;

var suffuse = new THREE.AmbientLight(0xFFF5E0, 0.3);
//back to 0.3 strength for default scene position
//upwards to 0.6 for alt position
scene.add(suffuse);

var underlight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
underlight.position.x = 1;
underlight.position.y = -10.5;
underlight.position.z = 5;
underlight.castShadow = true;
underlight.shadowDarkness = 0.2;
scene.add(underlight);




// //global year variable
//
// var year = 2017;



//--------Remaining Calculator--------






//jQuery for incrementing months upwards on click of .up class

$(".dash-upwards").on("click",function(){

//cameraMove();
if (months < 20) {
months++
//$("#monthOutput").text(calendarMonths[months]);
addRock();
finalOutput();} else {

  console.log('Youve hit the max!');
}


});

//jQuery for de-incrementing months on click of .down class
$("#months-down").on("click",function(){

months--;
$("#monthOutput").text(calendarMonths[months]);
console.log('down'+months);
subtractRock();

});

//the 'add rock' function that runs at the end of the above incrementer jquery code
function addRock(){

var loader = new THREE.JSONLoader();
loader.load("3D_json/newRock.json",
prepareRockModel);


}

function prepareRockModel(geometry,material){

var rock = new THREE.Mesh(geometry,material);

var currentMonth = 'rock'+months;
rock.position.x = rockPositions[currentMonth][0];
rock.position.y = rockPositions[currentMonth][1];
rock.position.z = rockPositions[currentMonth][2];
rock.rotation.x = 0.3;
rock.rotation.y = 0.12;
rock.scale.set(0.1,0.1,0.1);

console.log('I am that complex thing:')
console.log(rockPositions[currentMonth][1]);

rock.name = 'rock'+months;

//For working rocks
// rock.scale.set (65,65,65);
// rock.rotation.x = 0.1;
// rock.rotation.y = 4.7123889804;
//TweenLite.to(rock.scale, 0.2, { x: 1, y: 1, z: 1 });
TweenLite.to(rock.scale, 2, { x: 1, y: 1, z: 1, ease: Elastic.easeOut.config(1, 0.3)});

//rock bob function
var tl = new TimelineMax({repeat: -1, yoyo: true});
tl.to(rock.position, 3, {y:rockPositions[currentMonth][1]+0.5, ease: Power1.easeInOut});


// var tl1 = new TimelineMax({onComplete: timeline2()});
// tl1.to(rock.scale, 2, { x: 1, y: 1, z: 1, ease: Elastic.easeOut.config(1, 0.3)});
//
// //rock bob function
// function timeline2() {
//   var tl2 = new TimelineMax({repeat: -1, yoyo: true, onComplete: callbackfunction()});
//   tl2.to(rock.position, 2, {y: 0.7, ease: Power1.easeInOut});
// }

//TweenLite.to(rock.scale, 0.2, {x:1, y:1, z:1, ease: Back.easeOut.config(1.7)});
scene.add(rock);

}


//the 'subtract rock' function that runs at the end of the above incrementer jquery code
function subtractRock(){

  var objname = 'rock'+(months+1);
  var selectedobject = scene.getObjectByName(objname);
  scene.remove(selectedobject);

}

//rockPositions object - could do rotations the same way!

var rockPositions = {

//rock0:[0,0,0],
rock1:[5,0,5],
rock2:[6.5,-2,7],
rock3:[2,-2,10],
rock4:[-2,-2,15],
rock5:[-6,-2,16],
rock6:[-10,-2,17],
rock7:[-14,-2,18],
rock8:[-15,-2,22],
rock9:[-11,-3,25],
rock10:[-3,-2,30],
rock11:[2,-2,31],
rock12:[6,-2,32],
rock13:[8,-2,35],
rock14:[5,-2,37],
rock15:[1,-2,40],
rock16:[-2,-2,41],
rock17:[-5,-2,43],
};
var string = 'rock1';

console.log(rockPositions.rock1[1]);
//no need to convert to string

console.log(rockPositions[string][1]);
//converted to string



//whole world moves, man
var tlm = new TimelineMax({repeat: -1, yoyo: true});
tlm.to(scene.position, 4, {y: 0.2, ease: Power1.easeInOut});






function animateObjects() {
setTimeout(function(){
  // var selectedobject = scene.getObjectByName("amountmesh");
  // selectedobject.rotation.y += 0.01;
  // Amountmesh.rotation.y += 0.0005;
  //BirdModel.rotation.y += 0.001;
  // mountainMesh.rotation.z += 0.0005;
  //scene.rotation.y += 0.0005;
  // beachBall.rotation.x += 0.005;
  //beachBall.rotation.x += 0.01;
  // console.log(selectedobject);

}, 3000)

}

var increment = 0.1;


//game loop
function loop() {

 // controls.update();


 animateObjects();
 requestAnimationFrame(loop);
 renderer.render( scene, camera );

//  if (BirdModel.position.x <= 0) {
//    increment =  0.1;
// }
//
// if (BirdModel.position.x >= 10) {
//   increment =  -0.1;
// }
//
// BirdModel.position.x += increment;

 //BirdModel.position.y += 0.01;
if (camera.position.x !== 0) {

$(".loading-invisible-noflash").fadeIn(300);

} else if(camera.position.x === 0) {

$(".loading-invisible-noflash").fadeOut(200);

}



};
// });
// }
 //
 // //}
 setTimeout(function(){
   loop();
 }, 100);


// setTimeout(function() {
//
//   console.log(Amountmesh);
//
// },1500);
