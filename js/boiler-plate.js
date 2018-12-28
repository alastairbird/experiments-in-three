
var something;

something = (function() {
    'use strict';

    var camera, 
        scene,
        renderer,
        width,
        time,
        cameraControls,
        height;

    function init() {
        // Vars
        width = window.innerWidth;
        height = window.innerHeight;
        time = 0;

        // createMySomething();
        setupScene();
        animate();
    }

    /*
    function createMySomething() {
    
    }
    */

    function setupScene() {
        // New camera and position
        camera = new THREE.PerspectiveCamera( 90, width / height, 0.01, 100 );
        camera.position.z = 5;
        camera.position.x = 0;
        camera.position.y = 0;
        cameraControls = new THREE.OrbitControls( camera );

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

        // Increase time
        time += 0.01;

        // --------------------------- START STUFF
        // === Whatever code you are running
        // --------------------------- END STUFF


        // Tell the renderer to add the scene and camera
        cameraControls.update();
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


something.init();