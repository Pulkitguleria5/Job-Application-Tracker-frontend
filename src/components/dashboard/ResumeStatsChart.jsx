import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#f43f5e", "#8b5cf6", "#06b6d4"];

const ResumeStatsChart = ({ data }) => {
  const formattedData = data.map((item) => ({
    name: item.title,
    value: item.applications
  }));

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <h3 className="text-sm font-semibold text-slate-900">Resume Performance</h3>
      <p className="text-xs text-slate-400 mt-0.5 mb-4">Applications sent per resume</p>

      {formattedData.length === 0 ? (
        <div className="h-[260px] flex items-center justify-center">
          <p className="text-slate-400 text-sm">Link resumes to jobs to see performance</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={formattedData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              innerRadius={45}
              paddingAngle={3}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {formattedData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ borderRadius: "8px", border: "1px solid #e2e8f0", fontSize: "12px" }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: "12px", color: "#64748b" }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default ResumeStatsChart;