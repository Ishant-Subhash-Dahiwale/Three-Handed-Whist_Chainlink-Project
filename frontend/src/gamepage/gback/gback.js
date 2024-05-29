import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const Gback = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let cards = [];
      let symbols = ['♥', '♦', '♣', '♠'];
      let symbolColors = {
        '♥': '#ff0000', // red for hearts
        '♦': '#ff0000', // red for diamonds
        '♣': '#000000', // black for clubs
        '♠': '#000000'  // black for spades
      };
      let draggedCard = null;
      let offsetX, offsetY;

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(32);
        p.noCursor();
        
        // Initialize card objects with random positions, speeds, and symbols
        for (let i = 0; i < 10; i++) {
          let card = {
            x: p.random(p.width),
            y: p.random(p.height),
            w: 50,
            h: 75,
            speedY: p.random(1, 3),
            angle: p.random(-0.05, 0.05),
            symbol: p.random(symbols),
            beingDragged: false
          };
          cards.push(card);
        }
      };

      p.draw = () => {
        p.background(18, 18, 18);
        p.fill(255, 255, 255, 50);
        p.noStroke();

        // Draw and animate each card
        for (let card of cards) {
          p.push();
          p.translate(card.x, card.y);
          p.rotate(card.angle);
          p.fill(255, 255, 255, 50);
          p.rect(0, 0, card.w, card.h, 10);

          // Draw the symbol on the card
          p.fill(symbolColors[card.symbol]);
          p.text(card.symbol, card.w / 2, card.h / 2);
          p.pop();
          
          if (!card.beingDragged) {
            card.y += card.speedY;
            card.angle += p.random(-0.01, 0.01);

            // Reset card position when it goes off screen
            if (card.y > p.height + card.h) {
              card.y = -card.h;
              card.x = p.random(p.width);
              card.angle = p.random(-0.05, 0.05);
              card.symbol = p.random(symbols); // Assign a new random symbol
            }
          }
        }
      };

      p.mousePressed = () => {
        for (let card of cards) {
          let d = p.dist(p.mouseX, p.mouseY, card.x, card.y);
          if (d < card.w / 2 && d < card.h / 2) {
            draggedCard = card;
            offsetX = p.mouseX - card.x;
            offsetY = p.mouseY - card.y;
            card.beingDragged = true;
            break;
          }
        }
      };

      p.mouseDragged = () => {
        if (draggedCard) {
          draggedCard.x = p.mouseX - offsetX;
          draggedCard.y = p.mouseY - offsetY;
        }
      };

      p.mouseReleased = () => {
        if (draggedCard) {
          draggedCard.beingDragged = false;
          draggedCard = null;
        }
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return (
    <div ref={sketchRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}></div>
  );
};

export default Gback;
