import { useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";

const RenameResumeModal = ({ resume, close, refresh }) => {

  const [title, setTitle] = useState(resume.title);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.patch(`/resumes/${resume._id}`, { title });

      toast.success("Title updated");

      refresh();
      close();

    } catch {
      toast.error("Update failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

      <div className="bg-white p-6 rounded w-96">

        <h3 className="text-lg font-semibold mb-4">
          Rename Resume
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            className="border p-2 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

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
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Save
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default RenameResumeModal;