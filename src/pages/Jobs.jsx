import { useEffect, useState } from "react";
import axios from "../api/axios";
import JobCard from "../components/jobs/jobCard";
import JobFilters from "../components/jobs/JobFilters";
import Pagination from "../components/jobs/Pagination";
import JobFormModal from "../components/jobs/JobFormModal";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ status: "", search: "" });
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/jobs/get-jobs", {
        params: { page, status: filters.status, search: filters.search }
      });
      setJobs(data.jobs);
      setPagination(data.pagination);
    } catch (error) {
      console.log("Error fetching jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, [page, filters]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Jobs</h1>
          <p className="text-slate-500 text-sm mt-1">
            {pagination.totalitems ?? 0} application{pagination.totalitems !== 1 ? "s" : ""} tracked
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Job
        </button>
      </div>

      <JobFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 bg-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <p className="text-slate-500 font-medium">No jobs found</p>
          <p className="text-slate-400 text-sm mt-1">Add your first job application to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} refresh={fetchJobs} openEdit={setEditingJob} />
          ))}
        </div>
      )}

      <Pagination page={pagination.currentPage} totalPages={pagination.totalPages} setPage={setPage} />

      {showModal && (
        <JobFormModal close={() => setShowModal(false)} refresh={fetchJobs} />
      )}
      {editingJob && (
        <JobFormModal job={editingJob} close={() => setEditingJob(null)} refresh={fetchJobs} />
      )}
    </div>
  );
}