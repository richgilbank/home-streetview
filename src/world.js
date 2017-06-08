import * as THREE from 'three';

import Pano from './pano';

const geometry = new THREE.SphereGeometry( 1, 32, 32 );

class World {
  constructor(defaultPano, defaultTime) {
    this.defaultPano = defaultPano;
    this.defaultTime = defaultTime;
    this.panoName = defaultPano;
    this.camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.01, 100 );
    this.target = new THREE.Vector3();
    this.camera.lookAt(this.target);
    this.scene = new THREE.Scene();
    this.pano = new Pano(this.scene);
    this.pano.loadTexture(defaultPano, defaultTime).then(this.render.bind(this));
    this.pano.loadLinks().then(this.render.bind(this));

    this.material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.BackSide,
      map: this.pano.texture
    });
    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );
  }

  render() {
    this.renderer.render(this.scene, this.camera);
  }

  navigateToScene(panoName) {
    this.pano.links.forEach((arrow) => {
      if(arrow == null) return;
      this.scene.remove(arrow.mesh);
    });
    this.pano.loadTexture(panoName, this.defaultTime).then(this.render.bind(this));
    this.pano.loadLinks().then(this.render.bind(this));
    this.panoName = panoName;
    this.material.map = this.pano.texture;
    this.material.map.needsUpdate = true;
  }

  navigateToTime(time) {
    this.defaultTime = time;
    this.navigateToScene(this.panoName);
  }
}

export default World;
