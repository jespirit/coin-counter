/**
 * Represents a Canadian coin in the coin counting game
 */
export class Coin {
  /**
   * Create a new coin
   * @param {p5} p - The p5 instance
   * @param {number} x - X position of the coin
   * @param {number} y - Y position of the coin
   * @param {string} type - Type of coin (toonie, loonie, quarter, dime, nickel)
   * @param {Object} images - Object containing loaded images for coins
   */
  constructor(p, x, y, type, images) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.type = type;
    this.rotation = p.random(0, p.TWO_PI);
    this.dragging = false;
    this.image = images[type];
    
    // Set coin properties based on type
    switch(type) {
      case 'toonie':
        this.radius = 28;
        this.value = 2.00;
        break;
      case 'loonie':
        this.radius = 26;
        this.value = 1.00;
        break;
      case 'quarter':
        this.radius = 24;
        this.value = 0.25;
        break;
      case 'dime':
        this.radius = 18;
        this.value = 0.10;
        break;
      case 'nickel':
        this.radius = 21;
        this.value = 0.05;
        break;
      default:
        this.radius = 20;
        this.value = 0;
    }
    
    // Save the offset from mouse to center of coin when dragging
    this.offsetX = 0;
    this.offsetY = 0;
    
    // Vector for velocity when moving coins
    this.vel = p.createVector(0, 0);
  }
  
  /**
   * Draw the coin on the canvas
   */
  draw() {
    const p = this.p;
    p.push();
    p.translate(this.x, this.y);
    p.rotate(this.rotation);
    
    if (this.image) {
      p.imageMode(p.CENTER);
      p.image(this.image, 0, 0, this.radius * 2, this.radius * 2);
    } else {
      // Fallback if image isn't loaded
      p.fill(200, 200, 200);
      p.ellipse(0, 0, this.radius * 2);
      p.fill(0);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(this.type, 0, 0);
    }
    
    p.pop();
  }
  
  /**
   * Check if the mouse is over this coin
   * @param {number} mx - Mouse X position
   * @param {number} my - Mouse Y position
   * @returns {boolean} True if mouse is over coin
   */
  isMouseOver(mx, my) {
    const dx = mx - this.x;
    const dy = my - this.y;
    return dx * dx + dy * dy <= this.radius * this.radius;
  }
  
  /**
   * Start dragging this coin
   * @param {number} mx - Mouse X position
   * @param {number} my - Mouse Y position
   */
  startDrag(mx, my) {
    this.dragging = true;
    this.offsetX = this.x - mx;
    this.offsetY = this.y - my;
  }
  
  /**
   * Stop dragging this coin
   */
  stopDrag() {
    this.dragging = false;
  }
  
  /**
   * Update coin position during drag
   * @param {number} mx - Mouse X position
   * @param {number} my - Mouse Y position
   * @param {number} minX - Minimum X boundary
   * @param {number} maxX - Maximum X boundary
   * @param {number} minY - Minimum Y boundary
   * @param {number} maxY - Maximum Y boundary
   */
  updateDrag(mx, my, minX, maxX, minY, maxY) {
    if (this.dragging) {
      // Update position based on mouse and offset
      this.x = Math.max(minX + this.radius, Math.min(maxX - this.radius, mx + this.offsetX));
      this.y = Math.max(minY + this.radius, Math.min(maxY - this.radius, my + this.offsetY));
      
      // Slowly rotate the coin when dragging
      this.rotation += 0.02;
    }
  }
  
  /**
   * Applies force to the coin (when pushed by another coin)
   * @param {number} fx - Force in X direction
   * @param {number} fy - Force in Y direction
   */
  applyForce(fx, fy) {
    this.vel.x += fx;
    this.vel.y += fy;
  }
  
  /**
   * Update physics of the coin
   * @param {number} minX - Minimum X boundary
   * @param {number} maxX - Maximum X boundary
   * @param {number} minY - Minimum Y boundary
   * @param {number} maxY - Maximum Y boundary
   */
  update(minX, maxX, minY, maxY) {
    if (!this.dragging) {
      // Apply velocity
      this.x += this.vel.x;
      this.y += this.vel.y;
      
      // Apply friction
      this.vel.mult(0.9);
      
      // Check boundary collisions
      if (this.x < minX + this.radius) {
        this.x = minX + this.radius;
        this.vel.x *= -0.7;
      } else if (this.x > maxX - this.radius) {
        this.x = maxX - this.radius;
        this.vel.x *= -0.7;
      }
      
      if (this.y < minY + this.radius) {
        this.y = minY + this.radius;
        this.vel.y *= -0.7;
      } else if (this.y > maxY - this.radius) {
        this.y = maxY - this.radius;
        this.vel.y *= -0.7;
      }
    }
  }
}