import { useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import RenameResumeModal from "./RenameResumeModal";

const ResumeCard = ({ resume, refresh }) => {
  const [renameModal, setRenameModal] = useState(false);

  // Use Google Docs Viewer to display the PDF in-browser (avoids Cloudinary raw file limitations)
  const viewUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(resume.fileUrl)}`;

  const handleDelete = async () => {
    if (!window.confirm("Delete this resume?")) return;
    try {
      await axios.delete(`/resume/${resume._id}`);
      toast.success("Resume deleted");
      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  const uploadedDate = new Date(resume.createdAt).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric"
  });

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col justify-between">

      <div className="flex items-start gap-3">
        {/* PDF icon */}
        <div className="w-10 h-10 bg-rose-50 border border-rose-200 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900 text-sm truncate">{resume.title}</h3>
          <p className="text-xs text-slate-400 mt-0.5">{uploadedDate}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
        <a
          href={viewUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View
        </a>
        <div className="flex gap-1">
          <button onClick={() => setRenameModal(true)}
            className="text-xs text-slate-500 hover:text-amber-600 hover:bg-amber-50 px-2.5 py-1.5 rounded-lg transition-colors font-medium">
            Rename
          </button>
          <button onClick={handleDelete}
            className="text-xs text-slate-500 hover:text-rose-600 hover:bg-rose-50 px-2.5 py-1.5 rounded-lg transition-colors font-medium">
            Delete
          </button>
        </div>
      </div>

      {renameModal && (
        <RenameResumeModal resume={resume} close={() => setRenameModal(false)} refresh={refresh} />
      )}
    </div>
  );
};

export default ResumeCard;