import axios from "../../api/axios";
import toast from "react-hot-toast";

const STATUS_STYLES = {
  Applied: "bg-indigo-100 text-indigo-700 border-indigo-200",
  Interviewing: "bg-amber-100 text-amber-700 border-amber-200",
  Offered: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Rejected: "bg-rose-100 text-rose-700 border-rose-200",
};

const JobCard = ({ job, refresh, openEdit }) => {

  const handleDelete = async () => {
    if (!window.confirm("Delete this job application?")) return;
    try {
      await axios.delete(`/jobs/${job._id}`);
      toast.success("Job deleted successfully");
      refresh();
    } catch (error) {
      toast.error("Failed to delete job");
    }
  };

  const formatDate = (date) => date ? new Date(date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : null;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-slate-900 text-base">{job.role}</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${STATUS_STYLES[job.status] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
              {job.status}
            </span>
          </div>
          <p className="text-slate-500 text-sm mt-0.5">{job.company}</p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => openEdit(job)}
            className="text-xs text-slate-500 hover:text-indigo-600 font-medium px-2.5 py-1 rounded-md hover:bg-indigo-50 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="text-xs text-slate-500 hover:text-rose-600 font-medium px-2.5 py-1 rounded-md hover:bg-rose-50 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Details row */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
        {job.salaryRange && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {job.salaryRange}
          </span>
        )}
        {job.appliedDate && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Applied {formatDate(job.appliedDate)}
          </span>
        )}
        {job.followUpDate && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Follow-up {formatDate(job.followUpDate)}
          </span>
        )}
        {job.resumeUsed?.title && (
          <span className="flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            {job.resumeUsed.title}
          </span>
        )}
        {job.jobUrl && (
          <a href={job.jobUrl} target="_blank" rel="noreferrer"
            className="flex items-center gap-1 text-indigo-500 hover:text-indigo-700">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            View Job
          </a>
        )}
      </div>

      {job.notes && (
        <p className="mt-2 text-xs text-slate-500 bg-slate-50 rounded-md px-3 py-2 border border-slate-100">
          {job.notes}
        </p>
      )}
    </div>
  );
};

export default JobCard;