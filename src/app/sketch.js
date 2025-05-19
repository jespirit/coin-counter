/**
 * Canadian Coin Counter Game
 * A p5.js game where users count Canadian coins
 */
import { setupCanvas, preloadCoinImages, handleWindowResize } from './utils/canvasHelpers.js';
import { Game } from './classes/Game.js';
import '../style.css';

// Using p5.js instance mode to avoid polluting global scope
const sketch = (p) => {
  // Game variables
  let game;
  let coinSpriteData; // Changed from coinImages to reflect it holds the spritesheet and its data
  
  p.preload = () => {
    // Preload coin spritesheet
    try {
      coinSpriteData = preloadCoinImages(p);
    } catch (e) {
      console.error('Failed to load coin spritesheet, game cannot start properly.', e);
      // If spritesheet fails, coinSpriteData will contain isReady: false
      // The Coin class drawFallback will be used.
    }
  };
  
  p.setup = () => {
    // Create responsive canvas and place it in the game-canvas div
    const parentElement = document.getElementById('game-canvas');
    const canvasWidth = parentElement ? parentElement.offsetWidth : 800;
    const canvasHeight = 600;
    
    setupCanvas(p, canvasWidth, canvasHeight);
    
    // Initialize game with the coin sprite data
    game = new Game(p, coinSpriteData);
    
    // Set text properties
    p.textFont('Arial');
    p.textSize(16);
    
    // Handle window resize
    window.addEventListener('resize', () => {
      handleWindowResize(p, 300, canvasWidth / canvasHeight);
      
      // Ensure coins stay within new boundaries after resize
      if (game) {
        game.handleCanvasResize(p.width, p.height);
      }
    });
  };
  
  p.draw = () => {
    // Clear the background
    p.background(240);
    
    // Update and draw the game
    game.update();
    game.draw();
    
    // Draw instructions
    if (!game.gameEnded) {
      p.fill(80);
      p.textAlign(p.LEFT, p.TOP);
      p.text('Click and drag to move coins', 10, 10);
      p.text('Press R to rotate selected coin', 10, 30);
      p.text('Press F to flip coin(s)', 10, 50); // Added instruction for flipping
      p.text('Use arrow keys to adjust your count', 10, 70);
      p.text('Press C to check your answer', 10, 90);
    }
  };
  
  // Event handlers
  p.mousePressed = () => {
    game.handleMousePressed();
  };
  
  p.mouseReleased = () => {
    game.handleMouseReleased();
  };
  
  p.keyPressed = () => {
    game.handleKeyPressed();
  };
};

// Start the sketch
new p5(sketch);