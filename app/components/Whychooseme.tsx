"use client";
import React from 'react';
import { useLocale } from './LocaleProvider';

const WhyChooseMe = () => {
    const { t } = useLocale();

    const reasons = [
        {
            key: 'innovative',
            icon: "bi-lightbulb",
            color: "linear-gradient(135deg, #6366f1, #8b5cf6)", // Indigo to Violet
            shadow: "rgba(99, 102, 241, 0.2)",
            iconColor: "#818cf8",
            bgAccent: "rgba(99, 102, 241, 0.1)"
        },
        {
            key: 'reliable',
            icon: "bi-clock-history",
            color: "linear-gradient(135deg, #f43f5e, #ec4899)", // Rose to Pink
            shadow: "rgba(244, 63, 94, 0.2)",
            iconColor: "#fb7185",
            bgAccent: "rgba(244, 63, 94, 0.1)"
        },
        {
            key: 'excellence',
            icon: "bi-gem",
            color: "linear-gradient(135deg, #06b6d4, #3b82f6)", // Cyan to Blue
            shadow: "rgba(6, 182, 212, 0.2)",
            iconColor: "#22d3ee",
            bgAccent: "rgba(6, 182, 212, 0.1)"
        },
        {
            key: 'partnership',
            icon: "bi-headset",
            color: "linear-gradient(135deg, #10b981, #14b8a6)", // Emerald to Teal
            shadow: "rgba(16, 185, 129, 0.2)",
            iconColor: "#34d399",
            bgAccent: "rgba(16, 185, 129, 0.1)"
        }
    ];

    return (
        <section id="why-choose-me" className="why-section">
            {/* Decorative Background */}
            <div className="why-bg-decoration">
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
            </div>

            <div className="container position-relative z-1">
                <div className="text-center mb-5" data-aos="fade-up">
                    <span className="section-subtitle">
                        {t('whyChooseMe.subtitle')}
                    </span>
                    <h2 className="section-title mb-4">
                        {t('whyChooseMe.title')} <span className="text-gradient">{t('whyChooseMe.titleGradient')}</span>
                    </h2>
                    <p className="text-white-100 mx-auto section-desc">
                        {t('whyChooseMe.description')}
                    </p>
                </div>

                <div className="row g-4">
                    {reasons.map((reason, index) => (
                        <div className="col-md-6 col-lg-3" key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                            <div
                                className="why-card h-100"
                                style={{
                                    '--card-gradient': reason.color,
                                    '--card-shadow': reason.shadow,
                                    '--icon-color': reason.iconColor,
                                    '--bg-accent': reason.bgAccent
                                } as React.CSSProperties}
                            >
                                {/* Glow Effect behind card */}
                                <div className="card-glow"></div>

                                <div className="why-card-inner">
                                    {/* Top Right Gradient Blob */}
                                    <div className="card-blob"></div>

                                    {/* Icon */}
                                    <div className="why-icon-wrapper">
                                        <i className={`bi ${reason.icon}`}></i>
                                    </div>

                                    <h3 className="why-card-title">
                                        {t(`whyChooseMe.reasons.${reason.key}.title`)}
                                    </h3>

                                    <p className="why-card-desc">
                                        {t(`whyChooseMe.reasons.${reason.key}.description`)}
                                    </p>

                                    {/* Bottom Border Gradient */}
                                    <div className="card-border-bottom"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyChooseMe;