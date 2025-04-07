// This file defines configuration options for tilt effects (mii), including glare, gyroscope, and animation settings.

export const tiltOptions = {
  max: 10,
  speed: 1000,
  glare: true,
  "max-glare": 0.2,
  transition: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
  gyroscope: true,
  gyroscopeMinAngleX: -10,
  gyroscopeMaxAngleX: 10,
  gyroscopeMinAngleY: -10,
  gyroscopeMaxAngleY: 10,
  gyroscopeSamples: 10,
};
