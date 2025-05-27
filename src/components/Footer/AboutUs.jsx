import React from "react";
import { Link } from 'react-router-dom';
const AboutUs = () => {
  const experienceData = [
    { label: "Years Experience in React", value: "2+" },
    { label: "Years Experience in JavaScript", value: "3+" },
    { label: "Years Experience in HTML", value: "3+" },
    { label: "Years Experience in Tailwind", value: "2+" },
  ];

  return (
    <section id="about" className="py-20 md:px-20 lg:px-20 ">
      <div className="container mx-auto px-4">
        <div className="mb-12">
          {/* Heading */}
          <h2
            className="text-black-400 text-[10vw] mb-2" data-aos="fade-down"
            style={{
              fontFamily: "HeadingNow",
              whiteSpace: "nowrap",
              fontStretch: "200%",
              overflow: "hidden",
              fontWeight: 600,
              lineHeight: 1.2,
              marginTop: 0,
            }}
          >

            About Us
          </h2>
          <h3
            className="mb-4 text-3xl font-bold text-white section-title"
            data-aos="fade-down"
          >
            Capturing Moments That Last Forever
          </h3>
          <p className="mb-8 max-w-3xl text-gray-400" data-aos="fade-down">
            With years of experience in blog application,
            we've mastered the art of storytelling through our website. Our passion
            lies in capturing authentic moments and turning them into timeless
            memories.
          </p>

          {/* About Cards Section */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {experienceData.map((item, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-800 bg-[#1A1A1A] p-6 text-center"
              >
                <h4 className="mb-2 text-3xl font-bold text-gray-300">
                  {item.value}
                </h4>
                <p className="text-gray-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons Section */}
        <div
          className="flex flex-col sm:flex-row items-center gap-4 mt-8"
          data-aos="fade-up"
        >
          <a
            href="#team"
            className="cursor-pointer rounded-full bg-gray-600 hover:bg-gray-700 text-white py-3 px-8"
          >
            Meet Our Team
          </a>
          <Link 
          className="cursor-pointer rounded-full border-2 py-3 px-8 border-white text-white hover:bg-white hover:text-gray-900 transition duration-300 ease-in-out"
          to="/contact">
            Contact Us
          </Link>
          
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
