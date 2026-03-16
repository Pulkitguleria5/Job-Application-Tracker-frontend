import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import axios from "../api/axios";
import { useAuth } from "../context/authContext";

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors(prev => ({ ...prev, [e.target.name]: "" }));
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
            setUser(response.data.user);
            navigate("/dashboard");
        } catch (err) {
            if (err.response?.data?.errors) {
                const backendErrors = {};
                err.response.data.errors.forEach((e) => {
                    backendErrors[e.field] = e.message;
                });
                setErrors(backendErrors);
            } else {
                setErrors({ general: err.response?.data?.message || "Login failed" });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post("/auth/google-sso", { credential: credentialResponse.credential });
            setUser(response.data.user);
            navigate("/dashboard");
        } catch (err) {
            setErrors({ general: err.response?.data?.message || "Google SSO failed" });
        }
    };

    const inputClass = "mt-1 block w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-800 text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-indigo-50 px-4">
            <div className="w-full max-w-md">

                {/* Brand */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl mb-3">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">CareerFlow</h1>
                    <p className="text-slate-500 text-sm mt-1">Sign in to your account</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">

                    {errors.general && (
                        <div className="mb-4 px-4 py-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-sm">
                            {errors.general}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input
                                type="email" name="email" autoComplete="email" required
                                value={formData.email} onChange={handleChange}
                                className={inputClass}
                                placeholder="you@example.com"
                            />
                            {errors.email && <p className="mt-1 text-xs text-rose-600">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input
                                type="password" name="password" autoComplete="current-password" required
                                value={formData.password} onChange={handleChange}
                                className={inputClass}
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="mt-1 text-xs text-rose-600">{errors.password}</p>}
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-lg shadow-sm transition-colors text-sm"
                        >
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </form>

                    <div className="relative my-5">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs text-slate-400 bg-white px-2">
                            or continue with
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => setErrors({ general: "Google authentication failed" })}
                            />
                        </GoogleOAuthProvider>
                    </div>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Don't have an account?{" "}
                        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Create one
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
