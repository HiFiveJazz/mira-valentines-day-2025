import React, { useEffect, useRef, useState } from 'react';
import './poem.css';

const poem = () => {
  const dividerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.7, // Trigger when 10% of the element is visible
      }
    );

    if (dividerRef.current) {
      observer.observe(dividerRef.current);
    }

    return () => {
      if (dividerRef.current) {
        observer.unobserve(dividerRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`subdivider-container ${isVisible ? 'visible' : 'hidden'}`}
      ref={dividerRef}
    >
      <div className="poem-content">
        <p>First date at Target, laughing around</p>
        <p>We teased, we joked, my clumsy self around</p>
        <div className="stanza"></div>
        <p>Time after time, we share sushi delight,</p>
        <p>Your presence warms me from morning 'til night.</p>
        <div className="stanza"></div>
        <p>We soared on ice, your skill swiftly grew;</p>
        <p>In minutes, you glided as though you always knew</p>
        <div className="stanza"></div>
        <p>While you roam Vietnam, my thoughts remain true</p>
        <p>I count every day 'til I next meet you.</p>
        <div className="stanza"></div>
        <p>Your eyes outshine Minnesota's starry night sky,</p>
        <p>Their dark hazel hue meet mine, mystified.</p>
        <div className="stanza"></div>
        <p>Your smile and affection, hair of obsidian glow,</p>
        <p>I miss and I crave, the Juliet to my Romeo.</p>
        <div className="stanza"></div>
        <p>With that being said, one question remains of mine,</p>
        <p>I ask with hope: Will you be my Valentine?</p>
        <p></p>
      </div>
    </div>
  );
};

export default poem;

