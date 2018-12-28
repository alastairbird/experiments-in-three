
var something;

something = (function() {
    'use strict';

    var camera, 
        scene,
        renderer,
        width,
        time,
        material,
        geometry,
        line,
        cameraControls,
        height;

    function init() {
        // Vars
        width = window.innerWidth;
        height = window.innerHeight;
        time = 0;
        material = new THREE.LineBasicMaterial( { color: 0x0000ff } );




        createMySomething();
        setupScene();
        animate();
    }

    
    function createMySomething() {
    
        geometry = new THREE.Geometry();
        
        // Pyramid
        geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
        geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
        geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );
        geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );    
        geometry.vertices.push(new THREE.Vector3( 0, 0, 10) );    
        geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );    
        geometry.vertices.push(new THREE.Vector3( 0, 0, -10) );    
        geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );    

        geometry.vertices.push(new THREE.Vector3( 0, 0, 10) );    
        geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );    
        geometry.vertices.push(new THREE.Vector3( 0, 0, -10) );    
        geometry.vertices.push(new THREE.Vector3( 0, 0, 10) );    


        line = new THREE.Line( geometry, material );

    }
    

    function setupScene() {
        // New camera and position
        camera = new THREE.PerspectiveCamera( 90, width / height, 0.01, 100 );
        camera.position.z = 10;
        camera.position.x = 12;
        camera.position.y = 12;
        cameraControls = new THREE.OrbitControls( camera );

        // New scene
        scene = new THREE.Scene();

        scene.add ( line );

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