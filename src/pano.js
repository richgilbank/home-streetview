import * as THREE from 'three';

import Arrow from './arrow';
import { panoramas, panoramaLinks } from './data';

class Pano {
  constructor(scene) {
    this.scene = scene;
    this.textureLoaded = false;
  }

  loadTexture(name, time) {
    this.name = name;
    this.time = time;
    this.textureLoaded = false;

    if(this.name === 'ensuite' && this.time < 4) {
      this.name = 'study';
    }
    else if(panoramas[this.name][this.time] == undefined) {
      const validTimes = Object.keys(panoramas[name]).sort().reverse();
      this.time = validTimes.find((compare) => parseInt(compare, 10) < parseInt(this.time));
    }
    this.texturePath = `panos/${this.name}-${this.time}.jpg`;

    return new Promise((resolve, reject) => {
      this.texture = new THREE.TextureLoader().load(this.texturePath, (tex) => {
        resolve();
        this.textureLoaded = true;
      });
      this.texture.wrapS = THREE.RepeatWrapping;
      this.texture.repeat.x = -1;
      this.texture.offset.x = -1 * toRadians(panoramas[this.name][this.time]);
    });
  }

  loadLinks() {
    this.linkPromises = [];
    this.links = panoramaLinks[this.name].map((link) => {
      if(link.pano == 'bathroom' && this.time > 0) return null;
      const arrow = new Arrow(link);
      this.scene.add(arrow.mesh);
      this.linkPromises.push(arrow.loadedPromise);
      return arrow;
    });
    return Promise.all(this.linkPromises);
  }
}

function toRadians(degrees) {
  return degrees * Math.PI / 180;
}

export default Pano;
