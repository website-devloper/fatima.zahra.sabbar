import 'bootstrap-icons/font/bootstrap-icons.css';

const skillsData = [
  {
    icon: 'bi-code-slash',
    title: 'Frontend',
    description: 'HTML, CSS, JS, React, Next.js, Bootstrap',
    color: 'linear-gradient(135deg, #6366f1, #8b5cf6)', // Indigo
    shadow: 'rgba(99, 102, 241, 0.2)',
    iconColor: '#818cf8',
    bgAccent: 'rgba(99, 102, 241, 0.1)'
  },
  {
    icon: 'bi-server',
    title: 'Backend',
    description: 'PHP, Laravel, Node.js',
    color: 'linear-gradient(135deg, #f43f5e, #ec4899)', // Pink
    shadow: 'rgba(244, 63, 94, 0.2)',
    iconColor: '#fb7185',
    bgAccent: 'rgba(244, 63, 94, 0.1)'
  },
  {
    icon: 'bi-database-fill',
    title: 'Databases',
    description: 'MySQL, MongoDB',
    color: 'linear-gradient(135deg, #06b6d4, #3b82f6)', // Cyan
    shadow: 'rgba(6, 182, 212, 0.2)',
    iconColor: '#22d3ee',
    bgAccent: 'rgba(6, 182, 212, 0.1)'
  },
  {
    icon: 'bi-tools',
    title: 'Tools & DevOps',
    description: 'Git, Docker, APIs, Linux basics',
    color: 'linear-gradient(135deg, #10b981, #14b8a6)', // Emerald
    shadow: 'rgba(16, 185, 129, 0.2)',
    iconColor: '#34d399',
    bgAccent: 'rgba(16, 185, 129, 0.1)'
  },
  {
    icon: 'bi-robot',
    title: 'AI Tools',
    description: 'Automation workflows, chatbot integration',
    color: 'linear-gradient(135deg, #f59e0b, #d97706)', // Amber
    shadow: 'rgba(245, 158, 11, 0.2)',
    iconColor: '#fbbf24',
    bgAccent: 'rgba(245, 158, 11, 0.1)'
  },
  {
    icon: 'bi-shield-check',
    title: 'Cybersecurity',
    description: 'Cybersecurity basics and best practices',
    color: 'linear-gradient(135deg, #ef4444, #dc2626)', // Red
    shadow: 'rgba(239, 68, 68, 0.2)',
    iconColor: '#f87171',
    bgAccent: 'rgba(239, 68, 68, 0.1)'
  },
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section position-relative overflow-hidden">
      <div className="hero-bg-glow-2" style={{ top: '20%', right: '-10%', width: '600px', height: '600px', opacity: '0.15' }}></div>
      <div className="container position-relative z-1">
        <div className="text-center mb-5" data-aos="fade-up">
          <h3 className="section-subtitle">My Toolbox</h3>
          <h2 className="section-title">Skills & <span className="text-gradient">Technologies</span></h2>
        </div>
        <div className="row g-4">
          {skillsData.map((skill, index) => (
            <div className="col-lg-4 col-md-6" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
              <div
                className="why-card h-100"
                style={{
                  '--card-gradient': skill.color,
                  '--card-shadow': skill.shadow,
                  '--icon-color': skill.iconColor,
                  '--bg-accent': skill.bgAccent
                } as React.CSSProperties}
              >
                <div className="card-glow"></div>
                <div className="why-card-inner">
                  <div className="card-blob"></div>
                  <div className="why-icon-wrapper">
                    <i className={`bi ${skill.icon}`}></i>
                  </div>
                  <h3 className="why-card-title">{skill.title}</h3>
                  <p className="why-card-desc">{skill.description}</p>
                  <div className="card-border-bottom"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;

