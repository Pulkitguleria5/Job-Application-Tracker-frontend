import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const JobStatsChart = ({ data }) => {

  const formattedData = data.map((item) => ({
    status: item._id,
    count: item.count
  }));

  return (
    <div className="bg-white p-5 rounded shadow">
      <h3 className="text-lg font-semibold mb-4">
        Job Application Stats
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="status" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default JobStatsChart;