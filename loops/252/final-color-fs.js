import rgbShift from '../../shaders/rgb-shift.js';
import { gammaCorrect, levelRange, finalLevels } from '../../shaders/levels.js';

const fs = `
precision highp float;

uniform vec2 resolution;

uniform sampler2D inputTexture;

varying vec2 vUv;
${rgbShift}
${gammaCorrect}
${levelRange}
${finalLevels}

void main() {
  vec4 color = rgbShift(inputTexture, vUv, vec2(10.));
  gl_FragColor = vec4(finalLevels(color.rgb, vec3(13.)/255., vec3(1.), vec3(255.)/255.),1.);
}
`;

export { fs };