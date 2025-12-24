// FRONTEND DEVELOPER (Shimanta): FIXED - Hide Admin button for students
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Header = () => {
  const { user } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    await signOut(auth);
  };

  // FIXED: Check if user is admin (exact email match)
  const isAdmin = user && user.email === 'admin@eastdelta.edu.bd';

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-900">
          EDUProject Hub
        </Link>
        
        <nav className="flex items-center space-x-6">
          <Link to="/" className={`hover:text-blue-600 font-medium ${location.pathname === '/' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>
            Home
          </Link>
          <Link to="/projects" className={`hover:text-blue-600 font-medium ${location.pathname === '/projects' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>
            All Projects
          </Link>
          
          {user ? (
            <>
              <Link to="/submit" className={`hover:text-blue-600 font-medium ${location.pathname === '/submit' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>
                Submit Project
              </Link>
              
              {/* FIXED: Admin button ONLY for admin@eastdelta.edu.bd */}
              {isAdmin && (
                <Link to="/admin" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium">
                  Admin
                </Link>
              )}
              
              <button 
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={`hover:text-blue-600 font-medium ${location.pathname === '/login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
