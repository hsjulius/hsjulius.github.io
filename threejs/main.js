// import {
//     BoxBufferGeometry,
//     Color,
//     Mesh,
//     MeshBasicMaterial,
//     PerspectiveCamera,
//     Scene,
//     WebGLRenderer,
//   } from 'three';
  
//   // Get a reference to the container element that will hold our scene
//   const container = document.querySelector('#scene-container');
  
//   // create a Scene
//   const scene = new Scene();
  
//   // Set the background color
//   scene.background = new Color('skyblue');
  
//   // Create a camera
//   const fov = 35; // AKA Field of View
//   const aspect = container.clientWidth / container.clientHeight;
//   const near = 0.1; // the near clipping plane
//   const far = 100; // the far clipping plane
  
//   const camera = new PerspectiveCamera(fov, aspect, near, far);
  
//   // every object is initially created at ( 0, 0, 0 )
//   // move the camera back so we can view the scene
//   camera.position.set(0, 0, 10);
  
//   // create a geometry
//   const geometry = new BoxBufferGeometry(2, 2, 2);
  
//   // create a default (white) Basic material
//   const material = new MeshBasicMaterial();
  
//   // create a Mesh containing the geometry and material
//   const cube = new Mesh(geometry, material);
  
//   // add the mesh to the scene
//   scene.add(cube);
  
//   // create the renderer
//   const renderer = new WebGLRenderer();
  
//   // next, set the renderer to the same size as our container element
//   renderer.setSize(container.clientWidth, container.clientHeight);
  
//   // finally, set the pixel ratio so that our scene will look good on HiDPI displays
//   renderer.setPixelRatio(window.devicePixelRatio);
  
//   // add the automatically created <canvas> element to the page
//   container.append(renderer.domElement);
  
//   // render, or 'create a still image', of the scene
//   renderer.render(scene, camera);


import * as THREE from "three";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ffff } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

function animate() {
	requestAnimationFrame( animate );

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();