import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axios";

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(prev => ({ ...prev, [e.target.name]: "" }));
    };

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
        } catch (err) {
            if (err.response?.data?.errors) {
                const backendErrors = {};
                err.response.data.errors.forEach((e) => {
                    backendErrors[e.field] = e.message;
                });
                setError(backendErrors);
            } else {
                setError({ general: err.response?.data?.message || "Registration failed" });
            }
        } finally {
            setLoading(false);
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
                    <p className="text-slate-500 text-sm mt-1">Create your account</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8">

                    {error.general && (
                        <div className="mb-4 px-4 py-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-sm">
                            {error.general}
                        </div>
                    )}

                    {success && (
                        <div className="mb-4 px-4 py-3 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-lg text-sm text-center">
                            🎉 Account created! Redirecting to login...
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input
                                type="text" name="name" autoComplete="name" required
                                value={formData.name} onChange={handleChange}
                                className={inputClass}
                                placeholder="John Doe"
                            />
                            {error.name && <p className="mt-1 text-xs text-rose-600">{error.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input
                                type="email" name="email" autoComplete="email" required
                                value={formData.email} onChange={handleChange}
                                className={inputClass}
                                placeholder="you@example.com"
                            />
                            {error.email && <p className="mt-1 text-xs text-rose-600">{error.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input
                                type="password" name="password" autoComplete="new-password" required
                                value={formData.password} onChange={handleChange}
                                className={inputClass}
                                placeholder="At least 6 characters"
                            />
                            {error.password && <p className="mt-1 text-xs text-rose-600">{error.password}</p>}
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-lg shadow-sm transition-colors text-sm"
                        >
                            {loading ? "Creating account..." : "Create account"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-500">
                        Already have an account?{" "}
                        <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
