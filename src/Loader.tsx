import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Text or Logo */}
      <div className="relative text-center">
        {/* <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 animate-pulse drop-shadow-lg">
          Loading...
        </h1> */}
      </div>
    </div>
  );
};

export default Loader;
