import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const { setRegisteredUsers, registeredUsers } = useAuth();
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm({ mode: "onChange" });

  const handleFormSubmit = (data) => {
    setRegisteredUsers([...registeredUsers, data]);
    toast.success("Account created");
    reset();
    navigate("/");
  };

  const fields = [
    { name: "name", label: "Full name", placeholder: "Alex Smith", col: "full" },
    { name: "email", label: "Email address", type: "email", placeholder: "you@example.com", col: "full" },
    { name: "password", label: "Password", type: "password", placeholder: "Min. 8 characters", col: "full" },
  ];

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ fontFamily: "'Montserrat', sans-serif",
        background: "radial-gradient(ellipse at 80% 20%, rgba(120,0,0,0.12), transparent 55%), #080808"
      }}
    >
      <div className="w-full max-w-sm bg-white/[0.03] border border-[#b41e1e]/20 rounded-2xl p-9">
        <p className="text-center text-[18px] font-semibold tracking-[0.4em] text-white/40 mb-7"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          LUX<span className="text-[#cc2222]">E</span>
        </p>
        <h1 className="text-center text-[28px] font-semibold mb-1 text-white"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Create account
        </h1>
        <p className="text-center text-[10px] tracking-[0.15em] uppercase text-white/30 mb-8">
          Join the experience
        </p>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          {fields.map(({ name, label, type = "text", placeholder }) => (
            <div key={name}>
              <label className="block text-[9px] font-semibold tracking-[0.2em] uppercase text-white/30 mb-2">
                {label}
              </label>
              <input
                {...register(name, { required: `${label} required` })}
                type={type}
                placeholder={placeholder}
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-4 py-3
                  text-[13px] text-white placeholder:text-white/20 outline-none
                  focus:border-[#cc2222]/50 transition-colors duration-300"
              />
              {errors[name] && <p className="text-[11px] text-red-400/80 mt-1">{errors[name].message}</p>}
            </div>
          ))}

          <button
            disabled={!isValid}
            className="relative w-full mt-2 overflow-hidden py-3 border border-[#cc2222]/50 text-[#cc4444]
              text-[10px] font-semibold tracking-[0.25em] uppercase rounded-lg
              hover:text-white hover:border-[#cc2222] transition-all duration-300
              disabled:opacity-40 disabled:cursor-not-allowed group"
          >
            <span className="absolute inset-0 bg-[#cc2222] -translate-x-full group-hover:translate-x-0 transition-transform duration-350" />
            <span className="relative z-10">Create Account</span>
          </button>
        </form>

        <p className="text-center mt-5 text-[11px] text-white/25">
          Already registered?{" "}
          <span onClick={() => navigate("/auth")} className="text-[#cc4444] cursor-pointer hover:underline">
            Sign in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;