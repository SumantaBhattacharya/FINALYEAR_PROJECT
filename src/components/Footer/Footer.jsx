import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import StretchyCurve from './StretchyCurve'; // ✅ Correct import

gsap.registerPlugin(ScrollToPlugin);

function Footer() {
  const scrollToTop = () => {
    gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: "power2.out" });
  };

  return (
    <section className="relative overflow-hidden pt-0 pb-10 bg-gray-400 mt-7">
      {/* ✅ Use StretchyCurve here */}
      <StretchyCurve />

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="cursor-pointer mb-10 flex items-center justify-center mx-auto w-14 h-14 bg-black text-white rounded-full hover:bg-gray-700 transition-all duration-300"
      >
        <svg
          className="w-5 h-5"  // Adjust size here (e.g., w-6 h-6 for slightly bigger)
          viewBox="0 0 384 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="white"
            d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
          />
        </svg>
      </button>


      {/* Footer Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="-m-6 flex flex-wrap">
          {/* Logo and Copyright */}
          <div className="w-full p-6 md:w-1/2 lg:w-5/12">
            <div className="flex h-full flex-col justify-between">
              <div className="mb-4 inline-flex items-center">
                <Logo width="100px" />
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  &copy; Copyright 2025. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">
                Company
              </h3>
              <ul>
                <li className="mb-4">
                  <Link
                    className="relative text-base font-medium text-gray-900 hover:text-gray-700 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full"
                    to="/features">
                    Features
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="relative text-base font-medium text-gray-900 hover:text-gray-700 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full"
                    to="/about-us">
                    About Us
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="relative text-base font-medium text-gray-900 hover:text-gray-700 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full"
                    to="/links">
                    Social Links
                  </Link>
                </li>
                <li>
                  <Link className="relative text-base font-medium text-gray-900 hover:text-gray-700 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full" to="/customer_testimonials">
                    Customer Testimonials
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Support Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-2/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">
                Support
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className="relative text-base font-medium text-gray-900 hover:text-gray-700 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full" to="/account">
                    Account
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="relative text-base font-medium text-gray-900 hover:text-gray-700 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full" to="
                  /help">
                    Help
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="relative text-base font-medium text-gray-900 hover:text-gray-700 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full" to="/contact">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link className="relative text-base font-medium text-gray-900 hover:text-gray-700 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full"
                    to="/customer-support">
                    Customer Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal Links */}
          <div className="w-full p-6 md:w-1/2 lg:w-3/12">
            <div className="h-full">
              <h3 className="tracking-px mb-9 text-xs font-semibold uppercase text-gray-500">
                Legals
              </h3>
              <ul>
                <li className="mb-4">
                  <Link className="relative text-base font-medium text-gray-900 hover:text-gray-700 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full"
                    to="/terms_and_conditions">
                    Terms &amp; Conditions
                  </Link>
                </li>
                <li className="mb-4">
                  <Link className="relative text-base font-medium text-gray-900 hover:text-gray-700 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full"
                    to="/privacy-policy">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link className="relative text-base font-medium text-gray-900 hover:text-gray-700 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gray-700 after:transition-all after:duration-300 hover:after:w-full"
                    to="/licensing">
                    Licensing
                  </Link>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Footer;
