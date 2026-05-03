import React from "react";
import { useParams } from "react-router";

const About = () => {
  let { id } = useParams();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-xl text-center">
        
        <h1 className="text-4xl font-bold mb-4">
          Product Details
        </h1>

        <p className="text-gray-300 text-lg">
          Viewing product ID:
        </p>

        <span className="text-purple-400 text-2xl font-semibold">
          {id}
        </span>

      </div>
    </div>
  );
};

export default About;