import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const Snowflakes = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let snowflakes = []; // array to hold snowflake objects

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.fill(240);
        p.noStroke();
      };

      p.draw = () => {
        p.background('brown');
        let t = p.frameCount / 60; // update time

        // create a random number of snowflakes each frame
        for (let i = 0; i < p.random(5); i++) {
          snowflakes.push(new Snowflake(p)); // append snowflake object
        }

        // loop through snowflakes with a for..of loop
        for (let flake of snowflakes) {
          flake.update(t); // update snowflake position
          flake.display(); // draw snowflake
        }
      };

      // snowflake class
      class Snowflake {
        constructor(p) {
          // initialize coordinates
          this.posX = 0;
          this.posY = p.random(-50, 0);
          this.initialangle = p.random(0, 2 * p.PI);
          this.size = p.random(2, 5);

          // radius of snowflake spiral
          // chosen so the snowflakes are uniformly spread out in area
          this.radius = p.sqrt(p.random(p.pow(p.width / 2, 2)));
        }

        update(time) {
          // x position follows a circle
          let w = 0.6; // angular speed
          let angle = w * time + this.initialangle;
          this.posX = p.width / 2 + this.radius * p.sin(angle);

          // different size snowflakes fall at slightly different y speeds
          this.posY += p.pow(this.size, 0.5);

          // delete snowflake if past end of screen
          if (this.posY > p.height) {
            let index = snowflakes.indexOf(this);
            snowflakes.splice(index, 1);
          }
        }

        display() {
          p.ellipse(this.posX, this.posY, this.size);
        }
      }
    };

    const p5Instance = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return (
    <div>
      <div ref={sketchRef} style={{ position: 'fixed', zIndex: -1, width: '700vh', height: '200vh' }}></div>
    </div>
  );
};

export default Snowflakes;
