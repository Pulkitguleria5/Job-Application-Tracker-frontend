import {Outlet, Navigate} from 'react-router-dom';
import { useAuth } from '../context/authContext';

export const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // You can replace this with a spinner or skeleton
    }

    return user ? <Outlet/> : <Navigate to="/login" />;
};

