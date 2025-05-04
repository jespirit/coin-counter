# Canadian Coin Counter Game

An interactive p5.js game where players count Canadian coins on the screen and test their money-counting skills.

## Description

This game simulates a collection of Canadian coins (toonies, loonies, quarters, dimes, and nickels) scattered on a surface. Players can:
- Move coins by dragging them around
- Rotate coins to see their value
- Count the total value and enter their answer
- Check how close they are to the correct total

The game features realistic physics simulation where coins interact with each other and the boundaries of the playing area, similar to moving coins on a real tabletop.

## Gameplay Instructions

1. When the game starts, a random number of Canadian coins will appear on the screen
2. Click and drag to move coins around (they will push other coins realistically)
3. Use keyboard shortcuts to adjust your count:
   - Arrow Up/Down: Add/subtract a nickel (5¢)
   - Arrow Right/Left: Add/subtract a quarter (25¢)
   - 1 / Q: Add/subtract a loonie ($1)
   - 2 / W: Add/subtract a toonie ($2)
   - D / S: Add/subtract a dime (10¢)
4. Press 'R' to rotate the currently selected coin
5. Click "Check Answer" or press 'C' to see if your count is correct
6. Click "New Game" or press 'N' to start a new round

## Canadian Coin Values

- Toonie: $2.00 (silver and gold)
- Loonie: $1.00 (gold color)
- Quarter: $0.25 (silver)
- Dime: $0.10 (silver)
- Nickel: $0.05 (silver)

## Technical Details

This project is built with:
- p5.js for rendering and input handling
- ES6 JavaScript with modular architecture
- Responsive design that adjusts to window size

## Project Structure

```
coin-counter/
├── index.html            # Main HTML page
├── style.css             # CSS styling
├── sketch.js             # Main p5.js entry point
├── classes/              # ES6 classes
│   ├── Coin.js           # Coin object with physics
│   └── Game.js           # Game management logic
├── utils/                # Utility modules
│   ├── canvasHelpers.js  # Canvas and UI utilities
│   └── mathHelpers.js    # Math and physics helpers
├── assets/               # Game assets
│   └── images/           # Coin images
│       ├── toonie.svg    # $2 coin image
│       ├── loonie.svg    # $1 coin image
│       ├── quarter.svg   # 25¢ coin image
│       ├── dime.svg      # 10¢ coin image
│       └── nickel.svg    # 5¢ coin image
└── libs/                 # External libraries
    └── p5.min.js         # p5.js library
```

## Running the Game

1. Clone this repository
2. Open index.html in a web browser, or
3. Use a local server:
   - With Python: `python -m http.server`
   - With Node.js: `npx serve`
   - With VS Code: Use the Live Server extension

## Learning Goals

This game helps players:
- Learn to recognize Canadian coins
- Practice counting money
- Develop quick mental addition skills
- Understand the relative values of different coins