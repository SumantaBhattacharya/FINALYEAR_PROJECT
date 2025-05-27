import React from 'react';

const Video = () => {
  return (
    <div className="video flex justify-center items-center mt-10 sm:mt-16">
      <video 
        className="w-full h-auto sm:h-[80%] p-[1vw_2vw] rounded-[4%] object-cover" 
        autoPlay loop muted>
        <source
          src="https://videos.pexels.com/video-files/6774633/6774633-uhd_3840_2160_30fps.mp4"
          type="video/mp4"
        />
        <track kind="captions" label="En" src="captions.vtt" />
      </video>
    </div>
  );
};

export default Video;
