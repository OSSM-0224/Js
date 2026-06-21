const TopLinks = ({ links }) => {
  return (
    <div className="space-y-4">
      {links.length ? (
        links.slice(0, 6).map((link) => (
          <div key={link._id} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{link.title}</p>
                <p className="truncate text-xs text-slate-400">{link.url}</p>
              </div>
              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-300">{link.rangeClicks} clicks</span>
            </div>
          </div>
        ))
      ) : (
        <div className="rounded-3xl bg-slate-900/75 p-6 text-center text-slate-400">
          No top links yet.
        </div>
      )}
    </div>
  );
};

export default TopLinks;
