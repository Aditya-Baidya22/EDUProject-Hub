// FRONTEND DEVELOPER (Shimanta): Form UI for submitting new projects
// BACKEND DEVELOPER (Aditya): Sends POST /api/projects (API part)
// DATABASE ADMIN (Samrat): Data saved into MongoDB Project collection (database link)
// AUTHENTICATION DEVELOPER (Priyanti): This page is protected by ProtectedRoute (only logged-in users)

import { useState } from 'react';

const API_URL = 'http://localhost:5000/api/projects';

const SubmitProject = () => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    year: '',
    teamName: '',
    description: '',
    technologies: '',
    githubLink: '',
    teamMembers: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // FRONTEND: Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // FRONTEND-BACKEND LINK: Submit form data to backend API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Convert comma-separated strings to arrays
      const projectData = {
        ...formData,
        technologies: formData.technologies
          .split(',')
          .map(t => t.trim())
          .filter(t => t),
        teamMembers: formData.teamMembers
          .split(',')
          .map(m => m.trim())
          .filter(m => m),
      };

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        setMessage('✅ Project submitted successfully! Check All Projects.');
        setFormData({
          title: '',
          department: '',
          year: '',
          teamName: '',
          description: '',
          technologies: '',
          githubLink: '',
          teamMembers: '',
        });
      } else {
        setMessage('❌ Error submitting project');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setMessage('❌ Network error. Is backend running?');
    }
    setLoading(false);
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
        Submit Your Project
      </h1>

      {message && (
        <div
          className={`mb-4 px-4 py-3 rounded-lg border-l-4 ${
            message.includes('✅')
              ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
              : 'bg-red-50 border-red-500 text-red-800'
          }`}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-6 space-y-4"
      >
        <div>
          <label className="block font-semibold mb-1">Project Title *</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg border-gray-300"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="block font-semibold mb-1">Department *</label>
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg border-gray-300"
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Year *</label>
            <input
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg border-gray-300"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Team Name *</label>
          <input
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-lg border-gray-300"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            className="w-full px-3 py-2 border rounded-lg border-gray-300"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Technologies (comma separated)
          </label>
          <input
            name="technologies"
            value={formData.technologies}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className="w-full px-3 py-2 border rounded-lg border-gray-300"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">GitHub Link</label>
          <input
            name="githubLink"
            value={formData.githubLink}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg border-gray-300"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">
            Team Members (comma separated)
          </label>
          <textarea
            name="teamMembers"
            value={formData.teamMembers}
            onChange={handleChange}
            rows="3"
            placeholder="Member 1, Member 2, Member 3"
            className="w-full px-3 py-2 border rounded-lg border-gray-300"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Submitting...' : 'Submit Project'}
        </button>
      </form>
    </main>
  );
};

export default SubmitProject;
