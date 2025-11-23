
import { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const testimonialsData = [
  {
    name: 'Client A',
    role: 'Startup Founder',
    text: 'WevTex delivered a fantastic web app that was both functional and beautiful. The automation features have saved us countless hours.',
    color: 'linear-gradient(135deg, #6366f1, #8b5cf6)', // Indigo
    shadow: 'rgba(99, 102, 241, 0.2)',
    iconColor: '#818cf8',
    bgAccent: 'rgba(99, 102, 241, 0.1)'
  },
  {
    name: 'Client B',
    role: 'Small Business Owner',
    text: 'The new website is professional, fast, and exactly what we needed. The process was smooth and collaborative from start to finish.',
    color: 'linear-gradient(135deg, #f43f5e, #ec4899)', // Pink
    shadow: 'rgba(244, 63, 94, 0.2)',
    iconColor: '#fb7185',
    bgAccent: 'rgba(244, 63, 94, 0.1)'
  },
  {
    name: 'Client C',
    role: 'Project Manager',
    text: 'An incredibly skilled developer. The UI/UX design for our internal tool was intuitive and received great feedback from the team.',
    color: 'linear-gradient(135deg, #06b6d4, #3b82f6)', // Cyan
    shadow: 'rgba(6, 182, 212, 0.2)',
    iconColor: '#22d3ee',
    bgAccent: 'rgba(6, 182, 212, 0.1)'
  },
  {
    name: 'Client D',
    role: 'CTO',
    text: 'Exceptional code quality and attention to detail. The platform scales perfectly and the documentation was comprehensive.',
    color: 'linear-gradient(135deg, #10b981, #14b8a6)', // Emerald
    shadow: 'rgba(16, 185, 129, 0.2)',
    iconColor: '#34d399',
    bgAccent: 'rgba(16, 185, 129, 0.1)'
  },
  {
    name: 'Client E',
    role: 'Marketing Director',
    text: 'Our conversion rates doubled after the redesign. The visual storytelling and user flow are exactly what we envisioned.',
    color: 'linear-gradient(135deg, #f59e0b, #d97706)', // Amber
    shadow: 'rgba(245, 158, 11, 0.2)',
    iconColor: '#fbbf24',
    bgAccent: 'rgba(245, 158, 11, 0.1)'
  },
  {
    name: 'Client F',
    role: 'Product Lead',
    text: 'A true partner in development. They understood our complex requirements and delivered a solution that exceeded expectations.',
    color: 'linear-gradient(135deg, #ef4444, #dc2626)', // Red
    shadow: 'rgba(239, 68, 68, 0.2)',
    iconColor: '#f87171',
    bgAccent: 'rgba(239, 68, 68, 0.1)'
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 992) {
        setItemsPerPage(2);
      } else {
        setItemsPerPage(3);
      }
    };

    // Initial call
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalPages = Math.ceil(testimonialsData.length / itemsPerPage);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Auto-play
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [itemsPerPage]); // Reset timer if layout changes

  // Reset active index if itemsPerPage changes to avoid out of bounds
  useEffect(() => {
    setActiveIndex(0);
  }, [itemsPerPage]);

  const currentItems = testimonialsData.slice(
    activeIndex * itemsPerPage,
    (activeIndex + 1) * itemsPerPage
  );

  return (
    <section id="testimonials" className="testimonials-section position-relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="hero-bg-glow" style={{ top: '50%', left: '-10%', width: '400px', height: '400px', opacity: '0.1' }}></div>
      <div className="hero-bg-glow-2" style={{ bottom: '10%', right: '-10%', width: '400px', height: '400px', opacity: '0.1' }}></div>

      <div className="container position-relative z-1">
        <div className="text-center mb-5" data-aos="fade-up">
          <h3 className="section-subtitle">Testimonials</h3>
          <h2 className="section-title">What <span className="text-gradient">Others Say</span></h2>
        </div>

        <div className="position-relative px-lg-5">
          {/* Slider Content */}
          <div className="row g-4 justify-content-center" style={{ minHeight: '400px' }}>
            {currentItems.map((testimonial, index) => (
              <div className={`col - lg - ${12 / itemsPerPage === 4 ? '4' : 12 / itemsPerPage === 6 ? '6' : '12'} `} key={`${activeIndex} -${index} `}>
                <div
                  className="why-card h-100 testimonial-card position-relative d-flex flex-column animate-fade-in"
                  style={{
                    '--card-gradient': testimonial.color,
                    '--card-shadow': testimonial.shadow,
                    '--icon-color': testimonial.iconColor,
                    '--bg-accent': testimonial.bgAccent
                  } as React.CSSProperties}
                >
                  <div className="card-glow"></div>
                  <div className="why-card-inner d-flex flex-column h-100">
                    <div className="card-blob"></div>

                    <i className="bi bi-quote quote-icon fs-1 mb-3 d-block" style={{ color: testimonial.iconColor }}></i>

                    <div className="mb-3">
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className="bi bi-star-fill text-warning small me-1"></i>
                      ))}
                    </div>

                    <p className="why-card-desc fst-italic mb-4 flex-grow-1">"{testimonial.text}"</p>

                    <div className="mt-auto pt-3 border-top border-secondary border-opacity-25">
                      <h5 className="why-card-title h5 mb-1">{testimonial.name}</h5>
                      <span className="d-block small text-uppercase fw-bold" style={{ color: testimonial.iconColor }}>{testimonial.role}</span>
                    </div>

                    <div className="card-border-bottom"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            onClick={prevSlide}
            className="btn btn-icon position-absolute top-50 start-0 translate-middle-y d-none d-lg-flex align-items-center justify-content-center rounded-circle glass-panel border-0 text-white"
            style={{ width: '48px', height: '48px', zIndex: 10, left: '-20px' }}
            aria-label="Previous"
          >
            <i className="bi bi-chevron-left"></i>
          </button>

          <button
            onClick={nextSlide}
            className="btn btn-icon position-absolute top-50 end-0 translate-middle-y d-none d-lg-flex align-items-center justify-content-center rounded-circle glass-panel border-0 text-white"
            style={{ width: '48px', height: '48px', zIndex: 10, right: '-20px' }}
            aria-label="Next"
          >
            <i className="bi bi-chevron-right"></i>
          </button>

          {/* Indicators */}
          <div className="d-flex justify-content-center mt-5 gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`btn p - 0 rounded - pill transition - all ${i === activeIndex ? 'bg-primary' : 'bg-secondary opacity-50'} `}
                style={{ width: i === activeIndex ? '32px' : '12px', height: '12px', border: 'none' }}
                aria-label={`Go to slide ${i + 1} `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default Testimonials;
