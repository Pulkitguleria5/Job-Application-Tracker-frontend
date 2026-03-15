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
  const [filters, setFilters] = useState({
    status: "",
    search: ""
  });
  const [editingJob, setEditingJob] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get("/jobs/get-jobs", {
        params: {
          page,
          status: filters.status,
          search: filters.search
        }
      });

      setJobs(data.jobs);
      setPagination(data.pagination);
    } catch (error) {
      console.log("Error fetching jobs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page, filters]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Jobs</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Job
        </button>
      </div>



      <JobFilters filters={filters} setFilters={setFilters} />

      {loading ? (
        <p>Loading...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        <div className="grid gap-4 mt-4">
          {jobs.map((job) => (
            <JobCard key={job._id} job={job} refresh={fetchJobs} openEdit={setEditingJob}/>
          ))}
        </div>
      )}

      <Pagination
        page={pagination.currentPage}
        totalPages={pagination.totalPages}
        setPage={setPage}
      />

      {showModal && (
        <JobFormModal
          close={() => setShowModal(false)}
          refresh={fetchJobs}
        />
      )}

      {editingJob && (
        <JobFormModal
          job={editingJob}
          close={() => setEditingJob(null)}
          refresh={fetchJobs}
        />
      )}

    </div>


  );
}