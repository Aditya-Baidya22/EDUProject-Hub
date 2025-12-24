// FRONTEND DEVELOPER (Shimanta): Home page UI
// BACKEND DEVELOPER (Aditya): Uses GET /api/projects (slices first 4 client-side - FIXED)

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/projects';

const Home = () => {
  const [recentProjects, setRecentProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // FIXED: Backend supports GET /api/projects, slice first 4 here
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        const recent = (data || []).slice(0, 4); // Client-side limit 4
        setRecentProjects(recent);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading recent projects:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Welcome to EDUProject Hub
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Explore and share university projects easily.
        </p>
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-900">Recent Projects</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentProjects.map((project) => (
            <article
              key={project._id}
              className="bg-white rounded-xl shadow-md p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">
                  {project.department} • {project.year}
                </p>
                <p className="text-sm text-gray-700 mb-4">
                  {project.description?.substring(0, 100)}...
                </p>
              </div>
              <button
                onClick={() => navigate(`/project/${project._id}`)}
                className="mt-2 inline-flex justify-center px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                View Project
              </button>
            </article>
          ))}
          {recentProjects.length === 0 && (
            <p className="text-gray-500 col-span-full text-center">
              No recent projects. Be the first to submit!
            </p>
          )}
        </div>
      </section>

      <section className="text-center">
        <button
          onClick={() => navigate('/projects')}
          className="inline-flex px-6 py-3 bg-emerald-500 text-white rounded-xl text-base font-semibold hover:bg-emerald-600"
        >
          Browse All Projects
        </button>
      </section>
    </main>
  );
};

export default Home;
