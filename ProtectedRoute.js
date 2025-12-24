// AUTHENTICATION DEVELOPER (Priyanti): FIXED - Only 1 admin allowed
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  // FIXED: Only EXACT admin email allowed (students BLOCKED)
  if (adminOnly && user.email !== 'admin@eastdelta.edu.bd') {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
