import { useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";
import RenameResumeModal from "./RenameResumeModal";

const ResumeCard = ({ resume, refresh }) => {

  const [renameModal, setRenameModal] = useState(false);

  const handleDelete = async () => {

    if (!window.confirm("Delete this resume?")) return;

    try {
      await axios.delete(`/resumes/${resume._id}`);
      toast.success("Resume deleted");
      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="bg-white shadow rounded p-4">

      <h3 className="font-semibold">{resume.title}</h3>

      <p className="text-sm text-gray-500 mt-1">
        Uploaded: {new Date(resume.createdAt).toLocaleDateString()}
      </p>

      <div className="flex justify-between mt-4">

        <a
          href={resume.fileUrl}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 text-sm"
        >
          View
        </a>

        <div className="flex gap-3">

          <button
            onClick={() => setRenameModal(true)}
            className="text-yellow-500 text-sm"
          >
            Rename
          </button>

          <button
            onClick={handleDelete}
            className="text-red-500 text-sm"
          >
            Delete
          </button>

        </div>
      </div>

      {renameModal && (
        <RenameResumeModal
          resume={resume}
          close={() => setRenameModal(false)}
          refresh={refresh}
        />
      )}

    </div>
  );
};

export default ResumeCard;