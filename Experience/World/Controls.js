import * as THREE from "three";

import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.sizes = this.experience.sizes;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.camera = this.experience.camera;
    this.room = this.experience.world.room.actualRoom;
    GSAP.registerPlugin(ScrollTrigger);

    this.setScrollTrigger();
  }

  setScrollTrigger() {
    let mm = GSAP.matchMedia();

    // Desktop
    mm.add("(min-width: 969px)", () => {
      console.log("desktop");

      this.camera.orthographicCamera.zoom = 1;
      this.camera.orthographicCamera.updateProjectionMatrix();
      this.camera.orthographicCamera.position.set(0, 1, 1);

      // Start Section --------------------------------------------------
      this.startMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
        .to(this.camera.orthographicCamera.position, {
          x: () => {
            return 0;
          },
          z: () => {
            return 1;
          },
        })
        .to(this.camera.orthographicCamera, {
          zoom: () => {
            return 1;
          },
          onUpdate: () => {
            this.camera.orthographicCamera.updateProjectionMatrix();
          },
        });

      // First Section --------------------------------------------------
      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
        .to(this.camera.orthographicCamera.position, {
          x: () => {
            return -this.sizes.width * 0.0014;
          },
          z: () => {
            return 1;
          },
        })
        .to(this.camera.orthographicCamera, {
          zoom: () => {
            return 1;
          },
          onUpdate: () => {
            this.camera.orthographicCamera.updateProjectionMatrix();
          },
        });

      // Second Section --------------------------------------------------
      this.secondMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".second-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
        .to(this.camera.orthographicCamera.position, {
          x: () => {
            return -this.sizes.width * 0.00027;
          },
          z: () => {
            return 1;
          },
        })
        .to(this.camera.orthographicCamera, {
          zoom: () => {
            return this.sizes.width * 0.0032;
          },
          onUpdate: () => {
            this.camera.orthographicCamera.updateProjectionMatrix();
          },
        });

      // Third Section --------------------------------------------------
      this.thirdMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".third-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.camera.orthographicCamera.position,
          {
            x: () => {
              return -this.sizes.width * 0.0001;
            },
            z: () => {
              return -this.sizes.width * 0.0005;
            },
          },
          "same"
        )
        .to(
          this.camera.orthographicCamera,
          {
            zoom: () => {
              return this.sizes.width * 0.0022;
            },
            onUpdate: () => {
              this.camera.orthographicCamera.updateProjectionMatrix();
            },
          },
          "same"
        );
      // Fourth Section --------------------------------------------------
      this.fourthMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".fourth-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })
        .to(
          this.camera.orthographicCamera.position,
          {
            x: () => {
              return 0;
            },
            z: () => {
              return this.sizes.width * 0.00156;
            },
          },
          "same"
        )
        .to(
          this.camera.orthographicCamera,
          {
            zoom: () => {
              return this.sizes.width * 0.002;
            },
            onUpdate: () => {
              this.camera.orthographicCamera.updateProjectionMatrix();
            },
          },
          "same"
        );
    });

    // Mobile
    mm.add("(max-width: 968px)", () => {
      console.log("mobile");

      this.camera.orthographicCamera.zoom = 1;
      this.camera.orthographicCamera.updateProjectionMatrix();
      this.camera.orthographicCamera.position.set(0, 1, 1);
    });
  }

  resize() {}

  update() {
    //this.camera.orthographicCamera.lookAt(0, 0.5, 0);
  }
}
