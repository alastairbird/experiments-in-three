
var something;

something = (function() {
    'use strict';

    var camera,
        scene,
        renderer,
        clock,
        controls,
        container,
        gui,
        width,
        height,
        options,
        tick,
        spawnerOptions,
        cameraControls,
        particleSystem,
        stats;

    function init() {
        // Vars
        width = window.innerWidth;
        height = window.innerHeight;
        tick = 0;
        clock = new THREE.Clock();
        gui = new dat.GUI( { width: 350 } );


        createMySomething();
        animate();
    }

    
    function createMySomething() {
    
        container = document.getElementById( 'container' );
        camera = new THREE.PerspectiveCamera( 28, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 100;
        scene = new THREE.Scene();
        // The GPU Particle system extends THREE.Object3D, and so you can use it
        // as you would any other scene graph component.    Particle positions will be
        // relative to the position of the particle system, but you will probably only need one
        // system for your whole scene
        particleSystem = new THREE.GPUParticleSystem( {
            maxParticles: 250000
        } );
        scene.add( particleSystem );
        // options passed during each spawned
        options = {
            position: new THREE.Vector3(),
            positionRandomness: .3,
            velocity: new THREE.Vector3(),
            velocityRandomness: .5,
            color: 0xaa88ff,
            colorRandomness: .2,
            turbulence: .5,
            lifetime: 2,
            size: 5,
            sizeRandomness: 1
        };
        spawnerOptions = {
            spawnRate: 15000,
            horizontalSpeed: 1.5,
            verticalSpeed: 1.33,
            timeScale: 1
        };
        //
        gui.add( options, "velocityRandomness", 0, 3 );
        gui.add( options, "positionRandomness", 0, 3 );
        gui.add( options, "size", 1, 20 );
        gui.add( options, "sizeRandomness", 0, 25 );
        gui.add( options, "colorRandomness", 0, 1 );
        gui.add( options, "lifetime", .1, 10 );
        gui.add( options, "turbulence", 0, 1 );
        gui.add( spawnerOptions, "spawnRate", 10, 30000 );
        gui.add( spawnerOptions, "timeScale", - 1, 1 );
        //
        stats = new Stats();
        container.appendChild( stats.dom );
        //
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        container.appendChild( renderer.domElement );
        //
        controls = new THREE.TrackballControls( camera, renderer.domElement );
        controls.rotateSpeed = 5.0;
        controls.zoomSpeed = 2.2;
        controls.panSpeed = 1;
        controls.dynamicDampingFactor = 0.3;
        window.addEventListener( 'resize', onWindowResize, false );
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

        // Create a renderer and set its size
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( width, height );
    
        // Add the renderer to the DOM
        document.body.appendChild( renderer.domElement );

        // Listen to the window resize event
        window.addEventListener('resize', onWindowResize);
    }

    function animate() {
        requestAnimationFrame( animate );
        controls.update();
        var delta = clock.getDelta() * spawnerOptions.timeScale;
        tick += delta;
        if ( tick < 0 ) tick = 0;
        if ( delta > 0 ) {
            options.position.x = Math.sin( tick * spawnerOptions.horizontalSpeed ) * 20;
            options.position.y = Math.sin( tick * spawnerOptions.verticalSpeed ) * 10;
            options.position.z = Math.sin( tick * spawnerOptions.horizontalSpeed + spawnerOptions.verticalSpeed ) * 5;
            for ( var x = 0; x < spawnerOptions.spawnRate * delta; x ++ ) {
                // Yep, that's really it.   Spawning particles is super cheap, and once you spawn them, the rest of
                // their lifecycle is handled entirely on the GPU, driven by a time uniform updated below
                particleSystem.spawnParticle( options );
            }
        }
        particleSystem.update( tick );
        render();
        stats.update();
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

    function render() {
        renderer.render( scene, camera );
    }
      
    return {
        init: init,
    };

}());


something.init();