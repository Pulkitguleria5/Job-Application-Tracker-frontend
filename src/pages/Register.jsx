import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";


export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError(prev => ({
            ...prev,
            [e.target.name]: ""
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError({});

        const newErrors = {};
        if (!formData.name) newErrors.name = "Name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password && formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";

        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            setLoading(false);
            return;
        }


        try {
            await axios.post("/auth/register", formData);
            setSuccess(true);
            setTimeout(() => navigate("/login"), 3000);
        }
        catch (err) {
            if (err.response?.data?.errors) {
                const backendErrors = {};
                err.response.data.errors.forEach((e) => {
                    backendErrors[e.field] = e.message;
                });
                setError(backendErrors);
            }
            else {
                setError({ general: err.response?.data?.message || "Registration failed" });
            }
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Create Account
                </h2>

                {error.general && (
                    <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
                        {error.general}
                    </div>
                )}          

                {success && (
                    <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-sm text-center">
                        🎉 Account created successfully! Redirecting to login...
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            autoComplete="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                    </div>

                    {error.name && (
                        <div className="text-red-600 text-sm">{error.name}</div>
                    )}



                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    {error.email && (
                        <div className="text-red-600 text-sm">{error.email}</div>
                    )}



                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="new-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                       
                    {error.password && (
                        <div className="text-red-600 text-sm">{error.password}</div>
                    )}



                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 border border-transparent rounded-md text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="text-blue-600 hover:text-blue-800">
                        Login
                    </Link>
                </p>


            </div>
        </div>
    );
}

