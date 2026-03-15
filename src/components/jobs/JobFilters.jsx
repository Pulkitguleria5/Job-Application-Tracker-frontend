const JobFilters = ({ filters, setFilters }) => {
  return (
    <div className="flex gap-3">
      <select
        value={filters.status}
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
        className="border p-2 rounded"
      >
        <option value="">All</option>
        <option value="Applied">Applied</option>
        <option value="Interviewing">Interviewing</option>
        <option value="Offered">Offered</option>
        <option value="Rejected">Rejected</option>
      </select>

      <input
        type="text"
        placeholder="Search"
        value={filters.search}
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
        className="border p-2 rounded flex-1"
      />
    </div>
  );
};

export default JobFilters;