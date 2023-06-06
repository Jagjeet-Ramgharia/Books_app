import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticleComponent = () => {
  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    await console.log(container);
  }, []);

  const configs = {
 smooth: true,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "bubble",
          parallax: {
            enable: false,
            force: 2,
            smooth: 10
          }
        }
      },
      modes: {
        bubble: {
          distance: 40,
          duration: 2,
          opacity: 8,
          size: 15
        }
      }
    },
    particles: {
      move: {
        direction: "none",
        distance: 5,
        enable: true,
        outModes: "none",
        speed: 1
      },
      number: {
        value: 700
      },
      shape: {
        type: ["circle", "square", "triangle"]
      },
      size: {
        value: {
          min: 3,
          max: 5
        }
      }
    },
    canvasMask: {
      enable: true,
      scale: 5,
      pixels: {
        filter: "pixelFilter"
      },
      image: {
        src: "https://particles.js.org/images/amongus_cyan.png"
      }
    },
    background: {
      color: "#000000",
      image: "",
      position: "50% 50%",
      repeat: "no-repeat",
      size: "cover"
    }
};



  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={configs}
    />
  );
};

export default ParticleComponent;
