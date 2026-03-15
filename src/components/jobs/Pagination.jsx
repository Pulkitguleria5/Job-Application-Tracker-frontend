const Pagination = ({ page, totalPages, setPage }) => {
  if (!totalPages || totalPages <= 1) return null;

  return (
    <div className="flex gap-2 mt-4">
      {[...Array(totalPages).keys()].map((x) => (
        <button
          key={x}
          onClick={() => setPage(x + 1)}
          className={`px-3 py-1 rounded ${
            page === x + 1
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          {x + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;