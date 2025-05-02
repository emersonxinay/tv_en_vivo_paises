import React from 'react';
import './footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <p className="footer-text">Desarrollado con ❤️ por</p>
          <a href="https://compilandocode.com" target="_blank" rel="noopener noreferrer" className="footer-link">Compilandocode</a>
          <span className="footer-divider"> y </span>
          <a href="https://emersonespinoza.com" target="_blank" rel="noopener noreferrer" className="footer-link">Emerson Espinoza</a>
        </div>

        <div className="footer-social">
          <a href="https://github.com/emersonxinay" target="_blank" rel="noopener noreferrer" className="footer-social-link">GitHub</a>
          <a href="https://www.linkedin.com/in/emerson-espinoza-aguirre" target="_blank" rel="noopener noreferrer" className="footer-social-link">LinkedIn</a>
        </div>
      </div>

      <div className="footer-copy">
        © 2025 AppTV. Todos los derechos reservados.
      </div>
    </footer>

  );
}
