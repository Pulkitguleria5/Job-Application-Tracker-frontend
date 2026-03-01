import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { PublicRoute } from "./routes/PublicRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/DashBoard";
import Jobs from "./pages/Jobs";
import Resumes from "./pages/Resumes";



export default function App() {
    return (

        <AuthProvider>
            <Routes>

                // Public routes
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>

                // Protected routes
                <Route element={<ProtectedRoute />}>
                    <Route element={<DashboardLayout />}>
                        <Route index element={<Dashboard />} />    // if path is / then render Dashboard  and add / this in path in front of dashboard,job and resumes
                        <Route path="dashboard" element={<Dashboard />} /> 
                        <Route path="jobs" element={<Jobs />} />           
                        <Route path="resumes" element={<Resumes />} />

                    </Route>
                </Route>

            </Routes>
        </AuthProvider>
    );
}

