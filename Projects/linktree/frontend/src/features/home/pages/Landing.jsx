import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthProvider";

const Landing = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/analytics");
    }
  }, [isAuthenticated, navigate]);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a_0%,_#020617_50%,_#020617_100%)] px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10">
        <section className="rounded-[2.5rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-300/80">
                Linktree clone
              </p>
              <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Build a beautiful link profile and measure your traffic.
              </h1>
              <p className="max-w-xl text-base leading-8 text-slate-300">
                Register, log in, and use your own protected analytics dashboard for link performance, top clicks, and last 7 days activity.
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="rounded-2xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="rounded-2xl border border-white/10 bg-slate-950/80 px-5 py-3 font-semibold text-white transition hover:bg-slate-900"
                >
                  Login
                </button>
              </div>
            </div>
            <div className="rounded-[2rem] border border-white/10 bg-slate-950/70 p-8 text-slate-300 shadow-lg shadow-black/20">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Fast access</p>
              <p className="mt-4 text-3xl font-semibold text-white">Personal analytics</p>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Protected, private analytics only for the creator. No one else can access your dashboard.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Links</p>
                  <p className="mt-3 text-3xl font-semibold text-white">{user?.username ? "Your profile" : "Fast setup"}</p>
                </div>
                <div className="rounded-3xl bg-slate-900/80 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Analytics</p>
                  <p className="mt-3 text-3xl font-semibold text-white">Secure view</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Landing;
