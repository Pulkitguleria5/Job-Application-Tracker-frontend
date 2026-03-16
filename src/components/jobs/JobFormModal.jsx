import { useState, useEffect } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";

const inputClass = "block w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-sm text-slate-800 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition placeholder-slate-400";
const labelClass = "block text-xs font-medium text-slate-600 mb-1";

const JobFormModal = ({ close, refresh, job }) => {
  const [formData, setFormData] = useState({
    company: job?.company || "",
    role: job?.role || "",
    status: job?.status || "Applied",
    jobUrl: job?.jobUrl || "",
    salaryRange: job?.salaryRange || "",
    notes: job?.notes || "",
    appliedDate: job?.appliedDate ? job.appliedDate.slice(0, 10) : "",
    followUpDate: job?.followUpDate ? job.followUpDate.slice(0, 10) : "",
    resumeUsed: job?.resumeUsed?._id || ""
  });

  const [loading, setLoading] = useState(false);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    axios.get("/resume/get-resume")
      .then(({ data }) => setResumes(data.resumes))
      .catch(() => { });
  }, []);

  const set = (field) => (e) => setFormData(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (job) {
        await axios.put(`/jobs/${job._id}`, formData);
        toast.success("Job updated");
      } else {
        await axios.post("/jobs/create", formData);
        toast.success("Job added");
      }
      refresh();
      close();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">

        {/* Modal header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-900">{job ? "Edit Job" : "Add Job"}</h3>
          <button onClick={close} className="text-slate-400 hover:text-slate-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Company *</label>
              <input required placeholder="Google" className={inputClass} value={formData.company} onChange={set("company")} />
            </div>
            <div>
              <label className={labelClass}>Role *</label>
              <input required placeholder="Software Engineer" className={inputClass} value={formData.role} onChange={set("role")} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Status</label>
            <select className={inputClass} value={formData.status} onChange={set("status")}>
              <option>Applied</option>
              <option>Interviewing</option>
              <option>Offered</option>
              <option>Rejected</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Job URL</label>
            <input type="url" placeholder="https://..." className={inputClass} value={formData.jobUrl} onChange={set("jobUrl")} />
          </div>

          <div>
            <label className={labelClass}>Salary Range</label>
            <input placeholder="e.g. 8–12 LPA" className={inputClass} value={formData.salaryRange} onChange={set("salaryRange")} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Applied Date</label>
              <input type="date" className={inputClass} value={formData.appliedDate} onChange={set("appliedDate")} />
            </div>
            <div>
              <label className={labelClass}>Follow-up Date</label>
              <input type="date" className={inputClass} value={formData.followUpDate} onChange={set("followUpDate")} />
            </div>
          </div>

          <div>
            <label className={labelClass}>Resume Used</label>
            <select className={inputClass} value={formData.resumeUsed} onChange={set("resumeUsed")}>
              <option value="">None</option>
              {resumes.map((r) => (
                <option key={r._id} value={r._id}>{r.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Notes</label>
            <textarea rows={3} placeholder="Any notes about this application..." className={`${inputClass} resize-none`} value={formData.notes} onChange={set("notes")} />
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button type="button" onClick={close} className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 rounded-lg shadow-sm transition-colors">
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobFormModal;