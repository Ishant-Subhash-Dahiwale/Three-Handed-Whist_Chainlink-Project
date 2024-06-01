import React, { useState, useEffect, useRef } from 'react';
import p5 from 'p5';
import 'p5/lib/addons/p5.sound'; // Ensure you have p5.sound library

const SoundButton = () => {
  const [sound, setSound] = useState(null);
  const soundRef = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      p.preload = () => {
        soundRef.current = p.loadSound('./cardbtn.mp3');
      };
    };

    new p5(sketch);

    return () => {
      if (soundRef.current) {
        soundRef.current.remove(); // Cleanup p5 instance on component unmount
      }
    };
  }, []);

  const handleClick = () => {
    if (soundRef.current) {
      soundRef.current.play();
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Play Sound</button>
    </div>
  );
};

export default SoundButton;
