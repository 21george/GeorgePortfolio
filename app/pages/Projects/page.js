'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [focusedCardIndex, setFocusedCardIndex] = useState(null);

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

  useGSAP(() => {
    animateText('.faq-h1', { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' });
    animateText('.faq-h2', { y: 0, opacity: 1, duration: 1.2, delay: 0.2, ease: 'power3.out' });
    animateText('.faq-h3', { y: 0, opacity: 1, duration: 1.2, delay: 0.4, ease: 'power3.out' });
  }, []);

  const handleFocus = (index) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
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

  // Get project category/tag
  const getProjectTag = (project) => {
    if (project.technologies && project.technologies.length > 0) {
      return project.technologies[0];
    }
    return 'Development';
  };

  // Default RN Image Component
  const DefaultRNImage = ({ project }) => (
    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white">
      <div className="text-center">
        <div className="text-4xl mb-2">⚛️</div>
        <div className="text-sm font-semibold">React Native</div>
        <div className="text-xs opacity-80 mt-1">{project.title}</div>
      </div>
    </div>
  );

  // Project Media Component
  const ProjectMedia = ({ project }) => {
    const [imageError, setImageError] = useState(false);
    const [videoError, setVideoError] = useState(false);
    const [faviconError, setFaviconError] = useState(false);

    const DefaultImage = () => {
      const faviconUrl = getFaviconUrl(project.liveUrl);
      
      return (
        <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex flex-col items-center justify-center rounded-lg">
          {faviconUrl && !faviconError ? (
            <div className="text-center">
              <img
                src={faviconUrl}
                alt="Site favicon"
                width="48"
                height="48"
                className="w-12 h-12 mb-2 mx-auto"
                onError={() => setFaviconError(true)}
              />
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{project.title}</div>
            </div>
          ) : (
            <DefaultRNImage project={project} />
          )}
        </div>
      );
    };

    if (project.videoUrl && !videoError) {
      return (
        <div className="w-full h-48 relative rounded-lg overflow-hidden">
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
        <div className="w-full h-48 relative rounded-lg overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
            onError={() => setImageError(true)}
          />
        </div>
      );
    }

    return <DefaultImage />;
  };

  // Project Links Component (fixed favicon issue)
  const ProjectLinks = ({ project }) => (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-4 text-sm">
        {project.liveUrl && (
          <Link 
            href={project.liveUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-blue-600 dark:text-blue-400 hover:underline transition-colors"
          >
            <img
              src={getFaviconUrl(project.liveUrl)}
              alt="Favicon"
              width="16"
              height="16"
              className="w-4 h-4 mr-1"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            Live Demo
          </Link>
        )}
        {project.repoUrl && (
          <Link 
            href={project.repoUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
            </svg>
            Repository
          </Link>
        )}
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {project.createdAt ? new Date(project.createdAt).toLocaleDateString() : 'Recent'}
      </span>
    </div>
  );

  if (loading) {
    return (
      <main className="bg-white dark:bg-neutral-900 text-black dark:text-white min-h-screen transition-colors duration-300">
        <div className="pt-24 px-6 sm:px-10 lg:px-16">
          <div className="animate-pulse">Loading projects...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white dark:bg-neutral-900 text-black dark:text-white min-h-screen transition-colors duration-300">
      {/* Header section */}
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

      {/* Projects list */}
      <section className="py-16 px-6 sm:px-10 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
            {projects.map((project, index) => (
              <div key={project._id} className="flex flex-col gap-4 h-full">
                <ProjectMedia project={project} />
                
                <div className="flex flex-col gap-2 flex-1">
                  <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide font-medium">
                    {getProjectTag(project)}
                  </div>
                  
                  <h3 
                    className={`text-xl font-semibold cursor-pointer relative group transition-all duration-300 ${
                      focusedCardIndex === index ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                    onFocus={() => handleFocus(index)}
                    onBlur={handleBlur}
                    onMouseEnter={() => handleFocus(index)}
                    onMouseLeave={handleBlur}
                    tabIndex={0}
                  >
                    {project.title}
                    <svg 
                      className={`inline-block w-4 h-4 ml-2 transition-all duration-300 ${
                        focusedCardIndex === index ? 'opacity-70 visible' : 'opacity-0 invisible'
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)'
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <div 
                      className={`absolute bottom-0 left-0 h-px bg-current transition-all duration-300 ${
                        focusedCardIndex === index ? 'w-full opacity-30' : 'w-0 opacity-0'
                      }`}
                    />
                  </h3>
                  
                  <div 
                    className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-1"
                    style={{
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 2,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {project.description}
                  </div>

                  <div className="mt-4">
                    <ProjectLinks project={project} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          <div className="flex justify-center pt-8">
            <div className="flex space-x-2">
              {Array.from({ length: Math.min(5, Math.ceil(projects.length / 10)) }, (_, i) => (
                <button
                  key={i}
                  className={`px-3 py-1 text-sm rounded transition-colors ${
                    i === 0 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
