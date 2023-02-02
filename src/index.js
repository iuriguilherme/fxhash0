/**!
 * @file fxhash-boilerplate-webpack-libre  
 * @version 0.0.0.0  
 * @copyright Iuri Guilherme 2023  
 * @license GNU AGPLv3  
 * @author Iuri Guilherme <https://iuri.neocities.org/>  
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

const unique = fxhash
const super = getFeatureSuper(fxrand())

window.$fxhashFeatures = {
  "super": super
}

let sketch = function(p5) {
  p5.setup = function() {
    p5.createCanvas(p5.windowWidth, p5.windowHeight);
    p5.background(255);
    p5.frameRate(30);
  };
  p5.draw = function() {
    p5.background(255);
    document.write("fxhash: " + unique)
    document.write("super: " + super)
    document.write("random: " + fxhash())
  };
  p5.windowResized = function() {
    p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
  }
}
let myp5 = new p5(sketch, window.document.body);

function getFeatureSuper(value) {
  if (value < 0.1) {
    return 0.1;
  } else if (value < 0.2) {
    return 0.2;
  } else if (value < 0.3) {
    return 0.3;
  } else if (value < 0.4) {
    return 0.4;
  } else if (value < 0.5) {
    return 0.5;
  } else if (value < 0.6) {
    return 0.6;
  } else if (value < 0.7) {
    return 0.7;
  } else if (value < 0.8) {
    return 0.8;
  } else if (value < 0.9) {
    return 0.9;
  } else {
    return 1.0;
  }
}
