/**!
 * @file Fibonacci Rainbow Spirals for fxhash.xyz  
 * @version 1.0.0  
 * @copyright Iuri Guilherme 2023  
 * @license GNU AGPLv3  
 * @author Iuri Guilherme <https://iuri.neocities.org/>  
 * @description This is Fibonacci Spirals with p5js for fxhash.xyz GT  
 * 
 * This program is free software: you can redistribute it and/or modify it 
 * under the terms of the GNU Affero General Public License as published by the 
 * Free Software Foundation, either version 3 of the License, or (at your 
 * option) any later version.  
 * 
 * This program is distributed in the hope that it will be useful, but WITHOUT 
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or 
 * FITNESS FOR A PARTICULAR PURPOSE.  
 * See the GNU Affero General Public License for more details.  
 * 
 * You should have received a copy of the GNU Affero General Public License 
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.  
 * 
 */

import p5 from 'p5';
import { create, all } from 'mathjs'

const math_config = { }
const math = create(all, math_config)

const sqrt5 = math.sqrt(5);
const spin = math.pi / 2;
const maxIterations = 100;
const maxSpirals = 360;
const lastFibonacci = getFibonacci(maxIterations);
const featureColor = getFeatureColor(fxhash);
const featureHue = math.abs(featureColor % maxSpirals);
const featureLuminance = math.min(60,
  math.max(30,
    math.abs(featureColor % maxIterations)
  )
);
let size;

let sketch = function(p5) {
  p5.setup = function() {
    p5.randomSeed(fxrand() * 1e8);
    size = p5.min(p5.windowWidth, p5.windowHeight);
    p5.createCanvas(size, size);
    p5.colorMode(p5.HSL)
    p5.noLoop();
};
  p5.draw = async function() {
    p5.background(featureHue, 90, featureLuminance);
    p5.noFill();
    p5.strokeWeight(1);
    p5.translate(p5.windowWidth / 2, p5.windowHeight / 2);
    for (var iteration = 0; iteration < maxIterations; iteration++) {
      var fibonacci = getFibonacci(iteration);
      for (var spiral = 0; spiral <= maxSpirals; spiral++) {
        p5.stroke(
          spiral,
          math.abs(100 - iteration * (100 / maxIterations)),
          math.abs(100 - featureLuminance)
        );
        p5.arc(
          spiral,
          iteration * spiral,
          fibonacci * iteration,
          fibonacci * spiral,
          fibonacci,
          spin
        );
        await new Promise(r => setTimeout(r, 1));
      }
      p5.rotate(spin);
    }
    fxpreview();
  };
  p5.windowResized = function() {
    size = p5.min(p5.windowWidth, p5.windowHeight);
    p5.resizeCanvas(size, size);
  }
}
let myp5 = new p5(sketch, window.document.body);

/**
 * @param {int} n: nth fibonacci number in the fibonacci sequence
 * @returns {float} a very good approximation of the nth fibonacci number
*/
function getFibonacci(n) {
    return math.pow(math.phi, n) / sqrt5;
}

/**
 * @param {String} hash: unique fxhash string
 * @returns {int} number than can be used for value in color ranges
 * @description Adapted from https://stackoverflow.com/a/66494926/7839535
 */
function getFeatureColor(hash) {
    let unique = [...hash].reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);
    return unique;
}

window.$fxhashFeatures = {
  "Hue": featureHue,
  "Luminance": featureLuminance
}
