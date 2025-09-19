import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AnimatedBackground from './components/AnimatedBackground'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'sobre-mi', 'proyectos', 'contacto']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animaciones GSAP al cargar la página
  useEffect(() => {
    // Animación de entrada para el hero
    gsap.fromTo('.hero-title', 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    
    gsap.fromTo('.hero-subtitle', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power3.out" }
    )
    
    gsap.fromTo('.hero-buttons', 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power3.out" }
    )
    
    gsap.fromTo('.profile-image', 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.2, delay: 0.4, ease: "back.out(1.7)" }
    )

    // Animaciones de scroll para las secciones
    gsap.utils.toArray('section').forEach((section, index) => {
      if (section.id !== 'inicio') {
        gsap.fromTo(section,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    })

    // Animación de las tarjetas de proyectos
    gsap.utils.toArray('.project-card').forEach((card, index) => {
      gsap.fromTo(card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    // Animación de las habilidades
    gsap.utils.toArray('.skill-item').forEach((skill, index) => {
      gsap.fromTo(skill,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: index * 0.05,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: skill,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform - Jemma",
      description: "Plataforma de comercio electrónico desarrollada durante mi tiempo en Jemma. Incluye sistema de gestión de productos, carrito de compras y procesamiento de pagos.",
      technologies: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
      image: "/src/assets/images/ecommerce-jemma.jpg",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 2,
      title: "Corporate Website - Jemma",
      description: "Sitio web corporativo responsivo con sistema de gestión de contenido personalizado. Optimizado para SEO y rendimiento.",
      technologies: ["WordPress", "PHP", "JavaScript", "CSS3", "MySQL"],
      image: "/src/assets/images/corporate-website.jpg",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 3,
      title: "Adventure Game - Artizan",
      description: "Videojuego de aventura 2D desarrollado en Unity. Participé en la programación del gameplay, mecánicas de combate y sistema de inventario.",
      technologies: ["Unity", "C#", "Game Design", "2D Animation", "Audio Design"],
      image: "/src/assets/images/adventure-game.jpg",
      liveUrl: "#",
      githubUrl: "#"
    },
    {
      id: 4,
      title: "Puzzle Platformer - Artizan",
      description: "Videojuego de plataformas con elementos de puzzle. Diseñé las mecánicas de juego y programé la lógica de los niveles.",
      technologies: ["Unity", "C#", "Level Design", "Puzzle Mechanics", "UI/UX"],
      image: "/src/assets/images/puzzle-platformer.jpg",
      liveUrl: "#",
      githubUrl: "#"
    }
  ]

  return (
    <div className="app">
      <AnimatedBackground />
      {/* Navegación */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">SENIOR.DEV</span>
          </div>
          <ul className="nav-menu">
            <li><button 
              className={activeSection === 'inicio' ? 'nav-link active' : 'nav-link'}
              onClick={() => scrollToSection('inicio')}
            >
              Inicio
            </button></li>
            <li><button 
              className={activeSection === 'sobre-mi' ? 'nav-link active' : 'nav-link'}
              onClick={() => scrollToSection('sobre-mi')}
            >
              Sobre Mí
            </button></li>
            <li><button 
              className={activeSection === 'proyectos' ? 'nav-link active' : 'nav-link'}
              onClick={() => scrollToSection('proyectos')}
            >
              Proyectos
            </button></li>
            <li><button 
              className={activeSection === 'contacto' ? 'nav-link active' : 'nav-link'}
              onClick={() => scrollToSection('contacto')}
            >
              Contacto
            </button></li>
          </ul>
        </div>
      </nav>

      {/* Sección Hero */}
      <section id="inicio" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              JOSE ROBERTO <span className="highlight">BLANCO PULIDO</span>
            </h1>
            <p className="hero-subtitle">
              Desarrollador Full Stack especializado en desarrollo web y videojuegos. Experiencia en empresas como Jemma y Artizan
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => scrollToSection('proyectos')}>
                Ver Proyectos
              </button>
              <button className="btn-secondary" onClick={() => scrollToSection('contacto')}>
                Contactar
              </button>
            </div>
          </div>
          <div className="hero-image">
            <div className="profile-card">
              <div className="profile-image">
                <div className="avatar">👨‍💻</div>
              </div>
            </div>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Sección Sobre Mí */}
      <section id="sobre-mi" className="about">
        <div className="container">
          <h2 className="section-title">Sobre Mí</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Desarrollador con experiencia en desarrollo web y videojuegos. Comencé mi carrera profesional 
                en la empresa Jemma, donde me especialicé en la creación de páginas web y aplicaciones web dinámicas. 
                Posteriormente, trabajé en Artizan como desarrollador de videojuegos, participando tanto en la 
                programación como en el game design.
              </p>
              <p>
                Mi experiencia abarca desde el desarrollo frontend y backend hasta la creación de experiencias 
                interactivas en videojuegos. Me apasiona combinar la creatividad del diseño con la precisión 
                de la programación para crear productos digitales innovadores y funcionales.
              </p>
              <div className="skills">
                <h3>Habilidades Técnicas</h3>
                <div className="skills-grid">
                  <div className="skill-item">
                    <img src="/src/assets/images/tech-icons/javascript.svg" alt="JavaScript" className="tech-icon" />
                    JavaScript ES6+
                  </div>
                  <div className="skill-item">
                    <img src="/src/assets/images/tech-icons/react.svg" alt="React" className="tech-icon" />
                    React/Next.js
                  </div>
                  <div className="skill-item">
                    <img src="/src/assets/images/tech-icons/nodejs.svg" alt="Node.js" className="tech-icon" />
                    Node.js/Express
                  </div>
                  <div className="skill-item">
                    <img src="/src/assets/images/tech-icons/html.svg" alt="HTML" className="tech-icon" />
                    HTML5/CSS3
                  </div>
                  <div className="skill-item">
                    <img src="/src/assets/images/tech-icons/unity.svg" alt="Unity" className="tech-icon" />
                    Unity Engine
                  </div>
                  <div className="skill-item">
                    <img src="/src/assets/images/tech-icons/csharp.svg" alt="C#" className="tech-icon" />
                    C# Programming
                  </div>
                  <div className="skill-item">
                    <img src="/src/assets/images/tech-icons/php.svg" alt="PHP" className="tech-icon" />
                    PHP/MySQL
                  </div>
                  <div className="skill-item">
                    <img src="/src/assets/images/tech-icons/gamedesign.svg" alt="Game Design" className="tech-icon" />
                    Game Design
                  </div>
                  <div className="skill-item">
                    <img src="/src/assets/images/tech-icons/figma.svg" alt="Figma" className="tech-icon" />
                    UI/UX Design
                  </div>
                  <div className="skill-item">
                    <img src="/src/assets/images/tech-icons/git.svg" alt="Git" className="tech-icon" />
                    Git/GitHub
                  </div>
                  <div className="skill-item">
                    <img src="/src/assets/images/tech-icons/wordpress.svg" alt="WordPress" className="tech-icon" />
                    WordPress
                  </div>
                  <div className="skill-item">
                    <img src="/src/assets/images/tech-icons/3dmodeling.svg" alt="3D Modeling" className="tech-icon" />
                    3D Modeling
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Proyectos */}
      <section id="proyectos" className="projects">
        <div className="container">
          <h2 className="section-title">Mis Proyectos</h2>
          <div className="projects-grid">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className="project-overlay">
                    <div className="project-links">
                      <a href={project.liveUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                        🌐 Demo
                      </a>
                      <a href={project.githubUrl} className="project-link" target="_blank" rel="noopener noreferrer">
                        📁 Código
                      </a>
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map(tech => (
                      <span key={tech} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección Contacto */}
      <section id="contacto" className="contact">
        <div className="container">
          <h2 className="section-title">Contacto</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>CONTACTO PROFESIONAL</h3>
              <p>
                Disponible para proyectos de desarrollo web y videojuegos. 
                Experiencia en desarrollo frontend, backend y game design. 
                Ubicado en Paso del Macho, Veracruz.
              </p>
              <div className="contact-methods">
                <div className="contact-method">
                  <span className="contact-icon">✉</span>
                  <span>jose.blanco.dev@gmail.com</span>
                </div>
                <div className="contact-method">
                  <span className="contact-icon">📞</span>
                  <span>+52 (271) 123-4567</span>
                </div>
                <div className="contact-method">
                  <span className="contact-icon">📍</span>
                  <span>Paso del Macho, Veracruz</span>
                </div>
              </div>
              <div className="social-links">
                <a href="#" className="social-link">LinkedIn</a>
                <a href="#" className="social-link">GitHub</a>
                <a href="#" className="social-link">Stack Overflow</a>
                <a href="#" className="social-link">Medium</a>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-group">
                <input type="text" placeholder="Tu nombre" className="form-input" />
              </div>
              <div className="form-group">
                <input type="email" placeholder="Tu email" className="form-input" />
              </div>
              <div className="form-group">
                <textarea placeholder="Tu mensaje" className="form-textarea" rows="5"></textarea>
              </div>
              <button type="submit" className="btn-primary">Enviar Mensaje</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Jose Roberto Blanco Pulido. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
