// /app/components/About.tsx
"use client";
import React from 'react';

const aboutCards = [
  {
    icon: "bi-code-square",
    title: "Full Stack",
    description: "Developing custom, high-performance web applications tailored to your business needs.",
    color: "linear-gradient(135deg, #6366f1, #8b5cf6)", // Indigo
    shadow: "rgba(99, 102, 241, 0.2)",
    iconColor: "#818cf8",
    bgAccent: "rgba(99, 102, 241, 0.1)"
  },
  {
    icon: "bi-robot",
    title: "AI Automation",
    description: "Automating repetitive tasks and workflows to increase efficiency and reduce costs.",
    color: "linear-gradient(135deg, #f43f5e, #ec4899)", // Pink
    shadow: "rgba(244, 63, 94, 0.2)",
    iconColor: "#fb7185",
    bgAccent: "rgba(244, 63, 94, 0.1)"
  },
  {
    icon: "bi-palette",
    title: "WordPress",
    description: "Designing modern, intuitive interfaces that provide an exceptional user experience.",
    color: "linear-gradient(135deg, #06b6d4, #3b82f6)", // Cyan
    shadow: "rgba(6, 182, 212, 0.2)",
    iconColor: "#22d3ee",
    bgAccent: "rgba(6, 182, 212, 0.1)"
  },
  {
    icon: "bi-shield-check",
    title: "IT Solutions",
    description: "Providing secure, scalable IT infrastructure and technical support solutions.",
    color: "linear-gradient(135deg, #10b981, #14b8a6)", // Emerald
    shadow: "rgba(16, 185, 129, 0.2)",
    iconColor: "#34d399",
    bgAccent: "rgba(16, 185, 129, 0.1)"
  }
];

const About = () => {
  return (
    <section id="about" className="about-section position-relative overflow-hidden">
      {/* Background Decoration */}
      <div className="why-bg-decoration">
        <div className="blob blob-1" style={{ top: '20%', left: '-10%', opacity: 0.1 }}></div>
        <div className="blob blob-2" style={{ bottom: '20%', right: '-10%', opacity: 0.1 }}></div>
      </div>

      <div className="container position-relative z-1">
        <div className="text-center mb-5" data-aos="fade-up">
          <h3 className="section-subtitle">About Me</h3>
          <h2 className="section-title">Who I <span className="text-gradient">Am</span></h2>
        </div>

        <div className="row align-items-center gy-5">
          <div className="col-lg-6" data-aos="fade-right">
            <div className="pe-lg-5">
              <p className="lead text-white mb-4">
                I am the <span className="text-primary fw-bold"> Co-Founder </span>of <span className="text-primary fw-bold">WevTex </span>, a Full Stack Developer and IT Solutions Specialist
                dedicated to building modern,
                secure, and scalable digital experiences for businesses.

                I help companies grow by developing websites, automating processes, and designing interfaces that are simple, powerful, and user-friendly.
              </p>
              <p className="text-white-1000 mb-4">
                My mission is to deliver clean and efficient solutions that solve real problems whether it’s a custom web application, a business website, an AI-powered automated workflow, or a complete digital system built from scratch.
              </p>

              <div className="d-flex gap-4 mt-5">
                <div data-aos="zoom-in" data-aos-delay="100">
                  <h2 className="fw-bold text-gradient mb-0">3+</h2>
                  <p className="small text-white-1000">Years Exp.</p>
                </div>
                <div className="vr bg-secondary opacity-25"></div>
                <div data-aos="zoom-in" data-aos-delay="200">
                  <h2 className="fw-bold text-gradient mb-0">30+</h2>
                  <p className="small text-white-1000">Projects</p>
                </div>
                <div className="vr bg-secondary opacity-25"></div>
                <div data-aos="zoom-in" data-aos-delay="300">
                  <h2 className="fw-bold text-gradient mb-0">100%</h2>
                  <p className="small text-white-1000">Satisfaction</p>
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
                      <h3 className="why-card-title h5">{card.title}</h3>
                      <p className="why-card-desc small mb-0 text-white-100">{card.description}</p>
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
