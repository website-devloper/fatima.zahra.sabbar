'use client';
import React, { useState } from 'react';
import { useLocale } from './LocaleProvider';

const Contact = () => {
    const { t } = useLocale();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            // Save to database
            const dbResponse = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    status: 'new'
                }),
            });

            if (!dbResponse.ok) {
                throw new Error('Failed to save contact');
            }

            // Send email using FormSubmit
            const formElement = e.currentTarget;
            const formSubmitData = new FormData(formElement);

            await fetch('https://formsubmit.co/fatimazahra20033@gmail.com', {
                method: 'POST',
                body: formSubmitData
            });

            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section className="contact-section position-relative overflow-hidden" id="contact">
            {/* Background Glow Effects */}
            <div className="hero-bg-glow" style={{ top: '50%', right: '-10%', width: '600px', height: '600px', opacity: '0.1' }}></div>
            <div className="hero-bg-glow-2" style={{ bottom: '10%', left: '-10%', width: '600px', height: '600px', opacity: '0.1' }}></div>

            <div className="container position-relative z-1">
                <div className="text-center mb-5" data-aos="fade-up">
                    <h3 className="section-subtitle">{t('contact.subtitle')}</h3>
                    <h2 className="section-title">{t('contact.title')} <span className="text-gradient">{t('contact.titleGradient')}</span></h2>
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
                                    <h3 className="why-card-title mb-3">{t('contact.formTitle')}</h3>
                                    <p className="why-card-desc mb-0">
                                        {t('contact.formDescription')}
                                    </p>
                                </div>

                                <form className="contact-form position-relative z-2" onSubmit={handleSubmit}>
                                    <input type="hidden" name="_template" value="table" />
                                    <input type="hidden" name="_captcha" value="false" />

                                    <div className="row">
                                        <div className="col-md-6 mb-4">
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="form-control contact-input bg-transparent text-white border-secondary border-opacity-25"
                                                    placeholder={t('contact.placeholders.name')}
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
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="form-control contact-input bg-transparent text-white border-secondary border-opacity-25"
                                                    placeholder={t('contact.placeholders.email')}
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
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="form-control contact-input bg-transparent text-white border-secondary border-opacity-25"
                                                placeholder={t('contact.placeholders.subject')}
                                                required
                                                style={{ padding: '12px 15px' }}
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <div className="form-group">
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                className="form-control contact-input bg-transparent text-white border-secondary border-opacity-25"
                                                rows={5}
                                                placeholder={t('contact.placeholders.message')}
                                                required
                                                style={{ padding: '12px 15px', resize: 'none' }}
                                            ></textarea>
                                        </div>
                                    </div>

                                    {/* Status Messages */}
                                    {submitStatus === 'success' && (
                                        <div className="alert alert-success mb-4" role="alert">
                                            <i className="bi bi-check-circle me-2"></i>
                                            Message sent successfully! We'll get back to you soon.
                                        </div>
                                    )}
                                    {submitStatus === 'error' && (
                                        <div className="alert alert-danger mb-4" role="alert">
                                            <i className="bi bi-exclamation-circle me-2"></i>
                                            Failed to send message. Please try again.
                                        </div>
                                    )}

                                    <div className="text-center">
                                        <button
                                            type="submit"
                                            className="btn btn-primary w-100 py-3 fw-bold"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    {t('contact.button')} <i className="bi bi-send ms-2"></i>
                                                </>
                                            )}
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