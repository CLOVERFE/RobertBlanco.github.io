import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const AnimatedBackground = () => {
  const backgroundRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const background = backgroundRef.current
    if (!background) return

    // Crear partículas dinámicas
    const particles = []
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div')
      particle.className = 'animated-particle'
      particle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(220, 38, 38, 0.3);
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
      `
      background.appendChild(particle)
      particles.push(particle)
    }

    particlesRef.current = particles

    // Animación de partículas flotantes
    particles.forEach((particle, index) => {
      gsap.to(particle, {
        y: -100,
        x: Math.random() * 200 - 100,
        duration: 10 + Math.random() * 20,
        repeat: -1,
        yoyo: true,
        ease: "none",
        delay: index * 0.1
      })
    })

    // Animación del fondo con scroll
    gsap.to(background, {
      backgroundPosition: "0% 100%",
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    })

    // Animación de líneas de fondo
    const lines = background.querySelectorAll('.background-line')
    lines.forEach((line, index) => {
      gsap.fromTo(line, 
        {
          scaleX: 0,
          opacity: 0
        },
        {
          scaleX: 1,
          opacity: 0.1,
          duration: 2,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: line,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      )
    })

    // Animación de elementos geométricos
    const geometricElements = background.querySelectorAll('.geometric-element')
    geometricElements.forEach((element, index) => {
      gsap.fromTo(element,
        {
          rotation: 0,
          scale: 0.8,
          opacity: 0
        },
        {
          rotation: 360,
          scale: 1,
          opacity: 0.05,
          duration: 20,
          repeat: -1,
          ease: "none",
          delay: index * 2
        }
      )
    })

    return () => {
      particles.forEach(particle => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle)
        }
      })
    }
  }, [])

  return (
    <div ref={backgroundRef} className="animated-background">
      {/* Líneas de fondo animadas */}
      <div className="background-line" style={{
        position: 'absolute',
        top: '20%',
        left: '0',
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.3), transparent)',
        transformOrigin: 'left center'
      }}></div>
      
      <div className="background-line" style={{
        position: 'absolute',
        top: '40%',
        left: '0',
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
        transformOrigin: 'left center'
      }}></div>
      
      <div className="background-line" style={{
        position: 'absolute',
        top: '60%',
        left: '0',
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(220, 38, 38, 0.2), transparent)',
        transformOrigin: 'left center'
      }}></div>
      
      <div className="background-line" style={{
        position: 'absolute',
        top: '80%',
        left: '0',
        width: '100%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent)',
        transformOrigin: 'left center'
      }}></div>

      {/* Elementos geométricos */}
      <div className="geometric-element" style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: '100px',
        height: '100px',
        border: '1px solid rgba(220, 38, 38, 0.1)',
        transformOrigin: 'center center'
      }}></div>
      
      <div className="geometric-element" style={{
        position: 'absolute',
        top: '30%',
        right: '15%',
        width: '80px',
        height: '80px',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        transformOrigin: 'center center'
      }}></div>
      
      <div className="geometric-element" style={{
        position: 'absolute',
        bottom: '20%',
        left: '20%',
        width: '60px',
        height: '60px',
        border: '1px solid rgba(220, 38, 38, 0.08)',
        transformOrigin: 'center center'
      }}></div>
      
      <div className="geometric-element" style={{
        position: 'absolute',
        bottom: '40%',
        right: '25%',
        width: '120px',
        height: '120px',
        border: '1px solid rgba(255, 255, 255, 0.03)',
        transformOrigin: 'center center'
      }}></div>
    </div>
  )
}

export default AnimatedBackground
