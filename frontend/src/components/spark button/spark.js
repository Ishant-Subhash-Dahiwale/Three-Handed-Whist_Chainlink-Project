import React, { useEffect, useRef } from "react";
import "./sparks.css";

const SPARK_ELEMENT_WIDTH = 30;
const DISTANCE = 40;
const RANDOMNESS_ON = true;

const createTransformSteps = (...steps) => {
  if (steps.length === 0) {
    throw new Error("arguments to createTransformSteps should never be empty!");
  }

  const outputSteps = [steps.shift()];
  steps.forEach((step, i) => {
    outputSteps.push(`${outputSteps[i]} ${step}`);
  });

  return outputSteps;
};

const dynamicAnimation = (styleSheet, name, rotation) => {
  const randomDist = RANDOMNESS_ON
    ? Math.floor((Math.random() - 0.5) * DISTANCE * 0.7)
    : 0;

  const [s1, s2, s3] = createTransformSteps(
    `translate(-50%, -50%) rotate(${rotation}deg) translate(10px, 0px)`,
    `translate(${DISTANCE + randomDist}px, 0px) scale(0.5, 0.5)`,
    `translate(${SPARK_ELEMENT_WIDTH / 2}px, 0) scale(0, 0)`
  );

  styleSheet.insertRule(
    `@keyframes ${name} {
     0% {
       transform: ${s1};
     }
     70% {
       transform: ${s2};
     }
     100% {
       transform: ${s3};
     }
  }`,
    styleSheet.cssRules.length
  );
};

const  Spark = () => {
  const styleSheetRef = useRef(null);

  useEffect(() => {
    if (!styleSheetRef.current) {
      const styleSheet = document.createElement("style");
      styleSheet.type = "text/css";
      document.head.appendChild(styleSheet);
      styleSheetRef.current = styleSheet.sheet;
    }
  }, []);

  const makeSpark = (center, rotation) => {
    const div = document.createElement("div");
    const aniName = `disappear_${rotation}`;
    dynamicAnimation(styleSheetRef.current, aniName, rotation);

    div.classList.add("spark");
    div.style.left = `${center.x}px`;
    div.style.top = `${center.y}px`;
    div.style.animation = `${aniName} 500ms ease-out both`;
    document.body.append(div);
    setTimeout(() => {
      document.body.removeChild(div);
    }, 1000);
  };

  const makeBurst = (center) => {
    for (let i = 0; i < 8; i++) {
      const randomSpace = RANDOMNESS_ON
        ? Math.floor(-17 + Math.random() * 34)
        : 0;
      makeSpark(center, 45 * i + randomSpace);
    }
  };

  const handleClick = (e) => {
    const center = { x: e.pageX, y: e.pageY };
    makeBurst(center);
  };

  return (
    <div className="containers">
      <button id="btns" onClick={handleClick}>
        Spark!
      </button>
    </div>
  );
};

export default Spark;
