'use client';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useLocale } from './LocaleProvider';

const Footer = () => {
  const { t } = useLocale();

  const navItems = ['home', 'about', 'skills', 'projects', 'contact'];

  return (
    <footer className="footer position-relative overflow-hidden py-5">
      <div className="hero-bg-glow" style={{ bottom: '-20%', left: '50%', transform: 'translateX(-50%)', width: '1200px', height: '500px', opacity: '0.15' }}></div>

      <div className="container position-relative z-1">
        <div className="row justify-content-center text-center">
          <div className="col-lg-10">

            <div className="mb-5" data-aos="fade-up">
              <a href="#" className="footer-brand text-gradient display-4 text-decoration-none fw-bold d-inline-block mb-3">FZ.Dev</a>
              <p className="text-white-100 lead mx-auto opacity-75" style={{ maxWidth: '600px' }}>
                {t('footer.tagline')}
              </p>
            </div>

            <div className="mb-5 d-inline-block" data-aos="fade-up" data-aos-delay="100">
              <div className="glass-panel px-4 py-3 rounded-pill d-flex flex-wrap justify-content-center gap-4 border-white border-opacity-10">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={`#${item}`}
                    className="text-white text-decoration-none fw-medium footer-nav-link"
                  >
                    {t(`nav.${item}`)}
                  </a>
                ))}
              </div>
            </div>

            <div className="mb-5 d-flex justify-content-center gap-3" data-aos="fade-up" data-aos-delay="200">
              {[
                { icon: 'bi-github', url: 'https://github.com/website-devloper' },
                { icon: 'bi-linkedin', url: 'https://www.linkedin.com/in/fatima-zahra-sabbar-906b40195/' },
                { icon: 'bi-twitter', url: '#' },
                { icon: 'bi-envelope', url: 'mailto:fatimazahra20033@gmail.com' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className="footer-social-btn d-flex align-items-center justify-content-center rounded-circle text-white text-decoration-none transition-all"
                  style={{
                    width: '50px',
                    height: '50px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    fontSize: '1.2rem'
                  }}
                >
                  <i className={`bi ${social.icon}`}></i>
                </a>
              ))}
            </div>

            <div className="border-top border-white border-opacity-10 pt-4 mt-4" data-aos="fade-up" data-aos-delay="300">
              <div className="row align-items-center justify-content-between">
                <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                  <p className="mb-0 text-white-100 small opacity-50">
                    &copy; {new Date().getFullYear()} <span className="text-white fw-bold opacity-100">FZ.Dev</span>. {t('footer.copyright')}
                  </p>
                </div>
                <div className="col-md-6 text-center text-md-end">
                  <div className="d-flex justify-content-center justify-content-md-end gap-4">
                    <a href="#" className="text-white-100 text-decoration-none small opacity-50 hover-white">{t('footer.privacyPolicy')}</a>
                    <a href="#" className="text-white-100 text-decoration-none small opacity-50 hover-white">{t('footer.termsOfService')}</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
