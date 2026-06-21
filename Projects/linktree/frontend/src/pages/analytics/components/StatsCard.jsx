const StatsCard = ({ title, value, subtitle }) => {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-lg shadow-black/20">
      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{title}</p>
      <p className="mt-4 text-4xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
    </div>
  );
};

export default StatsCard;
