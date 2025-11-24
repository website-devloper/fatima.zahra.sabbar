'use client';

import Link from 'next/link';
import Image from 'next/image';
import { TypeAnimation } from 'react-type-animation';
import { useLocale } from './LocaleProvider';

const Hero = () => {
  const { t } = useLocale();

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
              <i className="bi bi-stars me-2"></i> {t('hero.badge')}
            </div>

            <h1 className="hero-title" data-aos="fade-up" data-aos-delay="200">
              {t('hero.title')}
              <span className="text-gradient"> {t('hero.titleGradient')}</span>
            </h1>

            <h2 className="hero-subtitle" data-aos="fade-up" data-aos-delay="300">
              {t('hero.typeAnimation.1') !== 'hero.typeAnimation.1' ? (
                <TypeAnimation
                  sequence={[
                    t('hero.typeAnimation.1'), 2000,
                    t('hero.typeAnimation.2'), 2000,
                    t('hero.typeAnimation.3'), 2000,
                    t('hero.typeAnimation.4'), 2000,
                    t('hero.typeAnimation.5'), 2000,
                    t('hero.typeAnimation.6'), 2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  className="text-hero fw-bold"
                  repeat={Infinity}
                />
              ) : (
                <span className="text-hero fw-bold">Loading...</span>
              )}
            </h2>

            <p className="lead text-white-100 mb-5" style={{ maxWidth: '600px' }} data-aos="fade-up" data-aos-delay="400">
              {t('hero.description')}
            </p>

            <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center justify-content-lg-start" data-aos="fade-up" data-aos-delay="500">
              <Link href="#projects" className="btn btn-primary">
                {t('hero.cta.primary')}
              </Link>
              <Link href="#contact" className="btn btn-outline-primary">
                {t('hero.cta.secondary')}
              </Link>
            </div>

            <div className="mt-5 d-flex align-items-center gap-4 justify-content-center justify-content-lg-start text-white small" data-aos="fade-up" data-aos-delay="600">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-primary"></i>
                <span>{t('hero.features.1')}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-primary"></i>
                <span>{t('hero.features.2')}</span>
              </div>
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-check-circle-fill text-primary"></i>
                <span>{t('hero.features.3')}</span>
              </div>
            </div>
          </div>

          <div className="col-lg-5 mt-5 mt-lg-0" data-aos="fade-left" data-aos-delay="200">
            <div className="hero-image-wrapper">
              <Image
                src="/It-Solutions.jpg"
                alt="Fatima Zahra Sabbar - Full Stack Developer"
                width={800}
                height={800}
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
