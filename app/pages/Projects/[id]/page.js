'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Fetch project by ID
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/project/${id}`);
        if (response.ok) {
          const projectData = await response.json();
          setProject(projectData);
        } else {
          console.error('Project not found');
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProject();
  }, [id]);

  // GSAP animations
  useGSAP(() => {
    if (project) {
      gsap.fromTo(
        '.project-header',
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.project-content',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.project-media',
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1, delay: 0.5, ease: 'power3.out' }
      );
    }
  }, [project]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-2xl text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-gray-500 mb-4">Project not found</h1>
          <Link href="/projects" className="text-blue-500 hover:underline">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  // Media component
  const ProjectMedia = () => {
    if (project.videoUrl && !videoError) {
      return (
        <video
          muted
          loop
          playsInline
          autoPlay
          className="w-full h-full object-cover rounded-lg"
          onError={() => setVideoError(true)}
        >
          <source src={project.videoUrl} type="video/mp4" />
        </video>
      );
    }

    if (project.imageUrl && !imageError) {
      return (
        <Image
          src={project.imageUrl}
          alt={project.title}
          width={800}
          height={500}
          priority
          className="w-full h-auto object-cover rounded-lg"
          onError={() => setImageError(true)}
        />
      );
    }

    return (
      <div className="w-full h-64 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center rounded-lg">
        <div className="text-center text-white">
          <div className="text-5xl mb-2">🚀</div>
          <div className="text-xl font-medium">{project.title}</div>
        </div>
      </div>
    );
  };

  return (
    <main className="bg-white dark:bg-neutral-900 text-black dark:text-white min-h-screen transition-colors duration-300">
      {/* Back Button */}
      <div className="pt-24 px-6 sm:px-10 lg:px-16">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Projects
        </button>
      </div>

      {/* Project Header */}
      <section className="pt-12 pb-8 px-6 sm:px-10 lg:px-16">
        <div className="project-header max-w-6xl mx-auto">
          <div className="text-sm text-gray-500 font-mono mb-4">{project.projectNumber}</div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {project.title}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
            {project.description}
          </p>
          <div className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium mb-8">
            {project.category}
          </div>
        </div>
      </section>

      {/* Project Media */}
      <section className="px-6 sm:px-10 lg:px-16 mb-12">
        <div className="project-media max-w-6xl mx-auto aspect-[16/9]">
          <ProjectMedia />
        </div>
      </section>

      {/* Project Content */}
      <section className="px-6 sm:px-10 lg:px-16 pb-20">
        <div className="project-content max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Project Overview
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
              {project.fullDescription}
            </p>

            {/* Technologies */}
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-3 mb-8">
              {project.technologies?.map((tech, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                Project Links
              </h3>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-3 px-4 rounded-lg transition-colors mb-4"
                >
                  View Live Project
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-gray-800 hover:bg-gray-900 text-white text-center py-3 px-4 rounded-lg transition-colors"
                >
                  View on GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
