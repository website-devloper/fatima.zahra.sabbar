
import Link from 'next/link';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <section id="home" className="hero-section position-relative overflow-hidden">
      {/* Background Decoration */}
      <div className="why-bg-decoration">
        <div className="blob blob-1" style={{ top: '-10%', left: '-10%', opacity: 0.2 }}></div>
        <div className="blob blob-2" style={{ bottom: '-10%', right: '-10%', opacity: 0.2 }}></div>
      </div>

      <div className="container pt-5 position-relative z-1">
        <div className="row align-items-center">
          <div className="col-lg-7 text-center text-lg-start" data-aos="fade-right">
            <div className="why-badge mb-4" data-aos="fade-up" data-aos-delay="100">
              <i className="bi bi-stars me-2"></i> Available for Freelance
            </div>

            <h1 className="hero-title" data-aos="fade-up" data-aos-delay="200">
              All Your Digital Needs
              <span className="text-gradient"> One Expert</span>
            </h1>

            <h2 className="hero-subtitle" data-aos="fade-up" data-aos-delay="300">
              <TypeAnimation
                sequence={[
                  'Full Stack Development', 2000,
                  'IT Services', 2000,
                  'Problem Solving', 2000,
                  'Wordpress Development', 2000,
                  'Automation Workflows', 2000,
                  'Modern UI/UX', 2000,
                ]}
                wrapper="span"
                speed={50}
                className="text-hero fw-bold"
                repeat={Infinity}
              />
            </h2>

            <p className="lead text-white-100 mb-5" style={{ maxWidth: '600px' }} data-aos="fade-up" data-aos-delay="400">
              Business websites, tools, and automations that deliver results.
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start" data-aos="fade-up" data-aos-delay="500">
              <Link href="#projects" className="btn btn-primary">
                View My Work
              </Link>
              <Link href="#contact" className="btn btn-outline-primary">
                Contact Me
              </Link>
            </div>

            <div className="mt-5 d-flex align-items-center gap-4 justify-content-center justify-content-lg-start text-white small" data-aos="fade-up" data-aos-delay="600">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-primary"></i>
                <span>Clean Code</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-primary"></i>
                <span>Modern Design</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-primary"></i>
                <span>Responsive</span>
              </div>
            </div>
          </div>

          <div className="col-lg-5 mt-5 mt-lg-0" data-aos="fade-left" data-aos-delay="200">
            <div className="hero-image-wrapper">
              <Image
                src="/photome1.png"
                alt="Developer Portrait"
                width={600}
                height={600}
                className="img-fluid position-relative z-1"
                style={{ borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%' }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
