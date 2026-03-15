import axios from "../../api/axios";

const JobCard = ({ job, refresh,openEdi }) => {

  const handleDelete = async () => {
    if (!window.confirm("Delete this job?")) return;

    await axios.delete(`/jobs/${job._id}`);
    refresh();
  };

  return (
    <div className="bg-white shadow rounded p-4">
      <div className="flex justify-between">
        <div>
          <h3 className="font-bold">{job.role}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>

        <span className="text-sm bg-blue-100 px-2 py-1 rounded">
          {job.status}
        </span>
      </div>

      {job.resumeUsed && (
        <p className="text-sm text-gray-500 mt-2">
          Resume: {job.resumeUsed.title}
        </p>
      )}


      <div className="flex justify-end gap-3 mt-3">
        <button
          onClick={() => openEdit(job)}
          className="text-blue-500 text-sm hover:underline"
        >
          Edit
        </button>
        
        <button
          onClick={handleDelete}
          className="text-red-500 text-sm hover:underline"
        >
          Delete
        </button>
        
      </div>

    </div>

  );
};

export default JobCard;