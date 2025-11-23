// /app/components/Navbar.tsx
'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = ['Home', 'About', 'Skills', 'Projects', 'Services', 'Testimonials', 'Contact'];

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled state for navbar background
      setScrolled(window.scrollY > 50);

      // Active section tracking
      let currentSection = 'home';
      for (const item of navItems) {
        const section = document.getElementById(item.toLowerCase());
        if (section && window.scrollY >= section.offsetTop - 150) {
          currentSection = item.toLowerCase();
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link href="#home" className="navbar-brand">
          FZ.Dev
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleNavbar}
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-expanded={isOpen ? 'true' : 'false'}
          aria-label="Toggle navigation"
        >
          <span>
            <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'}`}></i>
          </span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navItems.map((item) => (
              <li className="nav-item" key={item}>
                <Link
                  href={`#${item.toLowerCase()}`}
                  className={`nav-link ${activeSection === item.toLowerCase() ? 'active' : ''} d-inline-block`}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              </li>
            ))}
          </ul>

          <div className="d-flex align-items-center gap-3 ms-lg-4 mt-3 mt-lg-0">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="nav-link p-0" aria-label="GitHub">
              <i className="bi bi-github fs-5"></i>
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="nav-link p-0" aria-label="LinkedIn">
              <i className="bi bi-linkedin fs-5"></i>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

