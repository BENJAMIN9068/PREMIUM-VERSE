import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';

const ProtectedAdminRoute = ({ children }) => {
    const { admin, loading } = useAdminAuth();

    if (loading) {
        return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Admin Panel...</div>;
    }

    if (!admin) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedAdminRoute;
