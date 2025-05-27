import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

function StretchyCurve() {
  const containerRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const path = pathRef.current;

    const initialPath = `M 30 100 Q 500 100 970 100`; // Start with some padding (30px on left, 30px on right)
    const finalPath = `M 30 100 Q 500 100 970 100`;

    const handleMouseMove = (e) => {
      const bounds = container.getBoundingClientRect();
      const x = (e.clientX - bounds.left) * (940 / bounds.width) + 30; // Stretch inside 30-970
      const y = (e.clientY - bounds.top) * (200 / bounds.height); // normal stretch vertically

      const updatedPath = `M 30 100 Q ${x} ${y} 970 100`;

      gsap.to(path, {
        attr: { d: updatedPath },
        duration: 1,
        ease: "elastic.out(1, 0.25)", // Smooth bounce
      });
    };

    const handleMouseLeave = () => {
      gsap.to(path, {
        attr: { d: finalPath },
        duration: 1,
        ease: "elastic.out(1, 0.25)",
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-[15vw] px-2 overflow-hidden"> 
      <svg
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path
          ref={pathRef}
          d="M 30 100 Q 500 100 970 100"
          stroke="black"
          fill="transparent"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

export default StretchyCurve;
