import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/AuthProvider";
import { useAnalytics } from "./hooks/useAnalytics";
import ActivityChart from "./components/ActivityChart";
import StatsCard from "./components/StatsCard";
import TopLinks from "./components/TopLinks";

const Analytics = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const {
    analytics,
    links,
    loading,
    error,
    range,
    startDate,
    endDate,
    selectedLink,
    formState,
    exportCSV,
    exportPDF,
    setRange,
    setStartDate,
    setEndDate,
    handleFormChange,
    openCreateForm,
    openEditForm,
    closeForm,
    submitLink,
    deleteLink,
    fetchAll,
  } = useAnalytics(user?.username);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const loadData = async () => {
      await fetchAll();
    };

    loadData();
  }, [isAuthenticated, navigate, fetchAll, range, startDate, endDate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const metricCards = [
    {
      title: "Total links",
      value: analytics?.totalLinks ?? 0,
      subtitle: "Links that belong to your profile.",
    },
    {
      title: "Total clicks",
      value: analytics?.totalClicks ?? 0,
      subtitle: "All clicks captured in the selected range.",
    },
    {
      title: "Avg. clicks",
      value: analytics?.averageClicks ?? 0,
      subtitle: "Average clicks per active link.",
    },
    {
      title: "CTR",
      value: `${analytics?.clickThroughRate ?? 0}%`,
      subtitle: "Click-through rate for this period.",
    },
  ];

  return (
    <main className="analytics-page min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <section className="analytics-hero rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-3">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Analytics dashboard</p>
              <h1 className="text-4xl font-semibold text-white sm:text-5xl">{user?.username}’s performance</h1>
              <p className="max-w-2xl text-sm leading-7 text-slate-400">
                Manage your personal links, track link performance, and monitor the last 7 / 30 / 90 day activity for your profile.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(`/${user?.username}`)}
                className="rounded-2xl border border-white/10 bg-slate-900/80 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400"
              >
                View public profile
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Logout
              </button>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metricCards.map((card) => (
                <StatsCard key={card.title} {...card} />
              ))}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-lg shadow-black/20">
              <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-white">Activity overview</h2>
                  <p className="mt-2 text-sm text-slate-400">Daily clicks based on your selected date range.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {[{label:'7 Days',value:'7'},{label:'30 Days',value:'30'},{label:'90 Days',value:'90'}].map((item) => (
                    <button
                      key={item.value}
                      type="button"
                      onClick={() => setRange(item.value)}
                      className={`rounded-full px-4 py-2 text-sm font-semibold transition ${range === item.value ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'}`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <ActivityChart data={analytics?.lastDays || []} />
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.4fr_0.6fr]">
              <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-lg shadow-black/20">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">Top performing links</h2>
                    <p className="mt-2 text-sm text-slate-400">Your best clicked links in the current range.</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={exportCSV}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
                    >
                      Export CSV
                    </button>
                    <button
                      type="button"
                      onClick={exportPDF}
                      className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                    >
                      Export PDF
                    </button>
                  </div>
                </div>
                <TopLinks links={analytics?.links || []} />
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-lg shadow-black/20">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-white">Performance insights</h2>
                  <p className="mt-2 text-sm text-slate-400">Quick metrics for the selected period.</p>
                </div>
                <div className="space-y-4">
                  <div className="rounded-3xl bg-slate-900/70 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Best day</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{analytics?.bestDay?.day || 'No clicks yet'}</p>
                    <p className="mt-1 text-sm text-slate-400">{analytics?.bestDay?.clicks ?? 0} clicks</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/70 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Growth vs previous period</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{analytics?.growthPercentage ?? 0}%</p>
                  </div>
                  <div className="rounded-3xl bg-slate-900/70 p-4">
                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">Most clicked share</p>
                    <p className="mt-3 text-2xl font-semibold text-white">{analytics?.mostClickedLinkPercentage ?? 0}%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="space-y-6">
            <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-lg shadow-black/20">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-white">Manage your links</h2>
                  <p className="mt-2 text-sm text-slate-400">Add, edit, or delete the links displayed on your profile.</p>
                </div>
                <button
                  type="button"
                  onClick={openCreateForm}
                  className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Add link
                </button>
              </div>
              <div className="space-y-3">
                {links.length ? (
                  links.map((link) => (
                    <div key={link._id} className="rounded-3xl bg-slate-900/75 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-white">{link.title}</p>
                          <p className="mt-1 truncate text-sm text-slate-400">{link.url}</p>
                          <p className="mt-2 text-xs uppercase tracking-[0.25em] text-slate-500">{link.category || 'General'}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => openEditForm(link)}
                            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-100 transition hover:bg-white/10"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteLink(link._id)}
                            className="rounded-xl border border-rose-400/40 bg-rose-500/10 px-3 py-2 text-xs font-semibold text-rose-200 transition hover:bg-rose-500/20"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/60 p-6 text-center text-slate-400">
                    No personal links yet. Add a new link to start measuring performance.
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-lg shadow-black/20">
              <div className="mb-5">
                <h2 className="text-xl font-semibold text-white">Recent click history</h2>
                <p className="mt-2 text-sm text-slate-400">Latest clicks from your profile links.</p>
              </div>
              {analytics?.recentClickHistory?.length ? (
                <div className="space-y-3">
                  {analytics.recentClickHistory.map((item, index) => (
                    <div key={`${item.linkId}-${index}`} className="rounded-3xl bg-slate-900/75 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-white">{item.title}</p>
                          <p className="truncate text-xs text-slate-400">{new Date(item.timestamp).toLocaleString()}</p>
                        </div>
                        <a href={item.url} target="_blank" rel="noreferrer" className="text-xs font-semibold text-cyan-300 hover:text-cyan-200">
                          Open
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-dashed border-white/10 bg-slate-900/60 p-6 text-center text-slate-400">
                  No recent clicks found.
                </div>
              )}
            </section>
          </aside>
        </div>

        <section className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-lg shadow-black/20">
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Filter range</h2>
              <p className="mt-2 text-sm text-slate-400">Use a custom date range to compare link analytics across specific days.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <label className="flex flex-col gap-2 text-sm text-slate-300">
                Start date
                <input type="date" value={startDate} onChange={(e) => { setRange("custom"); setStartDate(e.target.value); }} className="rounded-2xl bg-slate-900/80 px-4 py-3 text-slate-100 outline-none" />
              </label>
              <label className="flex flex-col gap-2 text-sm text-slate-300">
                End date
                <input type="date" value={endDate} onChange={(e) => { setRange("custom"); setEndDate(e.target.value); }} className="rounded-2xl bg-slate-900/80 px-4 py-3 text-slate-100 outline-none" />
              </label>
            </div>
          </div>
          {selectedLink ? (
            <div className="rounded-[1.75rem] border border-white/10 bg-slate-900/75 p-6">
              <h3 className="text-lg font-semibold text-white">{selectedLink._id ? 'Update link' : 'New link'}</h3>
              <div className="mt-4 grid gap-4">
                <label className="flex flex-col gap-2 text-sm text-slate-300">
                  Title
                  <input type="text" name="title" value={formState.title} onChange={handleFormChange} className="rounded-2xl bg-slate-950/80 px-4 py-3 text-slate-100 outline-none" />
                </label>
                <label className="flex flex-col gap-2 text-sm text-slate-300">
                  URL
                  <input type="url" name="url" value={formState.url} onChange={handleFormChange} className="rounded-2xl bg-slate-950/80 px-4 py-3 text-slate-100 outline-none" />
                </label>
                <label className="flex flex-col gap-2 text-sm text-slate-300">
                  Icon
                  <input type="text" name="icon" value={formState.icon} onChange={handleFormChange} placeholder="Optional icon name or emoji" className="rounded-2xl bg-slate-950/80 px-4 py-3 text-slate-100 outline-none" />
                </label>
                <label className="flex flex-col gap-2 text-sm text-slate-300">
                  Category
                  <input type="text" name="category" value={formState.category} onChange={handleFormChange} placeholder="Optional category" className="rounded-2xl bg-slate-950/80 px-4 py-3 text-slate-100 outline-none" />
                </label>
                <div className="flex flex-wrap gap-3">
                  <button type="button" onClick={submitLink} className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                    {selectedLink._id ? 'Save changes' : 'Create link'}
                  </button>
                  <button type="button" onClick={closeForm} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-white/10">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          ) : null}
        </section>

        {loading && (
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-8 text-center text-slate-400 shadow-lg shadow-black/10">
            Loading analytics and link data...
          </div>
        )}

        {error && (
          <div className="rounded-[2rem] border border-rose-400/20 bg-rose-500/10 p-8 text-center text-rose-100 shadow-lg shadow-black/10">
            <p className="text-lg font-semibold">{error}</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Analytics;
