import { useState } from "react";
import axios from "../../api/axios";
import toast from "react-hot-toast";

const ResumeUploadModal = ({ close, refresh }) => {

  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a file");
      return;
    }

    // Files must be sent as multipart/form-data, not JSON.

    const formData = new FormData();           // formData is used to send multipart/form-data
    formData.append("title", title);             
    formData.append("resume", file);

    try {

      setLoading(true);

      await axios.post("/resumes/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      toast.success("Resume uploaded");

      refresh();
      close();

    } catch {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

      <div className="bg-white p-6 rounded w-96">

        <h3 className="text-lg font-semibold mb-4">
          Upload Resume
        </h3>

        <form onSubmit={handleSubmit} className="space-y-3">

          <input
            type="text"
            placeholder="Resume title"
            className="border p-2 w-full rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setFile(e.target.files[0])}       // only one file can be selected, so we take the first one from the FileList
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
              disabled={loading}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default ResumeUploadModal;