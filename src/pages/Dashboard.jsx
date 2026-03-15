import { useEffect, useState } from "react";
import axios from "../api/axios";
import JobStatsChart from "../components/dashboard/JobStatsChart";
import ResumeStatsChart from "../components/dashboard/ResumeStatsChart";

const Dashboard = () => {

    const [stats, setStats] = useState([]);
    const [resumeStats, setResumeStats] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get("/jobs/stats");
            setStats(data.stats);
        } catch (error) {
            console.log("Error fetching stats");
        } finally {
            setLoading(false);
        }
    };

    const fetchResumeStats = async () => {
        try {
            const { data } = await axios.get("/jobs/resume-stats");
            setResumeStats(data.stats);
        } catch (error) {
            console.log("Error fetching resume stats");
        }
    };

    useEffect(() => {
        fetchStats();
        fetchResumeStats();
    }, []);
    

    return (
        <div>

            <h2 className="text-xl font-semibold mb-4">
                Dashboard
            </h2>

            {loading ? (
                <p>Loading stats...</p>
            ) : (
                <>
                <JobStatsChart data={stats} />
                <ResumeStatsChart data={resumeStats} />
                </>
            )}

        </div>
    );
};

export default Dashboard;