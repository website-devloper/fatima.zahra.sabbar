// /app/components/Navbar.tsx
'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { useLocale } from './LocaleProvider';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const { t } = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = ['home', 'about', 'skills', 'projects', 'services', 'testimonials', 'blog', 'contact'];

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Check if we're on a blog page
    if (pathname && pathname.includes('/blog/')) {
      setTimeout(() => setActiveSection('blog'), 0);
      return;
    }

    const handleScroll = () => {
      // Scrolled state for navbar background
      setScrolled(window.scrollY > 50);

      // Active section tracking
      let currentSection = 'home';
      for (const item of navItems) {
        const section = document.getElementById(item);
        if (section && window.scrollY >= section.offsetTop - 150) {
          currentSection = item;
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [pathname]);

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'scrolled' : ''}`}>
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link
          href="#home"
          className="navbar-brand"
          data-aos="fade-right"
          data-aos-duration="800"
          data-aos-delay="100"
        >
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
          data-aos="fade-left"
          data-aos-duration="800"
          data-aos-delay="100"
        >
          <span>
            <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'}`}></i>
          </span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {navItems.map((item, index) => (
              <li
                className="nav-item"
                key={item}
                data-aos="fade-down"
                data-aos-duration="600"
                data-aos-delay={100 + (index * 50)}
              >
                <Link
                  href={`#${item}`}
                  className={`nav-link ${activeSection === item ? 'active' : ''} d-inline-block`}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  {t(`nav.${item}`)}
                </Link>
              </li>
            ))}
          </ul>

          <div
            className="d-flex align-items-center gap-3 ms-lg-4 mt-3 mt-lg-0"
            data-aos="fade-left"
            data-aos-duration="800"
            data-aos-delay="500"
          >
            <a
              href="https://github.com/website-devloper"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link p-0"
              aria-label="GitHub"
              data-aos="zoom-in"
              data-aos-duration="600"
              data-aos-delay="600"
            >
              <i className="bi bi-github fs-5"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/fatima-zahra-sabbar-906b40195/"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-link p-0"
              aria-label="LinkedIn"
              data-aos="zoom-in"
              data-aos-duration="600"
              data-aos-delay="700"
            >
              <i className="bi bi-linkedin fs-5"></i>
            </a>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
