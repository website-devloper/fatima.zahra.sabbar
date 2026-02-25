// /app/components/Projects.tsx
'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from './LocaleProvider';

interface IProject {
  _id?: string;
  title: string;
  description: string;
  image: string;
  tech: string[];
  link: string;
  category: string;
  featured: boolean;
  order: number;
}

const Projects = () => {
  const { t } = useLocale();
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('/api/projects');
        const data = await response.json();
        if (data.success) {
          setProjects(data.data || []);
        }
      } catch (error) {
        console.error('Error fetching projects:', error);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="projects-section position-relative overflow-hidden">
      <div className="hero-bg-glow" style={{ bottom: '10%', left: '-10%', width: '600px', height: '600px', opacity: '0.1' }}></div>

      <div className="container position-relative z-1">
        <div className="text-center mb-5" data-aos="fade-up">
          <h3 className="section-subtitle">{t('projects.subtitle')}</h3>
          <h2 className="section-title">{t('projects.title')} <span className="text-gradient">{t('projects.titleGradient')}</span></h2>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-5">
            <p className="text-white-60">No projects available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="row g-4">
            {projects.map((project, index) => {
              const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-cyan)', '#10b981', '#f59e0b', '#ef4444'];
              return (
                <div className="col-lg-4 col-md-6" key={project._id || index} data-aos="fade-up" data-aos-delay={index * 100}>
                  <div className="glass-panel h-100 project-card about-card overflow-hidden position-relative group" style={{ '--hover-color': colors[index % colors.length] } as React.CSSProperties}>
                    <div className="project-image-wrapper position-relative overflow-hidden">
                      <div className="overlay position-absolute w-100 h-100 bg-dark opacity-0 z-2 transition-all"></div>
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={300}
                        className="img-fluid w-100 object-fit-cover transition-all"
                        style={{ height: '200px' }}
                      />
                      <div className="project-action position-absolute top-50 start-50 translate-middle z-3 opacity-0 transition-all">
                        <a href={project.link} className="btn btn-primary rounded-circle p-3 d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px' }}>
                          <i className="bi bi-arrow-up-right fs-5"></i>
                        </a>
                      </div>
                    </div>

                    <div className="p-4">
                      <h5 className="text-white fw-bold mb-2">{project.title}</h5>
                      <p className="text-white-100 small mb-3">{project.description}</p>
                      <div className="d-flex flex-wrap gap-2">
                        {project.tech.map((t: string, i: number) => (
                          <span className="badge glass-badge fw-normal text-white-50" key={i}>{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
