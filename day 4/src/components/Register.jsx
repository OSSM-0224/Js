function Register({ setToggle }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-2 text-center">Create account</h2>
      <p className="text-center text-gray-500 mb-6">Join us today</p>

      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button className="bg-gray-900 text-white p-3 rounded-lg mt-2 hover:bg-black transition">
          Sign up
        </button>
      </form>

      <p className="text-center text-gray-500 mt-4">
        Already have an account?{" "}
        <span
          className="text-blue-500 cursor-pointer"
          onClick={() => setToggle(prev => !prev)}
        >
          Sign in
        </span>
      </p>
    </div>
  );
}

export default Register;