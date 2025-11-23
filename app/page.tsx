'use client';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Services from './components/Services';
import WhyChooseMe from './components/Whychooseme';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './globals.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      mirror: false,
    });
  }, []);


  return (
    <html lang="en">
      <body>
        <div>
          {/* JSON-LD Structured Data for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Fatima Zahra Sabbar",
                "url": "https://yourportfolio.com",
                "image": "https://yourportfolio.com/photome1.png",
                "sameAs": [
                  "https://twitter.com/yourusername",
                  "https://github.com/yourusername",
                  "https://linkedin.com/in/yourusername"
                ],
                "jobTitle": "Full Stack Developer",
                "worksFor": {
                  "@type": "Organization",
                  "name": "Freelance"
                },
                "description": "Professional Full Stack Developer specializing in modern web development, IT services, WordPress development, and automation workflows.",
                "knowsAbout": [
                  "Web Development",
                  "Full Stack Development",
                  "React",
                  "Next.js",
                  "WordPress",
                  "IT Solutions",
                  "Automation",
                  "UI/UX Design"
                ]
              })
            }}
          />
          <Navbar />
          <main>
            <div id="home">
              <Hero />
            </div>
            <div id="about">
              <About />
            </div>
            <div id="skills">
              <Skills />
            </div>
            <div id="projects">
              <Projects />
            </div>
            <div id="services">
              <Services />
            </div>
            <div id="why-choose-me">
              <WhyChooseMe />
            </div>
            {/* <div id="pricing">
              <Pricing />
            </div> */}
            <div id="testimonials">
              <Testimonials />
            </div>
            <div id="contact">
              <Contact />
            </div>
          </main>
          <Footer />
        </div>
      </body>
    </html>

  );
}
