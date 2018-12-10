
var particle;

particle = (function() {
    'use strict';

    var camera, 
    	scene,
    	renderer,
    	geometry,
    	material,
        boxOne,
    	boxTwo,
        width,
        height;

    function init() {
        width = window.innerWidth;
        height = window.innerHeight;

        // New camera and position
    	camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 10 );
		camera.position.z = 1;

        // New scene
		scene = new THREE.Scene();

        // Create a box geometry & material
		geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
		material = new THREE.MeshNormalMaterial();

        // Apply the material to the box and add it to the scene
        boxOne = new THREE.Mesh( geometry, material );
		boxTwo = new THREE.Mesh( geometry, material );
        boxOne.position.set(0.4,0.4,0.4);
        scene.add( boxOne );
		scene.add( boxTwo );

        // Create a renderer and set its size
		renderer = new THREE.WebGLRenderer( { antialias: true } );
		renderer.setSize( width, height );
	
        // Add the renderer to the DOM
    	document.body.appendChild( renderer.domElement );

        // Listen to the window resize event
        window.addEventListener('resize', onWindowResize);

        // Fire animation
        animate();
    }

    function animate() {

        // Re-render everytime screen is refreshed
		requestAnimationFrame( animate );

        // Add some x and y rotation to the box
		boxOne.rotation.x += 0.01;
		boxOne.rotation.y += 0.02;
        boxTwo.rotation.x += 0.02;
        boxTwo.rotation.y += 0.01;

        // Tell the renderer to add the scene and camera
		renderer.render( scene, camera );
        updateRendererSize();
    }

    function onWindowResize(){
        width = window.innerWidth;
        height = window.innerHeight;
        updateRendererSize();
    }
    
    // Change the size of the renderer and keep aspect ratio
    function updateRendererSize(){
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    }
      
    return {
        init: init,
    };

}());


particle.init();