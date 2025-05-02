import { useState } from 'react';
import yapeqr from '../../public/img/yapeEmerson.png';
import '../assets/Apoyo.css';
const Apoyo = () => {
  const yapeLink = import.meta.env.VITE_YAPE_APP_LINK;
  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <section className="apoyo-section" >

      <div className="apoyo-card" id='apoya'>
        <h2 className="apoyo-title">¿Quieres apoyarnos? 💖</h2>
        <p className="apoyo-description">
          Tu generoso apoyo se destina directamente a la mejora y mantenimiento de esta plataforma,
          permitiéndonos seguir ofreciendo un servicio de calidad y continuar con el desarrollo de nuevas funcionalidades.
          Con tu ayuda, estamos construyendo un proyecto que beneficia a toda la comunidad.
          ¡Gracias por ser parte fundamental de nuestro crecimiento!
        </p>

        <div className="apoyo-content">
          <div className="apoyo-box">
            <h3 className="apoyo-box-title">Donar con Yape</h3>
            <img
              src={yapeqr}
              alt="QR Yape"
              className="apoyo-img"
              onClick={handleImageClick}
            />
            <a href={yapeLink} className="apoyo-button" target="_blank" rel="noopener noreferrer">
              Abrir Yape para donar
            </a>
            <p className="apoyo-note">Haz clic en el QR para ampliarlo</p>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="apoyo-modal" onClick={handleCloseModal}>
          <div className="apoyo-modal-content">
            <button className="apoyo-close" onClick={handleCloseModal}>✖</button>
            <img src={yapeqr} alt="QR Ampliado" className="apoyo-img-modal" />
          </div>
        </div>
      )}
    </section>
  );
};

export default Apoyo;
