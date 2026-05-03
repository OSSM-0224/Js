import React from "react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-xl text-center w-[400px]">
        
        <h1 className="text-3xl font-bold mb-6">
          Contact Us 📩
        </h1>

        <div className="space-y-4 text-gray-300">
          <p>Email: support@luxe.com</p>
          <p>Phone: +91 9876543210</p>
        </div>

      </div>
    </div>
  );
};

export default Contact;