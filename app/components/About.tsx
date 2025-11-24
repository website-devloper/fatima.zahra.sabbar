// /app/components/About.tsx
"use client";
import React from 'react';
import { useLocale } from './LocaleProvider';

const About = () => {
  const { t } = useLocale();

  const aboutCards = [
    {
      key: 'fullstack',
      icon: "bi-code-square",
      color: "linear-gradient(135deg, #6366f1, #8b5cf6)", // Indigo
      shadow: "rgba(99, 102, 241, 0.2)",
      iconColor: "#818cf8",
      bgAccent: "rgba(99, 102, 241, 0.1)"
    },
    {
      key: 'ai',
      icon: "bi-robot",
      color: "linear-gradient(135deg, #f43f5e, #ec4899)", // Pink
      shadow: "rgba(244, 63, 94, 0.2)",
      iconColor: "#fb7185",
      bgAccent: "rgba(244, 63, 94, 0.1)"
    },
    {
      key: 'wordpress',
      icon: "bi-palette",
      color: "linear-gradient(135deg, #06b6d4, #3b82f6)", // Cyan
      shadow: "rgba(6, 182, 212, 0.2)",
      iconColor: "#22d3ee",
      bgAccent: "rgba(6, 182, 212, 0.1)"
    },
    {
      key: 'it',
      icon: "bi-shield-check",
      color: "linear-gradient(135deg, #10b981, #14b8a6)", // Emerald
      shadow: "rgba(16, 185, 129, 0.2)",
      iconColor: "#34d399",
      bgAccent: "rgba(16, 185, 129, 0.1)"
    }
  ];

  return (
    <section id="about" className="about-section position-relative overflow-hidden">
      {/* Background Decoration */}
      <div className="why-bg-decoration">
        <div className="blob blob-1" style={{ top: '20%', left: '-10%', opacity: 0.1 }}></div>
        <div className="blob blob-2" style={{ bottom: '20%', right: '-10%', opacity: 0.1 }}></div>
      </div>

      <div className="container position-relative z-1">
        <div className="text-center mb-5" data-aos="fade-up">
          <h3 className="section-subtitle">{t('about.subtitle')}</h3>
          <h2 className="section-title">{t('about.title')} <span className="text-gradient">{t('about.titleGradient')}</span></h2>
        </div>

        <div className="row align-items-center gy-5">
          <div className="col-lg-6" data-aos="fade-right">
            <div className="pe-lg-5">
              <p className="lead text-white mb-4" dangerouslySetInnerHTML={{ __html: t('about.intro') }} />
              <p className="text-white-1000 mb-4">
                {t('about.description')}
              </p>

              <div className="d-flex gap-4 mt-5">
                <div data-aos="zoom-in" data-aos-delay="100">
                  <h2 className="fw-bold text-gradient mb-0">3+</h2>
                  <p className="small text-white-1000">{t('about.stats.experience')}</p>
                </div>
                <div className="vr bg-secondary opacity-25"></div>
                <div data-aos="zoom-in" data-aos-delay="200">
                  <h2 className="fw-bold text-gradient mb-0">30+</h2>
                  <p className="small text-white-1000">{t('about.stats.projects')}</p>
                </div>
                <div className="vr bg-secondary opacity-25"></div>
                <div data-aos="zoom-in" data-aos-delay="300">
                  <h2 className="fw-bold text-gradient mb-0">100%</h2>
                  <p className="small text-white-1000">{t('about.stats.satisfaction')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="row g-4">
              {aboutCards.map((card, index) => (
                <div className="col-md-6" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                  <div
                    className="why-card h-100"
                    style={{
                      '--card-gradient': card.color,
                      '--card-shadow': card.shadow,
                      '--icon-color': card.iconColor,
                      '--bg-accent': card.bgAccent
                    } as React.CSSProperties}
                  >
                    <div className="card-glow"></div>
                    <div className="why-card-inner">
                      <div className="card-blob"></div>
                      <div className="why-icon-wrapper">
                        <i className={`bi ${card.icon}`}></i>
                      </div>
                      <h3 className="why-card-title h5">{t(`about.cards.${card.key}.title`)}</h3>
                      <p className="why-card-desc small mb-0 text-white-100">{t(`about.cards.${card.key}.description`)}</p>
                      <div className="card-border-bottom"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
