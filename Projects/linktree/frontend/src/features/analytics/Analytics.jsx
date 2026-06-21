import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { getAnalytics } from "./services/analytics.api";

const Analytics = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await getAnalytics(user.username);
        setAnalytics(response.analytics);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Unable to load analytics data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, navigate, user]);

  const chartDays = analytics?.last7Days || [];
  const maxClicks = useMemo(() => Math.max(...chartDays.map((day) => day.clicks), 1), [chartDays]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-cyan-300/80">
                Analytics dashboard
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                {user?.username}'s performance
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
                Only you can view these analytics. Data is protected by authentication and user ownership.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(`/${user?.username}`)}
                className="rounded-2xl bg-slate-900/90 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
              >
                View Profile
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Logout
              </button>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 text-center text-slate-300 shadow-lg shadow-black/20">
            Loading analytics...
          </div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-400/20 bg-rose-500/10 p-8 text-center text-rose-100 shadow-lg shadow-black/10">
            <p className="text-lg font-semibold">{error}</p>
          </div>
        ) : (
          <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
            <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10 backdrop-blur-xl">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950/80 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Total links</p>
                  <p className="mt-3 text-4xl font-semibold text-white">{analytics?.totalLinks}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Total clicks</p>
                  <p className="mt-3 text-4xl font-semibold text-white">{analytics?.totalClicks}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Average clicks</p>
                  <p className="mt-3 text-4xl font-semibold text-white">{analytics?.averageClicks}</p>
                </div>
                <div className="rounded-3xl bg-slate-950/80 p-5">
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Top link</p>
                  <p className="mt-3 text-base font-semibold text-white">
                    {analytics?.topLink ? analytics.topLink.title : "No clicks yet"}
                  </p>
                  {analytics?.topLink ? (
                    <p className="mt-1 text-sm text-slate-400 truncate">{analytics.topLink.url}</p>
                  ) : null}
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold text-white">Last 7 days</h2>
                    <p className="mt-1 text-sm text-slate-400">Daily clicks and new link growth.</p>
                  </div>
                </div>
                <div className="mt-6 grid gap-4">
                  <div className="grid grid-cols-7 gap-2"> 
                    {chartDays.map((day) => {
                      const height = Math.max(6, Math.round((day.clicks / maxClicks) * 100));
                      const label = new Date(day.date).toLocaleDateString(undefined, { weekday: "short" });

                      return (
                        <div key={day.date} className="flex flex-col items-center gap-2">
                          <div className="flex h-40 w-full items-end justify-center rounded-3xl bg-slate-900/70 p-1">
                            <div
                              className="w-full rounded-t-3xl bg-cyan-400 transition-all duration-300"
                              style={{ height: `${height}%` }}
                            />
                          </div>
                          <p className="text-xs text-slate-400">{label}</p>
                          <p className="text-xs font-semibold text-white">{day.clicks}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-black/10 backdrop-blur-xl">
              <div>
                <h2 className="text-xl font-semibold text-white">Link performance</h2>
                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Clicks, active links, and recent trend data for your profile.
                </p>
              </div>

              <div className="space-y-4">
                {analytics?.links?.length ? (
                  analytics.links.slice(0, 5).map((link) => (
                    <div key={link._id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white">{link.title}</p>
                          <p className="mt-1 truncate text-sm text-slate-400">{link.url}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-semibold text-cyan-300">{link.clicks}</p>
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">clicks</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 text-center text-slate-300">
                    No links created yet. Create links to start building analytics.
                  </div>
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

export default Analytics;
