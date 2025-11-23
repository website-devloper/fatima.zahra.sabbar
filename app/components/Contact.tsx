import React from 'react';

const Contact = () => {
    return (
        <section className="contact-section position-relative overflow-hidden" id="contact">
            {/* Background Glow Effects */}
            <div className="hero-bg-glow" style={{ top: '50%', right: '-10%', width: '600px', height: '600px', opacity: '0.1' }}></div>
            <div className="hero-bg-glow-2" style={{ bottom: '10%', left: '-10%', width: '600px', height: '600px', opacity: '0.1' }}></div>

            <div className="container position-relative z-1">
                <div className="text-center mb-5" data-aos="fade-up">
                    <h3 className="section-subtitle">Get in Touch</h3>
                    <h2 className="section-title">Contact <span className="text-gradient">Me</span></h2>
                </div>

                <div className="row align-items-center g-5">
                    {/* Image Column */}
                    <div className="col-lg-6" data-aos="fade-right">
                        <div className="contact-image-wrapper position-relative">
                            <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-primary opacity-10 rounded-4 blur-3xl"></div>
                            <img
                                src="/contact.png"
                                alt="Contact Us"
                                className="img-fluid rounded-4 shadow-lg w-100 position-relative z-1"
                                style={{ objectFit: 'cover', minHeight: '400px' }}
                            />
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="col-lg-6" data-aos="fade-left">
                        <div
                            className="why-card p-4 p-md-5"
                            style={{
                                '--card-gradient': 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                '--card-shadow': 'rgba(99, 102, 241, 0.2)',
                                '--icon-color': '#818cf8',
                                '--bg-accent': 'rgba(99, 102, 241, 0.1)'
                            } as React.CSSProperties}
                        >
                            <div className="card-glow"></div>
                            <div className="why-card-inner">
                                <div className="card-blob"></div>

                                <div className="mb-4">
                                    <h3 className="why-card-title mb-3">Let's Work Together</h3>
                                    <p className="why-card-desc mb-0">
                                        Have a project in mind or just want to say hello? Feel free to reach out!
                                        I'm always open to discussing new ideas and opportunities.
                                    </p>
                                </div>

                                <form className="contact-form position-relative z-2" action="https://formsubmit.co/fatimazahra20033@gmail.com" method="POST">
                                    <input type="hidden" name="_template" value="table" />
                                    <input type="hidden" name="_captcha" value="false" />
                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control contact-input bg-transparent text-white border-secondary border-opacity-25"
                                                    placeholder="Your Name"
                                                    required
                                                    style={{ padding: '12px 15px' }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4">
                                            <div className="form-group">
                                                <input
                                                    type="email"
                                                    name="email"
                                                    className="form-control contact-input bg-transparent text-white border-secondary border-opacity-25"
                                                    placeholder="Your Email"
                                                    required
                                                    style={{ padding: '12px 15px' }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                name="_subject"
                                                className="form-control contact-input bg-transparent text-white border-secondary border-opacity-25"
                                                placeholder="Subject"
                                                required
                                                style={{ padding: '12px 15px' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="form-group">
                                            <textarea
                                                name="message"
                                                className="form-control contact-input bg-transparent text-white border-secondary border-opacity-25"
                                                rows={5}
                                                placeholder="Your Message"
                                                required
                                                style={{ padding: '12px 15px', resize: 'none' }}
                                            ></textarea>
                                        </div>
                                    </div>
                                    <div className="text-center">
                                        <button type="submit" className="btn btn-primary w-100 py-3 fw-bold">
                                            Send Message <i className="bi bi-send ms-2"></i>
                                        </button>
                                    </div>
                                </form>

                                <div className="card-border-bottom"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Contact