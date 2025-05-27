import React, { useEffect } from 'react';
import gsap from 'gsap';

const Marquee = () => {
  useEffect(() => {
    const handleWheel = (event) => {
      if (event.deltaY > 0) {
        gsap.to(".marquee-item", {
          x: "-200%",
          repeat: -1,
          duration: 3,
          ease: "none",
          willChange: "transform",
        });
        gsap.to(".marquee-item img", {
          rotate: 180,
        });
      } else {
        gsap.to(".marquee-item", {
          x: "0%",
          repeat: -1,
          duration: 3,
          ease: "none",
          willChange: "transform",
        });
        gsap.to(".marquee-item img", {
          rotate: 0,
        });
      }
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="relative py-10 md:py-20 overflow-hidden bg-[#9CA3AF] mt-0">
      <div className="flex overflow-x-hidden whitespace-nowrap">
        {Array(5).fill(0).map((_, idx) => (
          <div
            key={idx}
            className="marquee-item flex items-center shrink-0 gap-4 md:gap-6 mr-6 md:mr-12 transform -translate-x-full"
          >
            <h1 className="text-[10vw] md:text-[5vw] font-extrabold uppercase tracking-tight leading-none">
              Thrive Beyond Limits
            </h1>
            <img
              src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg"
              alt="Creative Branding and Webdesign Agency Amsterdam"
              className="w-[8vw] h-[8vw] md:w-[5vw] md:h-[5vw]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
