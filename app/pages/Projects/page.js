'use client';
import { useState, useEffect } from 'react';
import { Image } from 'lucide-react';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/Project');
        if (response.ok) {
          const projectsData = await response.json();
          setProjects(projectsData);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const animateText = (selector, vars) => {
    gsap.fromTo(selector, { y: 100, opacity: 0 }, vars);
  };

  // Function to extract domain and get favicon
  const getFaviconUrl = (url) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  };

  const ProjectMedia = ({ project, className }) => {
    const [imageError, setImageError] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [faviconError, setFaviconError] = useState(false);

    const MediaPlaceholder = () => (
      <div className={`bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center ${className}`}>
        <div className="text-center text-white">
          <div className="text-5xl mb-2">🚀</div>
          <div className="text-base font-medium">{project.title}</div>
        </div>
      </div>
    );

    const DefaultImage = () => {
      const faviconUrl = getFaviconUrl(project.liveUrl);
      
      return (
        <div className={`bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center ${className}`}>
          {faviconUrl && !faviconError ? (
            <div className="text-center">
              <img
                src={faviconUrl}
                alt="Site favicon"
                className="w-16 h-16 mb-4 mx-auto"
                onError={() => setFaviconError(true)}
              />
              <div className="text-lg font-medium text-gray-700 dark:text-gray-300">{project.title}</div>
            </div>
          ) : (
            <div className="text-center text-gray-600 dark:text-gray-400">
              <div className="text-5xl mb-2">🌐</div>
              <div className="text-base font-medium">{project.title}</div>
            </div>
          )}
        </div>
      );
    };

    useGSAP(() => {
      animateText('.faq-h1', { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' });
      animateText('.faq-h2', { y: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: 'power3.out' });
      animateText('.faq-h3', { y: 0, opacity: 1, duration: 1.2, delay: 0.4, ease: 'power3.out' });
    }, []);

    if (project.videoUrl && !videoError) {
      return (
        <div className={`relative ${className}`}>
          <video
            muted
            loop
            playsInline
            autoPlay
            className="absolute inset-0 w-full h-full object-cover"
            onError={() => setVideoError(true)}
          >
            <source src={project.videoUrl} type="video/mp4" />
          </video>
        </div>
      );
    }

    if (project.imageUrl && !imageError) {
      return (
        <div className={`relative ${className}`}>
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      );
    }

    return <DefaultImage />;
  };

  // Define the ProjectCard component
  const ProjectCard = ({ project, getFaviconUrl }) => (
    <div className="shadow-lg overflow-hidden flex flex-col">
      <div className="relative h-56 w-full">
        <ProjectMedia project={project} className="h-full w-full" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">{project.description}</p>
        <div className="flex items-center space-x-4 mt-auto">
          {project.liveUrl && (
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline">
              <img
                src={getFaviconUrl(project.liveUrl)}
                alt="Favicon"
                className="w-5 h-5 mr-2"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              Live
            </Link>
          )}
          {project.repoUrl && (
            <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-gray-700 dark:text-gray-300 hover:underline">
              <span className="material-icons mr-1">code</span>
              Repo
            </Link>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <main className="bg-white dark:bg-neutral-900 text-black dark:text-white min-h-screen transition-colors duration-300">
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-6 sm:px-10 lg:px-16 relative overflow-hidden">
        <div className="faq_header relative">
          <div className="faq_header-wrapper mx-auto flex flex-col sm:flex-row items-center justify-between">
            <div className="flex-1 text-center sm:text-left font-mono text-gray-500 dark:text-gray-400">
              <h2 className="faq-h1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase text-gray-900 dark:text-white">Projects</h2>
              <h2 className="faq-h2 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase text-gray-900 dark:text-white">Overview</h2>
              <h2 className="faq-h3 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold uppercase text-gray-900 dark:text-white">Created for Clients and on Online Platforms</h2>
            </div>
          </div>
        </div>
      </section>

      <section className="selected-work py-24 px-6 sm:px-10 lg:px-16 w-full flex justify-center">
        <div className="selected-work-container max-w-7xl w-full">
          <div className="space-y-16">
            {Array.from({ length: Math.ceil(projects.length / 2) }).map((_, rowIndex) => (
              <div key={rowIndex} className="selected-work-grid grid grid-cols-1 sm:grid-cols-2 gap-10">
                {projects
                  .slice(rowIndex * 2, rowIndex * 2 + 2)
                  .map((project) => (
                    <ProjectCard key={project._id} project={project} getFaviconUrl={getFaviconUrl} />
                  ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
