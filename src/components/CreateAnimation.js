import Particles from "react-tsparticles";

export default function Animation() {
  return (
    <Particles
      id="tsparticles"
      options={{
        background: {
          color: "#f4f4f4",
        },
        fullScreen: {
          enable: true,
          zIndex: "-2",
        },
        particles: {
          color: {
            value: "#8d69f1",
          },
          move: {
            direction: "random",
            enable: true,
            outModes: "out",
            speed: 4,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 15,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: 100,
          },
          wobble: {
            enable: true,
            distance: 10,
            speed: 10,
          },
          zIndex: {
            value: {
              min: 0,
              max: 100,
            },
          },
        },
      }}
    />
  );
}
