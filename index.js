import * as THREE from 'three';
import orbitControls from 'orbit-controls';
import _ from 'lodash';

import World from './src/world';
import Pano from './src/pano';
import Arrow from './src/arrow';

const defaultPano = 'entry';
const defaultTime = 0;

const controls = orbitControls({
  position: [0, 0, 1],
  rotateSpeed: 0.08,
  distanceBounds: [0, 1],
});

let params = {};
const queryString = document.location.search.slice(1);
if(queryString.length) {
  params = queryString.split('&').reduce((collector, pair) => {
    const arr = pair.split('=');
    collector[arr[0]] = decodeURIComponent(arr[1]);
    return collector;
  }, {});
}

const startingPano = params.pano || defaultPano;
const startingTime = typeof params.time !== 'undefined' ? params.time : defaultTime;

let previousDirection;
let world;

init();
animate();

function init() {
  const dropdown = document.querySelector('.dropdown__select');
  const container = document.getElementById('container');

  world = new World(startingPano, startingTime);
  dropdown.value = startingTime;

  container.appendChild( world.renderer.domElement );

  window.addEventListener('resize', onWindowResize);
  document.addEventListener('click', onMouseClick, false);

  dropdown.addEventListener('change', (e) => {
    const time = parseInt(e.target.value, 10);
    world.navigateToTime(time);
  });
}

function onWindowResize() {
  world.camera.aspect = window.innerWidth / window.innerHeight;
  world.renderer.setSize(window.innerWidth, window.innerHeight);
  world.camera.updateProjectionMatrix();
  world.render();
}

function animate() {
  requestAnimationFrame( animate );
  update();
}

function update() {
  controls.update();
  const reverseZoom = [
    controls.position[0],
    controls.position[1] * -1,
    controls.position[2] * -1
  ];
  world.camera.position.fromArray(reverseZoom);
  const reverseDirection = [
    controls.direction[0],
    controls.direction[1] * -1 - 0.2,
    controls.direction[2] * -1,
  ];
  world.camera.lookAt(world.target.fromArray(reverseDirection));

  const newTarget = [...controls.position, ...controls.direction];

  if(!_.isEqual(newTarget, previousDirection)) {
    world.render();
    previousDirection = newTarget;
  }
}

function onMouseClick(event) {
  event.preventDefault();
  var mouse = new THREE.Vector2(), INTERSECTED;
  var raycaster = new THREE.Raycaster();
  mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  // find intersections
  raycaster.setFromCamera( mouse, world.camera );
  var intersects = raycaster.intersectObjects( world.scene.children );
  if( intersects.length > 0 ){// if an object was clicked
    var intersect  = intersects[ 0 ];
    var newSelected  = intersect.object;
    if(newSelected.ref instanceof Arrow){
      world.navigateToScene(newSelected.ref.link);
    }
  }
}
