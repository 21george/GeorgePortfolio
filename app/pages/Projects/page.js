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

  const ProjectMedia = ({ project, className }) => {
    const [imageError, setImageError] = useState(false);
    const [videoError, setVideoError] = useState(false);

    const MediaPlaceholder = () => (
      <div className={`bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center ${className}`}>
        <div className="text-center text-white">
          <div className="text-5xl mb-2">🚀</div>
          <div className="text-base font-medium">{project.title}</div>
        </div>
      </div>
    );

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

    return <MediaPlaceholder />;
  };

  

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

      <section className="px-6 mt-[8em] sm:px-10 lg:px-16 w-full flex justify-center pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12 max-w-7xl">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project._id}`}
              className="cursor-pointer group"
            >
              <div className="relative mb-4">
                <div className="text-sm text-gray-500 font-mono mb-2">{project.projectNumber}</div>
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                  <ProjectMedia project={project} className="w-full h-full" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-500 transition-colors">
                {project.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
