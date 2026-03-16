const Pagination = ({ page, totalPages, setPage }) => {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <button
        onClick={() => setPage(p => Math.max(1, p - 1))}
        disabled={page <= 1}
        className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {[...Array(totalPages).keys()].map((x) => (
        <button
          key={x}
          onClick={() => setPage(x + 1)}
          className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${page === x + 1
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-slate-600 hover:bg-slate-200"
            }`}
        >
          {x + 1}
        </button>
      ))}

      <button
        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
        disabled={page >= totalPages}
        className="p-2 rounded-lg text-slate-500 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;