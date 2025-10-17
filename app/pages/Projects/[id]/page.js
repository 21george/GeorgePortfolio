'use client';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { projectsData } from '../../data/projectsData';

export default function ProjectPage() {
  const router = useRouter();
  const { id } = router.query;
  const [project, setProject] = useState(null);

  useEffect(() => {
    if (id && projectsData[id]) {
      setProject(projectsData[id]);
    }
  }, [id]);

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div id="main-container">
      <MenuComponent />
      
      <section className="switchPage" data-barba="container" data-barba-namespace="single-portfolio">
        <ProjectHero project={project} />
        
        {project.sections?.map((section, index) => (
          <DynamicSection key={index} section={section} />
        ))}
        
        <FeaturedProjects projects={project.featuredProjects} />
      </section>
    </div>
  );
}

// Menu Component
function MenuComponent() {
  return (
    <div className="menu-wrap">
      <div className="menu-wrap-header">
        <a href="./" className="logo-text">
          <svg width="20" height="47" viewBox="0 0 20 47" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo">
            <path fillRule="evenodd" clipRule="evenodd" d="M20.0002 12.3494V7.73741L0.000244141 0V4.52789L4.45404 6.13163L7.73094 7.30767L15.07 9.97153V10.0291L7.73094 12.6076L4.45404 13.7823L0.000244141 15.3304V20L20.0002 12.3494Z" fill="currentColor"></path>
            <path fillRule="evenodd" clipRule="evenodd" d="M0 34.1635L20 27V31.993L5.93817 36.923V36.9853L20 41.9762L20 47L0 39.6517L0 34.1635Z" fill="currentColor"></path>
          </svg>
        </a>
        <button className="button-close" title="Close menu" aria-label="Close menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path>
          </svg>
        </button>
      </div>
      <main className="menu-wrap-main">
        <nav>
          <section className="nav">
            <a href="./work" className="nav-link">
              <span className="nav-link-text">Work</span>
              <span className="nav-link-text">.Work</span>
            </a>
            <a href="./about" className="nav-link">
              <span className="nav-link-text">About</span>
              <span className="nav-link-text">.About</span>
            </a>
            <a href="./lab" className="nav-link">
              <span className="nav-link-text">Lab</span>
              <span className="nav-link-text">.Lab</span>
            </a>
            <a href="./contact" className="nav-link contact-button-menu">
              <span className="nav-link-text">Contact me</span>
              <span className="nav-link-text">.Contact me</span>
            </a>
          </section>
          <section className="socials">
            <ul className="socials-links">
              <li className="socials-links-horizontal">
                <a href="https://www.behance.net/lucavolino" target="_blank" rel="noopener noreferrer">BEHANCE</a>
              </li>
              <li className="socials-links-horizontal">
                <a href="https://dribbble.com/lucavolino" target="_blank" rel="noopener noreferrer">DRIBBBLE</a>
              </li>
              <li className="socials-links-horizontal">
                <a href="https://www.instagram.com/volinodesign/" target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
              </li>
              <li className="socials-links-horizontal">
                <a href="https://www.linkedin.com/in/lucavolino/" target="_blank" rel="noopener noreferrer">LINKEDIN</a>
              </li>
              <li className="socials-links-horizontal">
                <a href="https://x.com/lucavolino" target="_blank" rel="noopener noreferrer">X (TWITTER)</a>
              </li>
            </ul>
          </section>
        </nav>
      </main>
      <footer className="menu-wrap-footer">
        <p>Play Reel</p>
        <a href="mailto:info@lucavolino.com">
          <h3>Lets work together</h3>
        </a>
      </footer>
    </div>
  );
}

// Dynamic Project Hero
function ProjectHero({ project }) {
  return (
    <section className={`portfolio-hero ${project.heroClass || 'default-hero'}`}>
      <div className="portfolio-hero-container">
        <div className="portfolio-hero-content">
          <div className="portfolio-hero-top">
            <div className="portfolio-hero-left">
              <div className="portfolio-hero-titles">
                <h1 className="portfolio-hero-title words chars splitting" data-splitting="">
                  {project.title}
                </h1>
                <h2 className="portfolio-hero-subtitle">
                  {project.subtitle}
                </h2>
              </div>
              
              {project.mobileHeroImage && (
                <div className={`portfolio-hero-image-mobile ${project.mobileImageClass || ''}`}>
                  <img src={project.mobileHeroImage} alt={`${project.title} Interface`} />
                </div>
              )}
              
              <div className="portfolio-hero-description">
                <p>{project.description}</p>
                
                {project.websiteUrl && (
                  <div className="featured-projects-button-container">
                    <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="featured-projects-button">
                      <span>{project.websiteButtonText || 'Visit website'}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
            
            <div className="portfolio-hero-right">
              <div className="portfolio-hero-details">
                <div className="portfolio-hero-detail-item">
                  <span className="portfolio-hero-detail-label">Role</span>
                  <span className="portfolio-hero-detail-value" dangerouslySetInnerHTML={{ __html: project.role }}></span>
                </div>
                <div className="portfolio-hero-detail-item">
                  <span className="portfolio-hero-detail-label">Goal</span>
                  <span className="portfolio-hero-detail-value" dangerouslySetInnerHTML={{ __html: project.goal }}></span>
                </div>
                <div className="portfolio-hero-detail-item">
                  <span className="portfolio-hero-detail-label">Year</span>
                  <span className="portfolio-hero-detail-value">{project.year}</span>
                </div>
              </div>
            </div>
          </div>
          
          {project.heroImage && (
            <div className={`portfolio-hero-image ${project.heroImageClass || ''}`}>
              <img src={project.heroImage} alt={`${project.title} Application Interface`} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Dynamic Section Renderer
function DynamicSection({ section }) {
  const sectionComponents = {
    'core-problem': CoreProblemSection,
    'personas': PersonasSection,
    'storyboard': StoryboardSection,
    'wireframing': WireframingSection,
    'brand-identity': BrandIdentitySection,
    'ui-design': UIDesignSection,
    'ui-design-2': UIDesignSection2,
    'interactive-prototype': InteractivePrototypeSection,
    'results-recognition': ResultsRecognitionSection,
    'default': DefaultSection
  };

  const Component = sectionComponents[section.type] || DefaultSection;
  
  return <Component section={section} />;
}

// Core Problem Section with Charts
function CoreProblemSection({ section }) {
  return (
    <section className="portfolio-section core-problem">
      <div className="portfolio-section-container">
        <div className="portfolio-section-content">
          <div className="portfolio-section-text">
            <h2 className="portfolio-section-title words chars splitting" data-splitting="">
              {section.title}
            </h2>
            <div className="portfolio-section-description">
              {section.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {section.hasCharts && (
            <div className="research-results">
              <ResearchCharts data={section.chartsData} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Personas Section
function PersonasSection({ section }) {
  return (
    <section className="portfolio-section personas-section">
      <div className="portfolio-section-container">
        <div className="portfolio-section-content personas-content">
          <div className="portfolio-section-text">
            <h2 className="portfolio-section-title words chars splitting" data-splitting="">
              {section.title}
            </h2>
            <div className="portfolio-section-description">
              {section.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="personas-grid">
            {section.personas.map((persona, index) => (
              <div key={index} className="persona-card">
                <h3 className="persona-name">{persona.name}</h3>
                <div className="persona-avatar">
                  <img src={persona.avatar} alt={`${persona.name} Avatar`} className="avatar-svg" />
                </div>
                <div className="persona-details" dangerouslySetInnerHTML={{ __html: persona.details }}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Storyboard Section
function StoryboardSection({ section }) {
  return (
    <section className="portfolio-section storyboard-section">
      <div className="portfolio-section-container">
        <div className="portfolio-section-content storyboard-content">
          <div className="portfolio-section-text">
            <h2 className="portfolio-section-title words chars splitting" data-splitting="">
              {section.title}
            </h2>
            <div className="portfolio-section-description">
              {section.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="storyboard-grid">
            {section.steps.map((step, index) => (
              <div key={index} className="storyboard-step">
                <div className="storyboard-image">
                  <img src={step.image} alt={step.title} className="storyboard-svg" />
                </div>
                <div className="storyboard-text">
                  <h4 className="storyboard-step-title">{step.title}</h4>
                  <p className="storyboard-step-description">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Default Section for Simple Content
function DefaultSection({ section }) {
  return (
    <section className={`portfolio-section ${section.className || ''}`}>
      <div className="portfolio-section-container">
        <div className="portfolio-section-content">
          <div className="portfolio-section-text">
            <h2 className="portfolio-section-title words chars splitting" data-splitting="">
              {section.title}
            </h2>
            <div className="portfolio-section-description">
              {Array.isArray(section.content) ? 
                section.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                )) :
                <div dangerouslySetInnerHTML={{ __html: section.content }} />
              }
            </div>
          </div>

          {section.image && (
            <div className={section.imageContainerClass || 'section-image-container'}>
              <img src={section.image} alt={section.imageAlt || section.title} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Featured Projects Section
function FeaturedProjects({ projects }) {
  if (!projects || projects.length === 0) return null;
  
  return (
    <section className="featured-projects">
      <div className="featured-projects-container">
        <div className="featured-projects-content">
          <h2 className="featured-projects-title words chars splitting" data-splitting="">
            Featured Projects
          </h2>
          <p className="featured-projects-subtitle">
            Strategic design solutions that solve real problems and deliver measurable results
          </p>
        </div>

        <div className="featured-projects-grid">
          {projects.map((project, index) => (
            <article key={index} className="featured-projects-card">
              <a href={project.url} className="featured-projects-card-link">
                <div className="featured-projects-card-image">
                  <img src={project.image} alt={`${project.title} Interface`} />
                </div>
                <div className="featured-projects-card-content">
                  <h3 className="featured-projects-card-title">{project.title}</h3>
                  <p className="featured-projects-card-subtitle">{project.subtitle}</p>
                  <p className="featured-projects-card-description">{project.description}</p>
                </div>
              </a>
            </article>
          ))}
        </div>

        <div className="featured-projects-button-container">
          <a href="./work" className="featured-projects-button">
            <span>View all works</span>
          </a>
        </div>
      </div>
    </section>
  );
}

// Research Charts Component (placeholder)
function ResearchCharts({ data }) {
  return (
    <div className="research-charts-container">
      {/* Add your dynamic chart rendering logic here */}
      <p>Dynamic charts would be rendered here based on the data prop</p>
    </div>
  );
}
