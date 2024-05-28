// src/P5Sketch.js
import React, { useRef, useEffect } from 'react';
import  p5 from 'p5';

const P5Sketch = () => {
  const sketchRef = useRef();

  useEffect(() => {
    const sketch = (p) => {
      p.setup = () => {
        p.createCanvas( window.innerWidth,window.innerHeight, p.WEBGL);
        p.strokeWeight(1);
  
    };

      p.draw = () => {
        p.background(20);
        // p.rotateY(p.frameCount * 0.01);
 
        for (let j = 0; j < 5; j++) {
          p.push();
          for (let i = 0; i < 40; i++) {
            p.translate(
              p.sin(p.frameCount * 0.0000 + j) * 100,
              p.sin(p.frameCount * 0.00001 + j) * 100,
              i * 0.5
            );
            p.rotateZ(p.frameCount * 0.0009);
            p.push();
            p.box(60,70,6);
            
            p.pop();
          }
          p.pop();
        }

      };

    };

    const p5Instance = new p5(sketch, sketchRef.current);

    return () => {
      p5Instance.remove();
    };
  }, []);

//   return <div ref={sketchRef}></div>;

  return (
    <div>
      <div ref={sketchRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}></div>
    </div>
  );

};

export default P5Sketch;
