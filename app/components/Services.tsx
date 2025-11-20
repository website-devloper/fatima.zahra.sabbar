import 'bootstrap-icons/font/bootstrap-icons.css';

const servicesData = [
  {
    icon: 'bi-display',
    title: 'Website & Web App Development',
    description: 'Creating responsive, high-performance websites and applications tailored to your personal or business needs.',
    color: 'var(--primary-color)'
  },
  {
    icon: 'bi-gear-wide-connected',
    title: 'IT & Automation Solutions',
    description: 'Building custom scripts and AI-powered workflows to automate repetitive tasks and boost your efficiency.',
    color: 'var(--secondary-color)'
  },
  {
    icon: 'bi-palette',
    title: 'UI/UX Design',
    description: 'Designing intuitive, user-friendly interfaces with a clean and modern aesthetic for your digital projects.',
    color: 'var(--accent-cyan)'
  },
  {
    icon: 'bi-phone',
    title: 'Mobile App Development',
    description: 'Building cross-platform mobile applications that provide seamless user experiences on iOS and Android.',
    color: '#10b981'
  },
  {
    icon: 'bi-graph-up-arrow',
    title: 'SEO & Digital Marketing',
    description: 'Optimizing your online presence to drive traffic, improve rankings, and grow your business reach.',
    color: '#f59e0b'
  },
  {
    icon: 'bi-cloud-check',
    title: 'Cloud Solutions',
    description: 'Deploying and managing secure, scalable cloud infrastructure to support your growing applications.',
    color: '#ef4444'
  }
];

const Services = () => {
  return (
    <section id="services" className="services-section position-relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="hero-bg-glow" style={{ top: '20%', right: '-10%', width: '500px', height: '500px', opacity: '0.15' }}></div>
      <div className="hero-bg-glow-2" style={{ bottom: '10%', left: '-10%', width: '500px', height: '500px', opacity: '0.15' }}></div>

      <div className="container position-relative z-1">
        <div className="text-center mb-5">
          <h3 className="section-subtitle">What I Offer</h3>
          <h2 className="section-title">Personal <span className="text-gradient">Services</span></h2>
        </div>

        <div className="row g-4 justify-content-center">
          {servicesData.map((service, index) => (
            <div className="col-lg-4 col-md-6" key={index}>
              <div
                className="glass-panel p-4 h-100 text-center service-card position-relative"
                style={{ '--hover-color': service.color } as React.CSSProperties}
              >
                <i className={`${service.icon} fs-2 mb-3 d-block`} style={{ color: service.color }}></i>
                <h4 className="mb-3 fw-bold text-white">{service.title}</h4>
                <p className="text-white-50 small mb-0">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Services;