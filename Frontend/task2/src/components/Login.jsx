function Login({ setToggle }) {
  return (
    <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold text-center text-slate-900 mb-1">
        WELCOME BACK
      </h2>
      <p className="text-center text-slate-400 text-sm mb-7">Sign in to your account</p>

      <div className="flex flex-col gap-5">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Email
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:border-slate-400 transition"
          />
        </div>

        <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-xl transition mt-1">
          Sign in
        </button>
      </div>

      <p className="text-center text-slate-400 text-sm mt-5">
        Don't have an account?{" "}
        <span
          className="text-slate-900 font-semibold cursor-pointer hover:underline"
          onClick={() => setToggle((prev) => !prev)}
        >
          Sign up
        </span>
      </p>
    </div>
  );
}

export default Login;