import { useEffect, useState } from "react";
import axios from "../api/axios";
import ResumeCard from "../components/resumes/ResumeCard";
import ResumeUploadModal from "../components/resumes/ResumeUploadModal";

const Resumes = () => {
  const [resumes, setResumes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchResumes = async () => {
    try {
      const { data } = await axios.get("/resume/get-resume");
      setResumes(data.resumes);
    } catch (error) {
      console.log("Error fetching resumes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchResumes(); }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Resumes</h1>
          <p className="text-slate-500 text-sm mt-1">{resumes.length} resume{resumes.length !== 1 ? "s" : ""} saved</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload Resume
        </button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-36 bg-slate-200 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : resumes.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
          <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-slate-500 font-medium">No resumes uploaded yet</p>
          <p className="text-slate-400 text-sm mt-1">Upload your first resume to get started</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {resumes.map((resume) => (
            <ResumeCard key={resume._id} resume={resume} refresh={fetchResumes} />
          ))}
        </div>
      )}

      {showModal && (
        <ResumeUploadModal close={() => setShowModal(false)} refresh={fetchResumes} />
      )}
    </div>
  );
};

export default Resumes;