// /app/components/Footer.tsx
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
  return (
    <footer className="footer position-relative overflow-hidden">
      <div className="footer-bg-glow"></div>
      <div className="container text-center position-relative z-1">

        {/* Brand */}
        <div className="mb-4">
          <a href="#" className="footer-brand text-gradient h3 text-decoration-none fw-bold">WevTex</a>
          <p className="text-white mt-2 mx-auto" style={{ maxWidth: '400px' }}>
            Building digital experiences with pixel-perfect precision.
          </p>
        </div>

        {/* Navigation */}
        <div className="mb-4 d-flex justify-content-center flex-wrap gap-4">
          <a href="#home" className="footer-link">Home</a>
          <a href="#about" className="footer-link">About</a>
          <a href="#skills" className="footer-link">Skills</a>
          <a href="#projects" className="footer-link">Projects</a>
          <a href="#contact" className="footer-link">Contact</a>
        </div>

        {/* Socials */}
        <div className="mb-4 d-flex justify-content-center gap-3">
          <a href="#" className="footer-social-icon"><i className="bi bi-github"></i></a>
          <a href="#" className="footer-social-icon"><i className="bi bi-linkedin"></i></a>
          <a href="#" className="footer-social-icon"><i className="bi bi-twitter"></i></a>
          <a href="#" className="footer-social-icon"><i className="bi bi-envelope"></i></a>
        </div>

        {/* Copyright */}
        <div className="border-top border-white border-opacity-10 pt-4">
          <p className="mb-0 text-white small">
            &copy; {new Date().getFullYear()} WevTex. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer