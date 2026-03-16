import { useEffect, useState } from "react";
import axios from "../api/axios";
import JobStatsChart from "../components/dashboard/JobStatsChart";
import ResumeStatsChart from "../components/dashboard/ResumeStatsChart";

const STATUS_CONFIG = {
    Applied: { color: "bg-indigo-100 text-indigo-700", },
    Interviewing: { color: "bg-amber-100 text-amber-700", },
    Offered: { color: "bg-emerald-100 text-emerald-700", },
    Rejected: { color: "bg-rose-100 text-rose-700", },
};

const Dashboard = () => {
    const [stats, setStats] = useState([]);
    const [resumeStats, setResumeStats] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const [jobRes, resumeRes] = await Promise.all([
                axios.get("/jobs/stats"),
                axios.get("/jobs/resume-stats")
            ]);
            setStats(jobRes.data.stats);
            setResumeStats(resumeRes.data.stats);
        } catch (error) {
            console.log("Error fetching dashboard stats");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchStats(); }, []);

    // Build summary totals from stats
    const statMap = {};
    stats.forEach(s => { statMap[s._id] = s.count; });
    const total = Object.values(statMap).reduce((a, b) => a + b, 0);

    const summaryCards = [
        { label: "Total Applied", value: total, color: "text-slate-700", bg: "bg-slate-50", border: "border-slate-200" },
        { label: "Interviewing", value: statMap["Interviewing"] || 0, color: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
        { label: "Offers", value: statMap["Offered"] || 0, color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-200" },
        { label: "Rejected", value: statMap["Rejected"] || 0, color: "text-rose-700", bg: "bg-rose-50", border: "border-rose-200" },
    ];

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-24 bg-slate-200 rounded-xl" />
                    ))}
                </div>
                <div className="h-72 bg-slate-200 rounded-xl" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-slate-500 text-sm mt-1">Overview of your job search journey</p>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {summaryCards.map(({ label, value, color, bg, border }) => (
                    <div key={label} className={`${bg} border ${border} rounded-xl p-5`}>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
                        <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
                <JobStatsChart data={stats} />
                <ResumeStatsChart data={resumeStats} />
            </div>
        </div>
    );
};

export default Dashboard;