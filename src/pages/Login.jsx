import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "../api/axios";
import { useAuth } from "../context/authContext";

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setErrors(prev => ({ ...prev,
             [e.target.name]: "" }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        try {
            const response = await axios.post("/auth/login", formData);
            setUser(response.data);
            navigate("/dashboard");
        }
        catch (err) {
            if (err.response?.data?.errors) {
                const backendErrors = {};
                err.response.data.errors.forEach((e) => {
                    backendErrors[e.field] = e.message;
                });
                setErrors(backendErrors);
            } else {
                setErrors({ general: err.response?.data?.message || "Login failed" });
            }
        }
        finally {
            setLoading(false);
        }

    };


    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const body = { credential: credentialResponse.credential };
            const response = await axios.post("/auth/google-sso", body);
            setUser(response.data);
            navigate("/dashboard");
        }
        catch (err) {
            setError(err.response?.data?.message || "Google SSO failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Login to CareerFlow
                </h2>


                {errors.general && (
                    <div className="bg-red-100 text-red-600 p-2 rounded mb-4 text-sm">
                        {errors.general}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>

                    {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email}</p>
                    )}








                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            autoComplete="current-password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>


                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password}</p>
                    )}




                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"} focus:outline-none focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <div className="my-4 flex justify-center">
                    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                        <GoogleLogin
                            onSuccess={handleGoogleSuccess}
                            onError={() => setError("Google authentication failed")}
                        />
                    </GoogleOAuthProvider>
                </div>

                <p className="mt-4 text-center text-sm text-gray-600">
                    Don't have an account?{" "}
                    <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Register here
                    </Link>
                </p>

            </div>
        </div>
    );




};
