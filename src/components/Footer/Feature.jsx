import React from "react";

function Feature() {
  return (
    <div className="pb-16" >
      {/* Code block starts */}
      <section className="max-w-8xl mx-auto container bg-gray-300 mt-8 rounded-xl pt-16">
        <div>
          <div
            role="contentinfo"
            className="flex items-center flex-col px-4"
          >
            <p
              tabIndex={0}
              className="focus:outline-none uppercase text-sm text-center text-gray-600 leading-4"
            >
              start your journey
            </p>
            <h1
              tabIndex={0}
              className="focus:outline-none text-3xl lg:text-3xl font-extrabold text-center leading-10 text-gray-800 lg:w-5/12 md:w-9/12 pt-4"
              style={{
                fontFamily: "HeadingNow",
                // fontSize: "4vw",
                whiteSpace: "nowrap",
                fontStretch: "300%",
                overflow: "hidden",
                fontWeight: 600,
                lineHeight: 1.2,
                marginTop: 0,
              }}
            >
              Share Your Stories Through Our Blog Platform
            </h1>
          </div>

          <div
            tabIndex={0}
            aria-label="group of cards"
            className="focus:outline-none mt-20 flex flex-wrap justify-center gap-10 px-4"
          >
            {/* Card 1 */}
            <div
              tabIndex={0}
              aria-label="card 1"
              className="focus:outline-none flex sm:w-full md:w-5/12 pb-20"
            >
              <div className="w-20 h-20 relative mr-5">
                <div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
                <div className="absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG1.svg"
                    alt="editor"
                  />
                </div>
              </div>
              <div className="w-10/12">
                <h2 className="text-3xl font-bold leading-tight text-gray-800"
                  style={{
                    fontFamily: "HeadingNow",
                    // fontSize: "4vw",
                    whiteSpace: "nowrap",
                    fontStretch: "300%",
                    overflow: "hidden",
                    fontWeight: 600,
                    lineHeight: 1.2,
                    marginTop: 0,
                  }}>
                  Easy Content Editor
                </h2>
                <p className="text-base text-gray-600 leading-normal pt-2">
                  Write, format, and publish your posts using a powerful yet intuitive editor designed for creators.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div
              tabIndex={0}
              aria-label="card 2"
              className="focus:outline-none flex sm:w-full md:w-5/12 pb-20"
            >
              <div className="w-20 h-20 relative mr-5">
                <div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
                <div className="absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG2.svg"
                    alt="community"
                  />
                </div>
              </div>
              <div className="w-10/12">
                <h2 className="text-3xl font-semibold leading-tight text-gray-800"
                  style={{
                    fontFamily: "HeadingNow",
                    // fontSize: "4vw",
                    whiteSpace: "nowrap",
                    fontStretch: "300%",
                    overflow: "hidden",
                    fontWeight: 600,
                    lineHeight: 1.2,
                    marginTop: 0,
                  }}>
                  Built-in Comment System
                </h2>
                <p className="text-base text-gray-600 leading-normal pt-2">
                  Engage with your readers through blogs, and build a thriving blog community.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div
              tabIndex={0}
              aria-label="card 3"
              className="focus:outline-none flex sm:w-full md:w-5/12 pb-20"
            >
              <div className="w-20 h-20 relative mr-5">
                <div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
                <div className="absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG3.svg"
                    alt="responsive"
                  />
                </div>
              </div>
              <div className="w-10/12">
                <h2 className="text-3xl font-semibold leading-tight text-gray-800"
                  style={{
                    fontFamily: "HeadingNow",
                    // fontSize: "4vw",
                    whiteSpace: "nowrap",
                    fontStretch: "300%",
                    overflow: "hidden",
                    fontWeight: 600,
                    lineHeight: 1.2,
                    marginTop: 0,
                  }}
                >
                  Fully Responsive Design
                </h2>
                <p className="text-base text-gray-600 leading-normal pt-2">
                  blogs will look beautiful and functions flawlessly on all devices, whether desktop or mobile.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div
              tabIndex={0}
              aria-label="card 4"
              className="focus:outline-none flex sm:w-full md:w-5/12 pb-20"
            >
              <div className="w-20 h-20 relative mr-5">
                <div className="absolute top-0 right-0 bg-indigo-100 rounded w-16 h-16 mt-2 mr-1" />
                <div className="absolute text-white bottom-0 left-0 bg-indigo-700 rounded w-16 h-16 flex items-center justify-center mt-2 mr-3">
                  <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/icon_and_text-SVG4.svg"
                    alt="analytics"
                  />
                </div>
              </div>
              <div className="w-10/12">
                <h2 className="text-3xl font-semibold leading-tight text-gray-800"
                  style={{
                    fontFamily: "HeadingNow",
                    // fontSize: "4vw",
                    whiteSpace: "nowrap",
                    fontStretch: "300%",
                    overflow: "hidden",
                    fontWeight: 600,
                    lineHeight: 1.2,
                    marginTop: 0,
                  }}>
                  Analytics & Insights
                </h2>
                <p className="text-base text-gray-600 leading-normal pt-2">
                  Track how your blog is performing with real-time data and analytics to grow your audience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Code block ends */}
    </div>
  );
}

export default Feature;
