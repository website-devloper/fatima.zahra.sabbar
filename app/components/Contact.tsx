const Contact = () => {
    return (
        <section className="contact-section" id="contact">
            <div className="container">
                <div className="text-center mb-5">
                    <h3 className="section-subtitle">Get in Touch</h3>
                    <h2 className="section-title">Contact <span className="text-gradient">Me</span></h2>
                </div>
                
                <div className="row align-items-center">
                    {/* Image Column */}
                    <div className="col-lg-6 mb-5 mb-lg-0">
                        <div className="contact-image-wrapper glow-effect">
                            <img 
                                src="/contact.png"
                                alt="Contact Us" 
                                className="img-fluid rounded-4 shadow-lg w-100"
                                style={{ objectFit: 'cover', minHeight: '400px' }}
                            />
                        </div>
                    </div>

                    {/* Form Column */}
                    <div className="col-lg-6">
                        <div className="glass-panel p-4 p-md-5">
                            <p className="text-light mb-4">
                                Have a project in mind or just want to say hello? Feel free to reach out!
                                I'm always open to discussing new ideas and opportunities.
                            </p>
                            <form className="contact-form">
                                <div className="row">
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <input type="text" className="form-control contact-input" placeholder="Your Name" required />
                                        </div>
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <div className="form-group">
                                            <input type="email" className="form-control contact-input" placeholder="Your Email" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="form-group">
                                        <input type="text" className="form-control contact-input" placeholder="Subject" required />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <div className="form-group">
                                        <textarea className="form-control contact-input" rows={5} placeholder="Your Message" required></textarea>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary w-100">
                                        Send Message <i className="bi bi-send ms-2"></i>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Contact