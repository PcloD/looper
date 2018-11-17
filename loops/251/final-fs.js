import vignette from '../../shaders/vignette.js';
import fxaa from '../../shaders/fxaa.js';
import softLight from '../../shaders/soft-light.js';
import colorDodge from '../../shaders/color-dodge.js';
import ditherNoise from '../../shaders/dither-noise.js';

const fs = `
precision highp float;

uniform vec2 resolution;

uniform sampler2D inputTexture;
uniform float vignetteBoost;
uniform float vignetteReduction;

varying vec2 vUv;
${vignette}
${fxaa}
${softLight}
${colorDodge}
${ditherNoise}

void main() {
  vec4 color = fxaa(inputTexture, vUv);
  vec4 finalColor = softLight(color, vec4(vec3(vignette(vUv, vignetteBoost, vignetteReduction)),1.));
  finalColor = softLight(finalColor, .5+vec4(.001*ditherNoise(vUv,0.)));
  gl_FragColor = finalColor;
}
`;

export { fs };