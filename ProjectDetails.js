// FRONTEND DEVELOPER (Shimanta): Single project details UI
// BACKEND DEVELOPER (Aditya): Uses GET /api/projects/:id (API part)
// DATABASE ADMIN (Samrat): Data comes from MongoDB Project model (database link part)

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const API_URL = 'http://localhost:5000/api/projects';

const ProjectDetails = () => {
  const { id } = useParams(); // Get :id from URL (React Router)
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API PART: Fetch single project by ID
    fetch(`${API_URL}/${id}`)
      .then(res => res.json())
      .then(data => {
        setProject(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading project details:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen text-gray-600">
        Loading project...
      </main>
    );
  }

  if (!project) {
    return (
      <main className="flex items-center justify-center min-h-screen text-red-500">
        Project not found
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <article className="bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {project.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
          <span className="text-blue-600 font-semibold">{project.department}</span>
          <span>{project.year}</span>
          <span>Team: {project.teamName}</span>
        </div>

        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Description</h2>
          <p className="text-gray-700 leading-relaxed">
            {project.description}
          </p>
        </section>

        {project.technologies?.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Technologies</h2>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>
        )}

        {project.githubLink && (
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">GitHub</h2>
            <a
              href={project.githubLink}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline"
            >
              View GitHub Repository
            </a>
          </section>
        )}

        {project.teamMembers?.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Team Members</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {project.teamMembers.map((member, i) => (
                <li key={i} className="py-0.5">
                  {member}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
};

export default ProjectDetails;
