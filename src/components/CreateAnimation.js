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
            direction: "bottom",
            enable: true,
            outModes: "out",
            speed: 2,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 400,
          },
          opacity: {
            value: 0.4,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: 10,
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
