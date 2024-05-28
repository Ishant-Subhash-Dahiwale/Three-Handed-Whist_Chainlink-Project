import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const PenroseLSystemSketch = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      let ds;

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        ds = new PenroseLSystem(p);
        // Please, play around with the following line
        ds.simulate(5);
      };

      p.draw = () => {
        p.background(0);
        ds.render();
      };

      class PenroseLSystem {
        constructor(p) {
          this.p = p;
          this.steps = 0;
          // These are axiom and rules for the Penrose rhombus L-system
          // A reference would be cool, but I couldn't find a good one
          this.axiom = "[X]++[X]++[X]++[X]++[X]";
          this.ruleW = "YF++ZF----XF[-YF----WF]++";
          this.ruleX = "+YF--ZF[---WF--XF]+";
          this.ruleY = "-WF++XF[+++YF++ZF]-";
          this.ruleZ = "--YF++++WF[+ZF++++XF]--XF";
          // Please play around with the following two lines
          this.startLength = 460.0;
          this.theta = p.TWO_PI / 10.0; // 36 degrees, try TWO_PI / 6.0, ...
          this.reset();
        }

        simulate(gen) {
          while (this.getAge() < gen) {
            this.iterate();
          }
        }

        reset() {
          this.production = this.axiom;
          this.drawLength = this.startLength;
          this.generations = 0;
        }

        getAge() {
          return this.generations;
        }

        // Apply substitution rules to create new iteration of production string
        iterate() {
          let newProduction = "";

          for (let i = 0; i < this.production.length; ++i) {
            let step = this.production.charAt(i);
            // If current character is 'W', replace current character
            // by corresponding rule
            if (step === 'W') {
              newProduction = newProduction + this.ruleW;
            } else if (step === 'X') {
              newProduction = newProduction + this.ruleX;
            } else if (step === 'Y') {
              newProduction = newProduction + this.ruleY;
            } else if (step === 'Z') {
              newProduction = newProduction + this.ruleZ;
            } else {
              // Drop all 'F' characters, don't touch other
              // characters (i.e. '+', '-', '[', ']'
              if (step !== 'F') {
                newProduction = newProduction + step;
              }
            }
          }

          this.drawLength = this.drawLength * 0.5;
          this.generations++;
          this.production = newProduction;
        }

        // Convert production string to a turtle graphic
        render() {
          this.p.translate(this.p.width / 2, this.p.height / 2);

          this.steps += 20;
          if (this.steps > this.production.length) {
            this.steps = this.production.length;
          }

          for (let i = 0; i < this.steps; ++i) {
            let step = this.production.charAt(i);

            // 'W', 'X', 'Y', 'Z' symbols don't actually correspond to a turtle action
            if (step === 'F') {
              this.p.stroke(255, 500);
              for (let j = 0; j < this.repeats; j++) {
                this.p.line(0, 0, 0, -this.drawLength);
                this.p.noFill();
                this.p.translate(0, -this.drawLength);
              }
              this.repeats = 1;
            } else if (step === '+') {
              this.p.rotate(this.theta);
            } else if (step === '-') {
              this.p.rotate(-this.theta);
            } else if (step === '[') {
              this.p.push();
            } else if (step === ']') {
              this.p.pop();
            }
          }
        }
      }
    };

    const p5Instance = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.remove();
    };
  }, []);

  return <div ref={sketchRef} style={{ position: 'fixed', zIndex: -1, width: '100%' }}></div>;
};

export default PenroseLSystemSketch;
