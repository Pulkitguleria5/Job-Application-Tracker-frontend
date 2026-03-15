import { useEffect, useState } from "react";
import axios from "../api/axios";
import ResumeCard from "../components/resumes/ResumeCard";
import ResumeUploadModal from "../components/resumes/ResumeUploadModal";

const Resumes = () => {

  const [resumes, setResumes] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const fetchResumes = async () => {
    try {
      const { data } = await axios.get("/resumes/get-resume");
      setResumes(data.resumes);
    } catch (error) {
      console.log("Error fetching resumes");
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  return (
    <div>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Resumes</h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload Resume
        </button>
      </div>

      {resumes.length === 0 ? (
        <p>No resumes uploaded yet</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume._id}
              resume={resume}
              refresh={fetchResumes}
            />
          ))}
        </div>
      )}

      {showModal && (
        <ResumeUploadModal
          close={() => setShowModal(false)}
          refresh={fetchResumes}
        />
      )}

    </div>
  );
};

export default Resumes;