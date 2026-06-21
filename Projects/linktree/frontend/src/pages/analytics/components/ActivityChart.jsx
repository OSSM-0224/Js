const ActivityChart = ({ data }) => {
  if (!data?.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-white/10 bg-slate-900/70 p-8 text-center text-slate-400">
        No activity available for the selected range.
      </div>
    );
  }

  const maxClicks = Math.max(...data.map((item) => item.clicks || 0), 1);

  return (
    <div className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        {data.map((point) => (
          <div key={point.date} className="rounded-[1.75rem] bg-slate-900/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm text-slate-400">{point.date}</p>
              <p className="text-lg font-semibold text-white">{point.clicks}</p>
            </div>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                style={{ width: `${(point.clicks / maxClicks) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityChart;
