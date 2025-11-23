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
