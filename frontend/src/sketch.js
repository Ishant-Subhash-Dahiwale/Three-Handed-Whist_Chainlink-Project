import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const AceOfDiamondsSketch = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let font;
      const cardWidth = 200;
      const cardHeight = 300;
      let angle = 0;
      let yPos = -300;
      const suits = ['♥', '♦', '♣', '♠'];
      const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
      const colors = {
        '♥': '#FF0000',
        '♦': '#FF0000',
        '♣': '#000000',
        '♠': '#000000'
      };
      const goldColor = '#FFD700';
      let fallingCards = [];
      let stars = [];

      p.preload = () => {
        font = p.loadFont('./Arial.ttf'); // Using a local font for simplicity
      };

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight, p.WEBGL);
        p.textFont(font);

        // Create falling cards
        for (let i = 0; i < 50; i++) {
          let suit = suits[Math.floor(Math.random() * suits.length)];
          let rank = ranks[Math.floor(Math.random() * ranks.length)];
          fallingCards.push({
            x: p.random(-p.width / 2, p.width / 2),
            y: p.random(-p.height, 0),
            z: p.random(-500, 500),
            width: 50,
            height: 70,
            suit: suit,
            rank: rank,
            color: colors[suit]
          });
        }

        // Create stars for the starfield background
        for (let i = 0; i < 200; i++) {
          stars.push({
            x: p.random(-p.width / 2, p.width / 2),
            y: p.random(-p.height / 2, p.height / 2),
            z: p.random(-500, 500),
            size: p.random(1, 3)
          });
        }
      };

      p.draw = () => {
        p.background(0); // Deep purple background

        // Draw starfield background
        for (let star of stars) {
          p.push();
          p.translate(star.x, star.y, star.z);
          p.noStroke();
          p.fill(255);
          p.sphere(star.size);
          p.pop();
        }

        // Update angle and position for animation
        angle += 0.01;
        yPos += 1;

        // Draw the Ace of Diamonds card with animations
        p.push();
        p.translate(0, yPos, 0);
        p.rotateY(angle);
        p.rotateX(angle / 2);
        drawAceOfDiamonds();
        p.pop();

        // Draw and update falling cards
        for (let card of fallingCards) {
          p.push();
          p.translate(card.x, card.y, card.z);
          p.fill(255);
          p.stroke(goldColor); // Golden border for falling cards
          p.strokeWeight(2);
          p.rect(-card.width / 2, -card.height / 2, card.width, card.height);
          p.fill(card.color);
          p.noStroke();
          p.textSize(16);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(card.suit, 0, -card.height / 4);
          p.text(card.rank, 0, 0);
          p.pop();

          // Update card position
          card.y += 2;
          if (card.y > p.height / 2 + card.height) {
            card.y = -p.height / 2 - card.height;
            card.x = p.random(-p.width / 2, p.width / 2);
          }
        }

        // Reset position if it goes off screen
        if (yPos > p.height / 2 + 200) {
          yPos = -p.height / 2 - 200;
        }
      };

      const drawAceOfDiamonds = () => {
        // Draw card background
        p.fill(255);
        p.stroke(goldColor); // Golden border for the Ace of Diamonds
        p.strokeWeight(4);
        p.rect(-cardWidth / 2, -cardHeight / 2, cardWidth, cardHeight);

        // Draw suit and rank with gold color
        p.fill('#000'); // Gold color for a royal theme
        p.textSize(48);
        p.textAlign(p.CENTER, p.CENTER);
        p.text('♦', 0, -cardHeight / 4);
        p.textSize(32);
        p.text('A', 0, 0);
        p.text('CHAINLINK', 0,  (cardHeight / 4)+10);

        // Draw small suit symbols in corners
        p.textSize(24);
      };
    };

    const p5Instance = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return (
    <div>
      <div ref={sketchRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}></div>
    </div>
  );
};

export default AceOfDiamondsSketch;
