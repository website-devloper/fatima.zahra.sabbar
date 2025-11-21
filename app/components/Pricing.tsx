'use client';
import { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Pricing = () => {
    const [activeCategory, setActiveCategory] = useState<'web' | 'it' | 'uiux'>('web');
    const pricingData = {
        web: [
            {
                title: 'Starter',
                price: '$499',
                description: 'Perfect for personal portfolios and landing pages.',
                features: [
                    { text: 'One Page / Landing Page', included: true },
                    { text: 'Responsive Design', included: true },
                    { text: 'Basic SEO Optimization', included: true },
                    { text: 'Contact Form Integration', included: true },
                    { text: 'Content Management System', included: false },
                    { text: 'E-commerce Functionality', included: false },
                ],
                popular: false,
                delay: '0'
            },
            {
                title: 'Professional',
                price: '$999',
                description: 'Ideal for small businesses and startups.',
                features: [
                    { text: 'Up to 5 Pages', included: true },
                    { text: 'Responsive & Modern UI', included: true },
                    { text: 'Advanced SEO Setup', included: true },
                    { text: 'CMS Integration (WordPress/Sanity)', included: true },
                    { text: 'Social Media Integration', included: true },
                    { text: '1 Month Free Support', included: true },
                ],
                popular: true,
                delay: '100'
            },
            {
                title: 'Enterprise',
                price: 'Custom',
                description: 'For large-scale applications and complex needs.',
                features: [
                    { text: 'Unlimited Pages', included: true },
                    { text: 'Custom Web Application', included: true },
                    { text: 'Database & API Integration', included: true },
                    { text: 'E-commerce Solution', included: true },
                    { text: 'Performance Optimization', included: true },
                    { text: 'Priority Support', included: true },
                ],
                popular: false,
                delay: '200'
            }
        ],
        it: [
            {
                title: 'Automation Basic',
                price: '$199',
                description: 'Simple scripts to automate daily tasks.',
                features: [
                    { text: 'Python/Bash Scripting', included: true },
                    { text: 'Data Entry Automation', included: true },
                    { text: 'File Management Scripts', included: true },
                    { text: 'Source Code Included', included: true },
                    { text: 'GUI Interface', included: false },
                ],
                popular: false,
                delay: '0'
            },
            {
                title: 'Advanced Solutions',
                price: '$599',
                description: 'Complex workflows and system integrations.',
                features: [
                    { text: 'Custom Desktop Apps', included: true },
                    { text: 'API Integrations', included: true },
                    { text: 'Database Management', included: true },
                    { text: 'Cloud Deployment Setup', included: true },
                    { text: 'Detailed Documentation', included: true },
                ],
                popular: true,
                delay: '100'
            },
            {
                title: 'Consultation',
                price: '$99/hr',
                description: 'Expert advice for your tech infrastructure.',
                features: [
                    { text: 'System Architecture Design', included: true },
                    { text: 'Security Audits', included: true },
                    { text: 'Code Review & Optimization', included: true },
                    { text: 'Tech Stack Selection', included: true },
                    { text: 'Mentorship', included: true },
                ],
                popular: false,
                delay: '200'
            }
        ],
        uiux: [
            {
                title: 'Wireframing',
                price: '$299',
                description: 'Basic structure and layout design.',
                features: [
                    { text: 'Low-Fidelity Wireframes', included: true },
                    { text: 'User Flow Diagrams', included: true },
                    { text: 'Information Architecture', included: true },
                    { text: 'Up to 5 Screens', included: true },
                    { text: 'Interactive Prototype', included: false },
                ],
                popular: false,
                delay: '0'
            },
            {
                title: 'Full UI Design',
                price: '$799',
                description: 'Complete visual design for your product.',
                features: [
                    { text: 'High-Fidelity Mockups', included: true },
                    { text: 'Design System Creation', included: true },
                    { text: 'Interactive Prototyping', included: true },
                    { text: 'Responsive Layouts', included: true },
                    { text: 'Asset Export for Devs', included: true },
                ],
                popular: true,
                delay: '100'
            },
            {
                title: 'UX Audit',
                price: '$499',
                description: 'Improve your existing product usability.',
                features: [
                    { text: 'Heuristic Evaluation', included: true },
                    { text: 'User Testing Sessions', included: true },
                    { text: 'Accessibility Check', included: true },
                    { text: 'Performance Analysis', included: true },
                    { text: 'Detailed Report & Fixes', included: true },
                ],
                popular: false,
                delay: '200'
            }
        ]
    };

    return (
        <section id="pricing" className="pricing-section position-relative overflow-hidden">
            {/* Background Glow Effects */}
            <div className="hero-bg-glow" style={{ top: '40%', left: '-20%', width: '600px', height: '600px', opacity: '0.1' }}></div>
            <div className="hero-bg-glow-2" style={{ bottom: '10%', right: '-10%', width: '500px', height: '500px', opacity: '0.1' }}></div>

            <div className="container position-relative z-1">
                <div className="text-center mb-5">
                    <h3 className="section-subtitle">Transparent Pricing</h3>
                    <h2 className="section-title">Choose Your <span className="text-gradient">Package</span></h2>
                    <p className="text-white mt-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
                        Whether you need a stunning website, a powerful IT solution, or intuitive design, I have the right package for you.
                    </p>
                </div>

                {/* Category Toggles */}
                <div className="d-flex justify-content-center mb-5">
                    <div className="glass-panel p-1 d-inline-flex rounded-pill">
                        <button
                            className={`btn btn-sm rounded-pill px-4 ${activeCategory === 'web' ? 'btn-primary' : 'text-white'}`}
                            onClick={() => setActiveCategory('web')}
                            style={{ minWidth: '140px' }}
                        >
                            Web Development
                        </button>
                        <button
                            className={`btn btn-sm rounded-pill px-4 ${activeCategory === 'it' ? 'btn-primary' : 'text-white'}`}
                            onClick={() => setActiveCategory('it')}
                            style={{ minWidth: '140px' }}
                        >
                            IT Solutions
                        </button>
                        <button
                            className={`btn btn-sm rounded-pill px-4 ${activeCategory === 'uiux' ? 'btn-primary' : 'text-white'}`}
                            onClick={() => setActiveCategory('uiux')}
                            style={{ minWidth: '140px' }}
                        >
                            UI/UX Design
                        </button>
                    </div>
                </div>

                <div className="row g-4 justify-content-center">
                    {pricingData[activeCategory].map((pkg, index) => (
                        <div className="col-lg-4 col-md-6" key={index}>
                            <div
                                className={`pricing-card glass-panel h-100 p-4 d-flex flex-column ${pkg.popular ? 'popular' : ''}`}
                                style={{ animationDelay: `${pkg.delay}ms` }}
                            >
                                {pkg.popular && <span className="popular-badge">Most Popular</span>}

                                <div className="mb-4">
                                    <h4 className="fw-bold text-white mb-2">{pkg.title}</h4>
                                    <p className="text-muted small mb-3">{pkg.description}</p>
                                    <div className="pricing-price display-5 fw-bold mb-0">{pkg.price}</div>
                                </div>

                                <ul className="pricing-features list-unstyled mb-4 flex-grow-1">
                                    {pkg.features.map((feature, idx) => (
                                        <li key={idx} className={!feature.included ? 'disabled' : ''}>
                                            <i className={`bi ${feature.included ? 'bi-check-circle-fill' : 'bi-dash-circle'}`}></i>
                                            <span className="small">{feature.text}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto">
                                    <a href="#contact" className={`btn w-100 ${pkg.popular ? 'btn-primary' : 'btn-outline-primary'}`}>
                                        Get Started
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Pricing;