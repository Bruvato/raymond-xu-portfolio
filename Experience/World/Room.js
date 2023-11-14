import * as THREE from "three";
import GSAP from "gsap";

import Experience from "../Experience.js";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.room = this.resources.items.room;
    this.actualRoom = this.room.scene;

    this.lerp = {
      current: 0,
      target: 0,
      ease: 0.1,
    };

    this.setModel();
    this.onMouseMove();
  }

  setModel() {
    this.actualRoom.children.forEach((child) => {
      child.castShadow = true;
      child.receiveShadow = true;

      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      }
    });
    this.scene.add(this.actualRoom);

    this.lampLight = new THREE.PointLight(0x15788c, 0.5);
    this.lampLight.position.set(-0.48892098665237427, 0.5, -0.6269965767860413);
    this.actualRoom.add(this.lampLight);
    this.lampLight.castShadow = true;
    this.lampLight.shadow.mapSize.set(2048, 2048);
    this.lampLight.shadow.normalBias = 0.05;

    this.pointLightHelper = new THREE.PointLightHelper(this.lampLight, 0.1);
    // this.scene.add(this.pointLightHelper);
  }

  onMouseMove() {
    window.addEventListener("mousemove", (e) => {
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  resize() {}

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );

    this.actualRoom.rotation.y = this.lerp.current;
  }
}
