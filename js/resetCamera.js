
$(".resetCamera").on('click',function(){


var currentpos = camera.position;
//was dreading re-approaching this, but then remembered that I'd created a variable that increments
// and de-increments the camera's z-position so I can animate adding and removing islands! Bam!
controls.position0.z = cameraZ;
controls.reset();
controls.object.quaternion.set( 0, 0, 0, 1 );
controls.object.rotation.set(0, 0, 0);
camera.updateProjectionMatrix();
controls.update();

});
