'use client';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLocale } from './LocaleProvider';

const Skills = () => {
  const { t } = useLocale();

  const skillsData = [
    {
      key: 'frontend',
      icon: 'bi-code-slash',
      color: 'linear-gradient(135deg, #6366f1, #8b5cf6)', // Indigo
      shadow: 'rgba(99, 102, 241, 0.2)',
      iconColor: '#818cf8',
      bgAccent: 'rgba(99, 102, 241, 0.1)'
    },
    {
      key: 'backend',
      icon: 'bi-server',
      color: 'linear-gradient(135deg, #f43f5e, #ec4899)', // Pink
      shadow: 'rgba(244, 63, 94, 0.2)',
      iconColor: '#fb7185',
      bgAccent: 'rgba(244, 63, 94, 0.1)'
    },
    {
      key: 'databases',
      icon: 'bi-database-fill',
      color: 'linear-gradient(135deg, #06b6d4, #3b82f6)', // Cyan
      shadow: 'rgba(6, 182, 212, 0.2)',
      iconColor: '#22d3ee',
      bgAccent: 'rgba(6, 182, 212, 0.1)'
    },
    {
      key: 'devops',
      icon: 'bi-tools',
      color: 'linear-gradient(135deg, #10b981, #14b8a6)', // Emerald
      shadow: 'rgba(16, 185, 129, 0.2)',
      iconColor: '#34d399',
      bgAccent: 'rgba(16, 185, 129, 0.1)'
    },
    {
      key: 'ai',
      icon: 'bi-robot',
      color: 'linear-gradient(135deg, #f59e0b, #d97706)', // Amber
      shadow: 'rgba(245, 158, 11, 0.2)',
      iconColor: '#fbbf24',
      bgAccent: 'rgba(245, 158, 11, 0.1)'
    },
    {
      key: 'security',
      icon: 'bi-shield-check',
      color: 'linear-gradient(135deg, #ef4444, #dc2626)', // Red
      shadow: 'rgba(239, 68, 68, 0.2)',
      iconColor: '#f87171',
      bgAccent: 'rgba(239, 68, 68, 0.1)'
    },
  ];

  return (
    <section id="skills" className="skills-section position-relative overflow-hidden">
      <div className="hero-bg-glow-2" style={{ top: '20%', right: '-10%', width: '600px', height: '600px', opacity: '0.15' }}></div>
      <div className="container position-relative z-1">
        <div className="text-center mb-5" data-aos="fade-up">
          <h3 className="section-subtitle">{t('skills.subtitle')}</h3>
          <h2 className="section-title">{t('skills.title')} <span className="text-gradient">{t('skills.titleGradient')}</span></h2>
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
                  <h3 className="why-card-title">{t(`skills.items.${skill.key}.title`)}</h3>
                  <p className="why-card-desc">{t(`skills.items.${skill.key}.description`)}</p>
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
