import React, { useState } from 'react';
import logoImg from '../../../public/img/compitv.png';
import portada from '../../../public/img/portadacompitv.png';
import './Navbar.css';

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="navbar_compitv">
        <div className="navbar_compitv_container">
          {/* Logo y título */}
          <div className="navbar_compitv_brand">
            <img src={logoImg} alt="CompiTV Logo" className="navbar_compitv_logo" />
            <div className="navbar_compitv_texts">
              <h1 className="navbar_compitv_title">CompiTV</h1>
              <p className="navbar_compitv_subtitle">TV en Vivo por País</p>
            </div>

            {/* Botón menú hamburguesa */}
            <button
              className="navbar_toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Abrir menú"
            >
              ☰
            </button>
          </div>

          {/* Enlaces */}
          <nav className={`navbar_compitv_links ${menuOpen ? 'active' : ''}`}>
            <a href="#tv" className="navbar_compitv_link">Tv</a>
            <a href="#mapa3d" className="navbar_compitv_link">Mapa3D</a>
            <a href="#favoritos" className="navbar_compitv_link">Favoritos</a>
            <a href="#apoya" className="navbar_compitv_link">Apoya</a>
          </nav>
        </div>
      </header>

      <section className="platform-description">
        <div className="platform-description-container">
          <div className="card platform-card platform-card--intro">
            <h2 className="card-title">¿Qué es CompiTV?</h2>
            <p className="card-text">
              CompiTV es una plataforma global que conecta a las audiencias con canales de señal abierta, así como con canales que buscan ampliar su visibilidad internacional. Accede fácilmente a contenido en vivo y diverso desde cualquier parte del mundo.
            </p>
            <img src={portada} alt="Portada CompiTV" className="img-portada" />
          </div>

          <div className="card platform-card platform-card--steps">
            <h2 className="card-title">¿Cómo funciona?</h2>
            <ul className="platform-description-steps">
              <li><strong>1. Selecciona tu país:</strong> Desde el mapa 3D interactivo o mediante el menú desplegable.</li>
              <li><strong>2. Explora los canales:</strong> Se mostrarán todos los canales disponibles para ese país.</li>
              <li><strong>3. Cambia de canal:</strong> Usa los botones "Siguiente" y "Atrás".</li>
              <li><strong>4. Usa la búsqueda:</strong> Localiza un canal por nombre fácilmente.</li>
              <li><strong>5. Guarda tus favoritos:</strong> Haz clic en el ícono para conservar tus canales preferidos y acceder a ellos más rápido la próxima vez.</li>
            </ul>
          </div>
        </div>

      </section>
    </>
  );
};

export default NavBar;
