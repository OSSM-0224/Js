import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center text-white">
      <div className="w-full max-w-md px-6">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black font-bold">
            S
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center mb-8 leading-tight">
          Sign up to <br /> start listening
        </h1>

        {/* Input */}
        <div className="mb-4">
          <label className="text-sm text-gray-300 block mb-2">
            Email address
          </label>
          <input
            type="email"
            placeholder="name@domain.com"
            className="w-full bg-black border border-gray-600 rounded-md px-4 py-3 focus:outline-none focus:border-white"
          />
        </div>

        {/* Primary Button */}
        <button className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-full transition">
          Next
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Social Buttons */}
        <div className="space-y-3">
          <button className="w-full border border-gray-600 py-3 rounded-full flex items-center justify-center gap-3 hover:border-white transition">
            📱 Sign up with phone number
          </button>

          <button className="w-full border border-gray-600 py-3 rounded-full flex items-center justify-center gap-3 hover:border-white transition">
            🌐 Sign up with Google
          </button>

          <button className="w-full border border-gray-600 py-3 rounded-full flex items-center justify-center gap-3 hover:border-white transition">
            🍎 Sign up with Apple
          </button>
        </div>

        {/* Bottom Text */}
        <p className="text-center text-gray-400 text-sm mt-8">
          Already have an account?
        </p>
        <p className="text-center mt-2">
          <span className="font-semibold hover:underline cursor-pointer">
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;