import * as THREE from "three";
import GSAP from "gsap";

import Experience from "../Experience.js";

export default class Room {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;

    this.setFloor();
    this.setCircles();
  }

  setFloor() {
    this.geometry = new THREE.PlaneGeometry(100, 100);
    this.material = new THREE.MeshStandardMaterial({
      color: 0xffeecc,
      side: THREE.BackSide,
    });
    this.plane = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.plane);
    this.plane.rotation.x = Math.PI / 2;
    this.plane.position.y = -0.3;
    this.plane.receiveShadow = true;
  }
  setCircles() {
    this.geometry = new THREE.CircleGeometry(5, 32);

    this.material = new THREE.MeshStandardMaterial({ color: 0xffb0a3 });
    this.material2 = new THREE.MeshStandardMaterial({ color: 0xff6973 });
    this.material3 = new THREE.MeshStandardMaterial({ color: 0x15788c });
    this.material4 = new THREE.MeshStandardMaterial({ color: 0x46425e });

    this.circle = new THREE.Mesh(this.geometry, this.material);
    this.circle2 = new THREE.Mesh(this.geometry, this.material2);
    this.circle3 = new THREE.Mesh(this.geometry, this.material3);
    this.circle4 = new THREE.Mesh(this.geometry, this.material4);

    this.circle.position.y = -0.29;
    this.circle2.position.y = -0.28;
    this.circle3.position.y = -0.27;
    this.circle4.position.y = -0.26;
    this.circle.scale.set(0, 0, 0);
    this.circle2.scale.set(0, 0, 0);
    this.circle3.scale.set(0, 0, 0);
    this.circle4.scale.set(0, 0, 0);
    this.circle.rotation.x = -Math.PI / 2;
    this.circle2.rotation.x = -Math.PI / 2;
    this.circle3.rotation.x = -Math.PI / 2;
    this.circle4.rotation.x = -Math.PI / 2;
    this.circle.receiveShadow = true;
    this.circle2.receiveShadow = true;
    this.circle3.receiveShadow = true;
    this.circle4.receiveShadow = true;

    this.scene.add(this.circle);
    this.scene.add(this.circle2);
    this.scene.add(this.circle3);
    this.scene.add(this.circle4);
  }

  resize() {}

  update() {}
}
