import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchUser = async () => {
        try {
            const response = await axios.get('/auth/me'); // Endpoint to get current user
            setUser(response.data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    const value = useMemo(() => ({ user, loading, setUser }), [user, loading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}