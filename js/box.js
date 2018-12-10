
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
        arrayOfBoxes,
        numberOfBoxes,
        width,
        height;

    function init() {
        // Vars
        width = window.innerWidth;
        height = window.innerHeight;
        arrayOfBoxes = [];
        numberOfBoxes = 10;

        setupScene();
        createBoxes();
        animate();
    }

    function createBoxes() {

        // Create a box geometry & material
        geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
        material = new THREE.MeshNormalMaterial();

        for(var i=0; i < numberOfBoxes; i++){
            arrayOfBoxes[i] = new THREE.Mesh( geometry, material );
            scene.add( arrayOfBoxes[i] );
            arrayOfBoxes[i].position.set(0.1 * i, 0, 0);
        }
    }

    function setupScene() {
        // New camera and position
        camera = new THREE.PerspectiveCamera( 70, width / height, 0.01, 100 );
        camera.position.z = 2;

        // New scene
        scene = new THREE.Scene();

        // Create a renderer and set its size
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( width, height );
    
        // Add the renderer to the DOM
        document.body.appendChild( renderer.domElement );

        // Listen to the window resize event
        window.addEventListener('resize', onWindowResize);
    }

    function animate() {
        // Re-render everytime screen is refreshed
		requestAnimationFrame( animate );

        for(var i=0; i < arrayOfBoxes.length; i++){
            arrayOfBoxes[i].rotation.y += 0.04;
            arrayOfBoxes[i].rotation.x += 0.04;
        }

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