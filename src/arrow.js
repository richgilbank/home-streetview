import * as THREE from 'three';

class Arrow {
  constructor(arrowData) {
    this.heading = arrowData.heading;
    this.link = arrowData.pano;
    this.loadedPromise = new Promise((resolve, reject) => {
      this.texture = new THREE.TextureLoader().load('../img/arrow.png', (tex) => {
        resolve();
      });
      this.material = new THREE.MeshBasicMaterial({
        map: this.texture,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.5,
      });
      this.geometry = new THREE.PlaneGeometry(0.1, 0.1);
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.mesh.ref = this;

      this.setPosition();
    });
  }

  setPosition() {
    const radius = 0.6;
    const x = Math.cos(toRadians(this.heading) + Math.PI / 2) * radius;
    const z = Math.sin(toRadians(this.heading) + Math.PI / 2) * radius;

    this.mesh.rotation.x = toRadians(90);
    this.mesh.rotation.z = toRadians(this.heading);
    this.mesh.position.setZ(z).setX(x).setY(-0.4);
  }
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

export default Arrow;
