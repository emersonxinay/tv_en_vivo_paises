import React from 'react';
import './footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo de la app */}
        <div className="footer-logo">
          <p>Desarrollado con amor</p>
          <a href="http://compilandocode.com" target="_blank" rel="noopener noreferrer"> <span>CompilandoTV</span></a>
        </div>



        {/* Redes sociales */}
        <div className="footer-social">
          <a
            href="https://github.com/emersonxinay"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/emerson-espinoza-aguirre"
            aria-label="LinkedIn"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="footer-copy">
        © 2025 AppTV. Todos los derechos reservados.
      </div>
    </footer>
  );
}
