import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#dc2626", "#9333ea"];

const ResumeStatsChart = ({ data }) => {

  const formattedData = data.map((item) => ({
    name: item.title,
    value: item.applications
  }));

  return (
    <div className="bg-white p-5 rounded shadow mt-6">

      <h3 className="text-lg font-semibold mb-4">
        Resume Performance
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>

          <Pie
            data={formattedData}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {formattedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
};

export default ResumeStatsChart;