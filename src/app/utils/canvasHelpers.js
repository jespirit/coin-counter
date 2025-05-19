/**
 * Canvas setup and p5.js helper utilities
 */

// Remove old image imports if they were only for the previous preloadCoinImages
import coinSpritesheetPath from '../../assets/images/canadian-coins.png';

/**
 * Placeholder definitions for each coin sprite within the spritesheet.
 * IMPORTANT: You MUST update these values (sWidth, sHeight, sxFront, sxBack, sy)
 * to accurately describe the position and size of each coin's front and back
 * image within your 'canadian-coins.png' spritesheet.
 *
 * - sWidth: Source width of the coin's image in the spritesheet.
 * - sHeight: Source height of the coin's image in the spritesheet.
 * - sxFront: Source x-coordinate for the front image (usually 0).
 * - sxBack: Source x-coordinate for the back image (e.g., sxFront + sWidth of front).
 * - sy: Source y-coordinate for this coin's row in the spritesheet.
 *       This should be cumulative if coins are stacked vertically.
 */
const COIN_SPRITE_DEFINITIONS = {
  // Order: Nickel, Dime, Quarter, Loonie, Toonie
  // YOU MUST VERIFY/UPDATE sWidth, sHeight, sxFront, sxBack for each coin.
  // sy values are recalculated based on the new order and assumed sHeights.

  'nickel':  { sWidth: 180, sHeight: 180, sxFront: 0,   sxBack: 180,  sy: 0 },    // Example: Nickel 35x35px, starts at y=0
  'dime':    { sWidth: 156, sHeight: 156, sxFront: 0,   sxBack: 156,  sy: 180 },   // Example: Dime 30x30, starts at y=35 (0+35)
  'quarter': { sWidth: 200, sHeight: 200, sxFront: 0,   sxBack: 200,  sy: 336 },   // Example: Quarter 40x40, starts at y=65 (35+30)
  'loonie':  { sWidth: 220, sHeight: 220, sxFront: 0,   sxBack: 220,  sy: 536 },  // Example: Loonie 45x45, starts at y=105 (65+40)
  'toonie':  { sWidth: 232, sHeight: 232, sxFront: 0,   sxBack: 232,  sy: 756 }   // Example: Toonie 50x50, starts at y=150 (105+45)
};

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

// The loadImageFailure function is no longer needed with the new spritesheet approach.
// function loadImageFailure(event, coinImagesObject, imageName) { ... }

/**
 * Preloads the coin spritesheet and stores sprite definitions.
 * @param {p5} p - The p5 instance
 * @returns {Object} Object containing the loaded spritesheet image and its definitions.
 */
export function preloadCoinImages(p) {
  const coinSpriteData = {
    image: null,
    spriteDefinitions: COIN_SPRITE_DEFINITIONS, // Store the detailed definitions
    isReady: false, // Flag to indicate if image is loaded
  };

  coinSpriteData.image = p.loadImage(
    coinSpritesheetPath,
    (img) => { // Success callback
      if (img.width > 0 && img.height > 0) {
        coinSpriteData.isReady = true;
        console.log(
          `Spritesheet loaded: ${img.width}x${img.height}. Using defined sprite details.`
        );
        // Optional: Add validation here to check if the defined sx, sy, sWidth, sHeight
        // in COIN_SPRITE_DEFINITIONS are within the bounds of img.width and img.height.
      } else {
        console.error('Spritesheet loaded but has zero dimensions:', coinSpritesheetPath);
      }
    },
    (event) => { // Failure callback
      console.error('Failed to load coin spritesheet:', coinSpritesheetPath, event);
    }
  );

  return coinSpriteData;
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