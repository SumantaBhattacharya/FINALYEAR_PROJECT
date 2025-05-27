import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from "framer-motion";
import React, { useRef } from "react";

export const VelocityText = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"],
  });

  const xRaw = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const x = useSpring(xRaw, { mass: 2, stiffness: 300, damping: 50 });

  const scrollVelocity = useVelocity(scrollYProgress);
  const skewXRaw = useTransform(scrollVelocity, [-1, 1], ["10deg", "-10deg"]);
  const skewX = useSpring(skewXRaw, { mass: 2, stiffness: 300, damping: 40 });

  return (
    <div
      ref={containerRef}
      className="h-[50vh] w-full overflow-y-scroll border rounded-md bg-gray-400"
    >
      <div className="relative h-[1500px]">
        <div className="sticky top-0 h-[50vh] flex items-center overflow-hidden">
          <motion.div
            style={{ x, skewX }}
            className="whitespace-nowrap px-10"
          >
            <p
              className="text-4xl md:text-9xl font-black uppercase leading-tight tracking-tight origin-bottom-left"
              style={{
                fontFamily: "HeadingNow",
                whiteSpace: "nowrap",
                fontStretch: "350%",
                overflow: "hidden",
                fontWeight: 900,
                lineHeight: 1.2,
              }}
            >
              Share Your Thoughts and Stories. Inspire the World. Build Your Blog
              
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
