/**
 * Canvas setup and p5.js helper utilities
 */

import loonieImage from '../../assets/images/loonie.png';
import toonieImage from '../../assets/images/toonie.png';

/**
 * Creates and sets up the canvas
 * @param {p5} p - The p5 instance
 * @param {number} width - Canvas width 
 * @param {number} height - Canvas height
 * @returns {HTMLElement} The created canvas element
 */
export function setupCanvas(p, width, height) {
  const canvas = p.createCanvas(width, height);
  canvas.parent('game-canvas');
  return canvas;
}

function loadImageFailure(event, coinImagesObject, imageName) {
  // coinImagesObject is the actual 'coinImages' object from preloadCoinImages
  // imageName is the key (e.g., 'toonie', 'loonie')

  const imageInstance = coinImagesObject ? coinImagesObject[imageName] : undefined;

  console.error(`Failed to load image for ${imageName || 'unknown'}:`, event);
  
  if (imageInstance && typeof imageInstance.width !== 'undefined' && typeof imageInstance.height !== 'undefined') {
    // imageInstance is the p5.Image instance.
    // Its width/height might be 0 or default if loading truly failed.
    console.log(`Associated p5.Image object (width: ${imageInstance.width}, height: ${imageInstance.height}):`, imageInstance);
  } else if (imageName) {
    console.log(`No valid p5.Image object was found for ${imageName} in coinImagesObject at the time of failure logging.`);
  }

  // Set the property in the original coinImages object to null
  if (coinImagesObject && imageName && coinImagesObject.hasOwnProperty(imageName)) {
    coinImagesObject[imageName] = null;
  }
}

/**
 * Preloads images for different Canadian coins
 * @param {p5} p - The p5 instance
 * @returns {Object} Object containing loaded images
 */
export function preloadCoinImages(p) {
  const coinImages = {}; // Initialize first to allow self-reference in callbacks

  coinImages.toonie = p.loadImage(toonieImage, null, (e) => {
    loadImageFailure(e, coinImages, 'toonie');
  });

  coinImages.loonie = p.loadImage(loonieImage, 
    null, // No success callback defined
    (event) => {
      loadImageFailure(event, coinImages, 'loonie');
      // coinImages.loonie = null; // This is now handled by loadImageFailure
    }
  );

  coinImages.quarter = p.loadImage('assets/images/quarter.png', null, (event) => {
    loadImageFailure(event, coinImages, 'quarter');
  });

  coinImages.dime = p.loadImage('assets/images/dime.png', null, (event) => {
    loadImageFailure(event, coinImages, 'dime');
  });
  
  coinImages.nickel = p.loadImage('assets/images/nickel.png', null, (event) => {
    loadImageFailure(event, coinImages, 'nickel');
  });
  
  return coinImages;
}

/**
 * Updates user count display on the HTML page
 * @param {string} amount - Formatted amount to display
 */
export function updateUserCount(amount) {
  const userCountElement = document.getElementById('user-count');
  if (userCountElement) {
    userCountElement.textContent = amount;
  }
}

/**
 * Updates actual total display on the HTML page 
 * @param {string} amount - Formatted amount to display
 * @param {boolean} show - Whether to show or hide the actual total
 */
export function updateActualTotal(amount, show = false) {
  const actualCountElement = document.getElementById('actual-count');
  if (actualCountElement) {
    actualCountElement.textContent = amount;
    if (show) {
      actualCountElement.classList.remove('hidden');
    } else {
      actualCountElement.classList.add('hidden');
    }
  }
}

/**
 * Checks if the point is inside a circle
 * @param {number} px - Point x coordinate
 * @param {number} py - Point y coordinate
 * @param {number} cx - Circle center x coordinate
 * @param {number} cy - Circle center y coordinate
 * @param {number} r - Circle radius
 * @returns {boolean} True if the point is inside the circle
 */
export function pointInCircle(px, py, cx, cy, r) {
  const dx = px - cx;
  const dy = py - cy;
  return dx * dx + dy * dy <= r * r;
}

/**
 * Resizes the canvas when the window is resized
 * @param {p5} p - The p5 instance
 * @param {number} minWidth - Minimum width for the canvas
 * @param {number} aspectRatio - Aspect ratio to maintain (width/height)
 */
export function handleWindowResize(p, minWidth = 300, aspectRatio = 4/3) {
  const parentElement = document.getElementById('game-canvas');
  if (!parentElement) return;
  
  let newWidth = Math.max(minWidth, parentElement.offsetWidth);
  let newHeight = newWidth / aspectRatio;
  
  p.resizeCanvas(newWidth, newHeight);
}