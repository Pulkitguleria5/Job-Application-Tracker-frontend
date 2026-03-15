import { useState, useEffect } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";

const JobFormModal = ({ close, refresh, job }) => {
  const [formData, setFormData] = useState({
    company: job?.company || "",
    role: job?.role || "",
    status: job?.status || "Applied",
    joburl: job?.joburl || "",
    salaryRange: job?.salaryRange || "",
    resumeUsed: job?.resumeUsed?._id || ""
  });

  const [loading, setLoading] = useState(false);
  const [resumes, setResumes] = useState([]);

  useEffect(() => {
    const fetchResumes = async () => {
      const { data } = await axios.get("/resumes/get-resume");
      setResumes(data.resumes);
    };
    fetchResumes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (job) {
        await axios.put(`/jobs/${job._id}`, formData);
        toast.success("Job updated successfully");
      } else {
        await axios.post("/jobs/create", formData);
        toast.success("Job created successfully");
      }

      refresh();
      close();

    } catch (error) {
      toast.error("Something went wrong");
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-96">
        <h3 className="text-lg font-semibold mb-4">Add Job</h3>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            placeholder="Company"
            className="border p-2 w-full rounded"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
          />

          <input
            placeholder="Role"
            className="border p-2 w-full rounded"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
            }
          />

          <select
            className="border p-2 w-full rounded"
            value={formData.status}
            onChange={(e) =>
              setFormData({ ...formData, status: e.target.value })
            }
          >
            <option>Applied</option>
            <option>Interviewing</option>
            <option>Offered</option>
            <option>Rejected</option>
          </select>

          <select
            className="border p-2 w-full rounded"
            value={formData.resumeUsed}
            onChange={(e) =>
              setFormData({ ...formData, resumeUsed: e.target.value })
            }
          >
            <option value="">Select Resume</option>
            {resumes.map((r) => (
              <option key={r._id} value={r._id}>
                {r.title}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={close}
              className="px-3 py-1 bg-gray-300 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default JobFormModal;