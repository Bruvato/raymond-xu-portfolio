import * as THREE from "three";

import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import ASScroll from "@ashthornton/asscroll";

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

    this.circle = this.experience.world.floor.circle;
    this.circle2 = this.experience.world.floor.circle2;
    this.circle3 = this.experience.world.floor.circle3;
    this.circle4 = this.experience.world.floor.circle4;

    this.clock = this.experience.world.room.actualRoom.children.find(
      (child) => child.name === "clock"
    );
    this.hourHand = this.experience.world.room.actualRoom.children.find(
      (child) => child.name === "hour_hand"
    );
    this.minHand = this.experience.world.room.actualRoom.children.find(
      (child) => child.name === "min_hand"
    );

    this.setScrollTrigger();
    this.setSmoothScroll();
  }

  setupASScroll() {
    // https://github.com/ashthornton/asscroll
    const asscroll = new ASScroll({
      // ease: 0.3,
      disableRaf: true,
    });

    GSAP.ticker.add(asscroll.update);

    ScrollTrigger.defaults({
      scroller: asscroll.containerElement,
    });

    ScrollTrigger.scrollerProxy(asscroll.containerElement, {
      scrollTop(value) {
        if (arguments.length) {
          asscroll.currentPos = value;
          return;
        }
        return asscroll.currentPos;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      fixedMarkers: true,
    });

    asscroll.on("update", ScrollTrigger.update);
    ScrollTrigger.addEventListener("refresh", asscroll.resize);

    requestAnimationFrame(() => {
      asscroll.enable({
        newScrollElements: document.querySelectorAll(
          ".gsap-marker-start, .gsap-marker-end, [asscroll]"
        ),
      });
    });
    return asscroll;
  }

  setSmoothScroll() {
    // this.assscroll = this.setupASScroll();
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
        .to(
          this.camera.orthographicCamera.position,
          {
            x: () => {
              return -this.sizes.width * 0.00027;
            },
            z: () => {
              return 1;
            },
          },
          "same"
        )
        .to(
          this.camera.orthographicCamera,
          {
            zoom: () => {
              return this.sizes.width * 0.0032;
            },
            onUpdate: () => {
              this.camera.orthographicCamera.updateProjectionMatrix();
            },
          },
          "same"
        );

      // Third Section --------------------------------------------------
      this.thirdMoveTimeline = new GSAP.timeline(
        {
          scrollTrigger: {
            trigger: ".third-move",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        },
        "same"
      )
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
              return this.sizes.width * 0.0024;
            },
          },
          "same"
        )
        .to(
          this.camera.orthographicCamera,
          {
            zoom: () => {
              return this.sizes.width * 0.003;
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

    // All
    mm.add("(min-width: 0px)", () => {
      console.log("all platforms");

      this.camera.orthographicCamera.zoom = 1;
      this.camera.orthographicCamera.updateProjectionMatrix();
      this.camera.orthographicCamera.position.set(0, 1, 1);

      // Section Border Animations

      this.sections = document.querySelectorAll(".section");
      this.sections.forEach((section) => {
        if (section.classList.contains("right")) {
          GSAP.to(section, {
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: 0.6,
            },
            borderTopLeftRadius: 10,
          });
          GSAP.to(section, {
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.6,
            },
            borderBottomLeftRadius: 700,
          });
        } else {
          GSAP.to(section, {
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top top",
              scrub: 0.6,
            },
            borderTopRightRadius: 10,
          });
          GSAP.to(section, {
            scrollTrigger: {
              trigger: section,
              start: "bottom bottom",
              end: "bottom top",
              scrub: 0.6,
            },
            borderBottomRightRadius: 700,
          });
        }
      });

      // Circle Animations

      // First Section --------------------------------------------------
      this.firstMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".first-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(this.circle.scale, {
        x: 3,
        y: 3,
        z: 3,
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
      }).to(this.circle2.scale, {
        x: 3,
        y: 3,
        z: 3,
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
      }).to(this.circle3.scale, {
        x: 3,
        y: 3,
        z: 3,
      });

      // Fourth Section --------------------------------------------------
      this.fourthMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".fourth-move",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      }).to(this.circle4.scale, {
        x: 3,
        y: 3,
        z: 3,
      });

      // Clock Animations

      this.clockMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".page",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            let axis = 1;
            if (self.getVelocity() > 0) {
              axis = -1;
            } else {
              axis = 1;
            }
            this.hourHand.rotateOnAxis(
              new THREE.Vector3(0, axis, 0).normalize(),
              Math.PI / 1800
            );
            this.minHand.rotateOnAxis(
              new THREE.Vector3(0, axis, 0).normalize(),
              Math.PI / 150
            );
          },
        },
      });

      // Outisde Platform Animation

      this.outMoveTimeline = new GSAP.timeline({
        scrollTrigger: {
          trigger: ".fourth-section",
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: () => {
            this.experience.world.room.playAnimation();
          },
        },
      });
    });
  }

  resize() {}

  update() {
    //this.camera.orthographicCamera.lookAt(0, 0.5, 0);
  }
}
