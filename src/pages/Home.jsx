import React, { useLayoutEffect, useRef, useEffect } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useNavigate } from 'react-router-dom';
import FavCard from '../components/styleCard/favCard';
import Marquee from './marque';
import Video from '../components/Video';

import { VelocityText } from '../components/VelocityText';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const navigate = useNavigate();
  const h1Ref = useRef(null);
  const pageRef = useRef(null);
  const contentRef = useRef(null);
  const tiltRef = useRef(null);

  // Apply VanillaTilt if available
  useEffect(() => {
    if (tiltRef.current && window.VanillaTilt) {
      window.VanillaTilt.init(tiltRef.current, {
        reverse: true,
      });
    }
  }, []);


  // Scroll-based animations
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pageRef.current,
          start: "top top",
          end: "100%",
          scrub: 2,
          pin: true,
        },
      });

      tl.to(h1Ref.current, {
        xPercent: -150,
        fontWeight: "100",
        ease: "none",
      });

      gsap.to(contentRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={pageRef}
      className="page-1 min-h-[200vh] w-full py-0 overflow-hidden relative flex flex-col"
    >
      {/* Animated H1 Section */}
      <div className="h-[90vh] flex items-center justify-start pl-6 md:pl-8 mb-16">
        <h1
          ref={h1Ref}
          style={{
            fontFamily: "HeadingNow",
            fontSize: "40vw",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            fontStretch: "250%",
            overflow: "hidden",
            fontWeight: 900,
            lineHeight: 1.2,
          }}
          className="text-hover"
        >
          we build
        </h1>
      </div>

      {/* Text and Image Content Section */}
      <div
        ref={contentRef}
        style={{
          opacity: 0,
          transform: "translateY(50px)",
        }}
        className="content 
        flex flex-col-reverse lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-8 gap-12 md:gap-20"
      >
        {/* Left: Text */}
        <div className="left flex-1">
          <h1
            className="font-bold mb-3 whitespace-nowrap overflow-hidden leading-[1.2]"
            style={{
              fontFamily: "HeadingNow",
              fontStretch: "200%",
              fontWeight: 600,
              fontSize: "clamp(24px, 6vw, 48px)",
            }}
          >
            Welcome to the <span className="text-[#B9CEE1]">Ultimate</span> Blogging Experience
          </h1>
          <p className="mb-5 text-gray-600 text-sm md:text-lg leading-relaxed">
            Dive into a world of ideas, stories, and inspiration.
            Discover articles from passionate writers, share your thoughts, and connect with a community that loves to read and write as much as you do.
            <i> Start your journey today!</i>
          </p>
          <button
            style={{
              fontFamily: "HeadingNow",
              fontStretch: "200%",
              fontWeight: 600,
              lineHeight: 1.2,
              fontSize: "clamp(14px, 2vw, 20px)",
            }}
            className="whitespace-nowrap overflow-hidden rounded-2xl border-2 border-dashed border-black bg-[#DBEAFE] px-4 py-2 md:px-6 md:py-3 font-semibold uppercase text-black transition-all duration-300 hover:-translate-x-1 hover:-translate-y-1 hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-0 active:translate-y-0 active:rounded-2xl active:shadow-none"
            onClick={() => navigate('/all-posts')}
          >
            Explore Now
          </button>
        </div>

        {/* Right: Rotating Image */}
        <div className="right flex-1 w-full">
          <img
            ref={tiltRef}
            src="https://ifitt.net/wp-content/uploads/2023/07/IFITT-Individual-membership.png"
            alt="platform"
            className="w-full h-auto rounded-lg shadow-lg object-cover tilt-element"
          />
        </div>
      </div>

      {/* Video Section */}
      <Video />

      {/* Marquee Section */}
      <div>
        <Marquee />
      </div>

      {/* Favorite Cards Section */}
      <FavCard />

    </div>
  );
}

export default Home;
