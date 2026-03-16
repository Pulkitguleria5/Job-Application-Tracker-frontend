import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, Cell
} from "recharts";

const STATUS_COLORS = {
  Applied: "#6366f1",
  Interviewing: "#f59e0b",
  Offered: "#10b981",
  Rejected: "#f43f5e",
};

const JobStatsChart = ({ data }) => {
  const formattedData = data.map((item) => ({
    status: item._id,
    count: item.count
  }));

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-900">Application Status</h3>
      <p className="text-xs text-slate-400 mt-0.5 mb-4">Breakdown by current status</p>

      {formattedData.length === 0 ? (
        <div className="h-[260px] flex items-center justify-center">
          <p className="text-slate-400 text-sm">No applications yet. Add your first job!</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={formattedData} barSize={36}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="status" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }}
              cursor={{ fill: "#f8fafc" }}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {formattedData.map((entry) => (
                <Cell key={entry.status} fill={STATUS_COLORS[entry.status] || "#6366f1"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default JobStatsChart;