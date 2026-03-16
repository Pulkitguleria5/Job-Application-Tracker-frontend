import { useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";

const ResumeUploadModal = ({ close, refresh }) => {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) { toast.error("Please select a PDF file"); return; }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("resume", file);

    try {
      setLoading(true);
      await axios.post("/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      toast.success("Resume uploaded successfully");
      refresh();
      close();
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="text-base font-semibold text-slate-900">Upload Resume</h3>
          <button onClick={close} className="text-slate-400 hover:text-slate-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Resume Title *</label>
            <input
              type="text" required
              placeholder="e.g. Software Engineer Resume 2025"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="block w-full px-3 py-2.5 rounded-lg border border-slate-200 text-sm focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">PDF File *</label>
            <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 text-center hover:border-indigo-400 transition-colors">
              <svg className="w-8 h-8 text-slate-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              {file ? (
                <p className="text-sm text-indigo-600 font-medium">{file.name}</p>
              ) : (
                <p className="text-sm text-slate-400">Click to select a PDF file</p>
              )}
              <input
                type="file" accept=".pdf"
                onChange={(e) => setFile(e.target.files[0])}
                className="absolute inset-0 opacity-0 cursor-pointer"
                style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
              />
              <button
                type="button"
                onClick={() => document.querySelector('input[type="file"]').click()}
                className="mt-2 text-xs text-indigo-600 hover:underline"
              >
                Browse files
              </button>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
            <button type="button" onClick={close}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading}
              className="px-5 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 rounded-lg shadow-sm transition-colors">
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResumeUploadModal;