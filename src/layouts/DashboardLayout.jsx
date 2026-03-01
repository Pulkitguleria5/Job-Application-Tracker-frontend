import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import axios from "../api/axios";

export const DashboardLayout = () => {
    const { user, setUser } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post("/auth/logout");
        } catch (error) {
            console.error("Logout API failed:", error);
        } finally {
            setUser(null);
            navigate("/login");
        }
    };


    return (
        <div className="min-h-screen flex flex-col">


            {/* sidebar */}
            <div className="w-64 bg-gray-900 text-white p-5">
                <h2 className="text-xl font-bold mb-6">CareerFlow</h2>

                <nav className="space-y-3">

                    <NavLink
                        to="/dashboard"
                        className={({ isActive }) =>
                            `block px-2 py-1 rounded ${isActive ? "bg-blue-600" : "hover:bg-gray-700"
                            }`
                        }
                    >
                        Dashboard
                    </NavLink>

                    <NavLink
                        to="/jobs"
                        className={({ isActive }) =>
                            `block px-2 py-1 rounded ${isActive ? "bg-blue-600" : "hover:bg-gray-700"
                            }`
                        }
                    >
                        Jobs
                    </NavLink>

                    <NavLink
                        to="/resumes"
                        className={({ isActive }) =>
                            `block px-2 py-1 rounded ${isActive ? "bg-blue-600" : "hover:bg-gray-700"
                            }`
                        }
                    >
                        Resumes
                    </NavLink>

                </nav>
            </div>

            // Logout button
            <button
                onClick={handleLogout}
                className="mt-6 w-full bg-red-600 py-1 rounded hover:bg-red-700"
            >
                Logout
            </button>


            {/* main content */}

            <div className="flex-1 bg-gray-100 p-6">

                <div className="mb-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
                </div>

                <Outlet />
            </div>

        </div>

    );
};