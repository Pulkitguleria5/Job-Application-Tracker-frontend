import axios from "../../api/axios";
import toast from "react-hot-toast";

const STATUS_STYLES = {
  Applied:      "bg-indigo-50 text-indigo-700 border-indigo-200",
  Interviewing: "bg-amber-50 text-amber-700 border-amber-200",
  Offered:      "bg-emerald-50 text-emerald-700 border-emerald-200",
  Rejected:     "bg-rose-50 text-rose-700 border-rose-200",
};

const STATUS_DOT = {
  Applied:      "bg-indigo-500",
  Interviewing: "bg-amber-500",
  Offered:      "bg-emerald-500",
  Rejected:     "bg-rose-500",
};

// Generate a colour for the company avatar based on name
function avatarColor(name = "") {
  const colours = [
    "bg-violet-500", "bg-indigo-500", "bg-blue-500", "bg-cyan-500",
    "bg-teal-500",   "bg-emerald-500","bg-orange-500","bg-pink-500",
  ];
  const idx = (name.charCodeAt(0) || 0) % colours.length;
  return colours[idx];
}

const JobCard = ({ job, refresh, openEdit }) => {

  const handleDelete = async () => {
    if (!window.confirm("Delete this job application?")) return;
    try {
      await axios.delete(`/jobs/${job._id}`);
      toast.success("Job deleted");
      refresh();
    } catch {
      toast.error("Failed to delete job");
    }
  };

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : null;

  const initials = job.company
    ? job.company.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()
    : "?";

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col gap-3 hover:shadow-lg hover:border-indigo-200 transition-all duration-200 group">

      {/* Top row: avatar + status badge + actions */}
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0 ${avatarColor(job.company)}`}>
          {initials}
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${STATUS_STYLES[job.status] || "bg-slate-50 text-slate-600 border-slate-200"}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[job.status] || "bg-slate-400"}`} />
            {job.status}
          </span>
        </div>
      </div>

      {/* Role + Company */}
      <div className="min-w-0">
        <h3 className="font-semibold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-indigo-700 transition-colors">
          {job.role}
        </h3>
        <p className="text-slate-500 text-xs mt-0.5 truncate">{job.company}</p>
      </div>

      {/* Chips row: location, jobType, salary */}
      <div className="flex flex-wrap gap-1.5">
        {job.location && (
          <span className="inline-flex items-center gap-1 text-xs text-slate-500 bg-slate-100 rounded-md px-2 py-0.5">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate max-w-[80px]">{job.location}</span>
          </span>
        )}
        {job.jobType && (
          <span className="inline-flex items-center text-xs font-medium bg-violet-50 text-violet-700 border border-violet-100 rounded-md px-2 py-0.5">
            {job.jobType}
          </span>
        )}
        {job.salaryRange && (
          <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-md px-2 py-0.5">
            <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="truncate max-w-[80px]">{job.salaryRange}</span>
          </span>
        )}
      </div>

      {/* Notes snippet */}
      {job.notes && (
        <p className="text-xs text-slate-400 line-clamp-2 bg-slate-50 rounded-lg px-3 py-2 border border-slate-100">
          {job.notes}
        </p>
      )}

      {/* Divider */}
      <div className="border-t border-slate-100 mt-auto" />

      {/* Footer: date + actions */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-slate-400 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(job.appliedDate) ?? "No date"}
        </div>

        <div className="flex items-center gap-1">
          {job.jobUrl && (
            <a
              href={job.jobUrl} target="_blank" rel="noreferrer"
              className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
              title="View Job"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          )}
          <button
            onClick={() => openEdit(job)}
            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            title="Edit"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Delete"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;