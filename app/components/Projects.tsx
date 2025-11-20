// /app/components/Projects.tsx
import Image from 'next/image';

const projectsData = [
  { title: 'Portfolio Website', description: 'This personal portfolio, built with Next.js and a futuristic design.', tech: ['Next.js', 'Bootstrap', 'TypeScript'], link: '#', image: '/window.svg' },
  { title: 'AI Chatbot Integration', description: 'A smart chatbot integrated into a web app for customer support.', tech: ['React', 'Node.js', 'Dialogflow'], link: '#', image: '/window.svg' },
  { title: 'Web Application', description: 'A full-featured scalable web application for a client.', tech: ['Laravel', 'MySQL', 'Vue.js'], link: '#', image: '/window.svg' },
  { title: 'Automation Script', description: 'A Python script to automate data entry and report generation.', tech: ['Python', 'APIs'], link: '#', image: '/file.svg' },
  { title: 'WordPress Site', description: 'A clean and professional website for a business client.', tech: ['WordPress', 'PHP', 'CSS'], link: '#', image: '/window.svg' },
  { title: 'Cybersecurity Mini-Tool', description: 'A simple tool for scanning common web vulnerabilities.', tech: ['Node.js', 'Docker'], link: '#', image: '/file.svg' },
];

const Projects = () => {
  return (
    <section id="projects" className="projects-section position-relative overflow-hidden">
      <div className="hero-bg-glow" style={{ bottom: '10%', left: '-10%', width: '600px', height: '600px', opacity: '0.1' }}></div>

      <div className="container position-relative z-1">
        <div className="text-center mb-5">
          <h3 className="section-subtitle">My Work</h3>
          <h2 className="section-title">Featured <span className="text-gradient">Projects</span></h2>
        </div>

        <div className="row g-4">
          {projectsData.map((project, index) => {
            const colors = ['var(--primary-color)', 'var(--secondary-color)', 'var(--accent-cyan)', '#10b981', '#f59e0b', '#ef4444'];
            return (
              <div className="col-lg-4 col-md-6" key={index}>
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
                    <p className="text-white-50 small mb-3">{project.description}</p>
                    <div className="d-flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span className="badge glass-badge fw-normal text-white-50" key={i}>{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;

