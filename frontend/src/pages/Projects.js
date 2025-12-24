// FRONTEND DEVELOPER (Shimanta): All projects listing page UI with search/filter
// BACKEND DEVELOPER (Aditya): Uses GET /api/projects to fetch all projects (frontend-backend link)

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/projects';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [displayProjects, setDisplayProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simple client-side search/filter (for CSE 242 level)
  const [search, setSearch] = useState('');
  const [department, setDepartment] = useState('All');
  const [year, setYear] = useState('All');

  const navigate = useNavigate();

  useEffect(() => {
    // API PART (Aditya): Fetch all projects from backend
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        setProjects(data || []);
        setDisplayProjects(data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setLoading(false);
      });
  }, []);

  // Simple filter logic
  useEffect(() => {
    let filtered = [...projects];
    if (search.trim()) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (department !== 'All') {
      filtered = filtered.filter(p => p.department === department);
    }
    if (year !== 'All') {
      filtered = filtered.filter(p => p.year === year);
    }
    setDisplayProjects(filtered);
  }, [search, department, year, projects]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-600">
        Loading projects...
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        All Projects ({displayProjects.length})
      </h1>

      {/* Search & Filters (Frontend only) */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search projects by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[220px] px-3 py-2 border rounded-lg border-gray-300"
        />
        <select
          value={department}
          onChange={e => setDepartment(e.target.value)}
          className="px-3 py-2 border rounded-lg border-gray-300"
        >
          <option value="All">All Departments</option>
          <option value="CSE">CSE</option>
          <option value="EEE">EEE</option>
          <option value="BBA">BBA</option>
        </select>
        <select
          value={year}
          onChange={e => setYear(e.target.value)}
          className="px-3 py-2 border rounded-lg border-gray-300"
        >
          <option value="All">All Years</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>
      </div>

      {/* Projects grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {displayProjects.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            No projects found. <span className="underline cursor-pointer" onClick={() => navigate('/submit')}>Submit the first project!</span>
          </p>
        ) : (
          displayProjects.map((project) => (
            <article
              key={project._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex flex-col justify-between"
            >
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-1">
                  {project.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  {project.department} • {project.year}
                </p>
                <p className="text-sm text-gray-700 mb-3">
                  {project.description}
                </p>
              </div>
              <button
                onClick={() => navigate(`/project/${project._id}`)}
                className="mt-2 w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
              >
                View Details
              </button>
            </article>
          ))
        )}
      </div>

      <div className="mt-8 text-center text-gray-400 text-sm">
        2025 EDUProject Hub • All Projects
      </div>
    </main>
  );
};

export default Projects;
