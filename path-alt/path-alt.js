
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
        time,
        circleRadius,
        cameraControls,
        cameraDistance,
        randomDimensionX,
        randomDimensionY,
        randomDimensionZ,
        randomDimensionsEnabled,
        height;

    function init() {
        // Vars
        width = window.innerWidth;
        height = window.innerHeight;
        arrayOfBoxes = [];
        numberOfBoxes = 900;
        time = 0;
        circleRadius = 4;
        cameraDistance = 130;
        randomDimensionsEnabled = true;

        setupScene();
        createBoxes();
        animate();
    }

    function createBoxes() {

        // Create a box geometry & material
        material = new THREE.MeshNormalMaterial();
        var randomDimensionX;

        for(var i=0; i < numberOfBoxes; i++){
            // geometry = new THREE.BoxGeometry( Math.random(0,0), Math.random(0,2000), Math.random(0,2));
            
            if (randomDimensionsEnabled) {
                randomDimensionX = (Math.floor(Math.random() * 2) + 0.2);
                randomDimensionY = (Math.floor(Math.random() * 6) + 0.2);
                randomDimensionZ = (Math.floor(Math.random() * 2) + 0.2);

                geometry = new THREE.BoxGeometry( randomDimensionX, randomDimensionY, randomDimensionZ);    
            } else {
                geometry = new THREE.BoxGeometry( 1, 1, 1);    
            }

            arrayOfBoxes[i] = new THREE.Mesh( geometry, material );
            scene.add( arrayOfBoxes[i] );
            arrayOfBoxes[i].position.set(0,0,0);
        }
    }

    function setupScene() {
        // New camera and position
        camera = new THREE.PerspectiveCamera( cameraDistance, width / height, 0.01, 100);
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
        time += 0.07;

        for(var i=0; i < arrayOfBoxes.length; i++){
            arrayOfBoxes[i].rotation.y = Math.sin(time) + (Math.cos(time));
            arrayOfBoxes[i].rotation.x = Math.cos(time + i) + (Math.cos(time));
            arrayOfBoxes[i].position.x = Math.sin(time + i) + (Math.cos(time));
            // arrayOfBoxes[i].position.z = Math.sin(time) + (Math.sin(time) * i);
            // angle = Math.cos(i)

            arrayOfBoxes[i].position.x = (Math.cos(time + i) * circleRadius);
            arrayOfBoxes[i].position.y = (Math.sin(time + i) * circleRadius);
        }

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


particle.init();