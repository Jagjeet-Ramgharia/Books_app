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


//   const configs = {
//   particles: {
//     number: {
//       value: 0
//     },
//     stroke: {
//       color: {
//         value: "#ff0000",
//         animation: {
//           enable: true,
//           speed: 360,
//           sync: true
//         }
//       },
//       width: 2
//     },
//     shape: {
//       type: ["circle", "square", "triangle", "polygon"],
//       options: {
//         circle: {
//           fill: false
//         },
//         square: {
//           fill: false
//         },
//         triangle: {
//           fill: false
//         },
//         polygon: [
//           {
//             sides: 5,
//             fill: false
//           },
//           {
//             sides: 6,
//             fill: false
//           }
//         ]
//       }
//     },
//     opacity: {
//       value: 1
//     },
//     rotate: {
//       value: { min: 0, max: 360 },
//       direction: "random",
//       animation: {
//         enable: true,
//         sync: true,
//         speed: { min: 15, max: 30 }
//       }
//     },
//     size: {
//       value: { min: 1, max: 30 },
//       animation: {
//         enable: true,
//         speed: { min: 40, max: 80 },
//         sync: true,
//         startValue: "max",
//         destroy: "min"
//       }
//     },
//     move: {
//       enable: true,
//       speed: { min: 5, max: 10 },
//       outModes: "destroy"
//     }
//   },
//   interactivity: {
//     events: {
//       onHover: {
//         enable: true,
//         mode: "trail"
//       }
//     },
//     modes: {
//       trail: {
//         delay: 0,
//         quantity: 7,
//         pauseOnStop: false
//       }
//     }
//   },
//   background: {
//     color: "#000000"
//   }
// };

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
