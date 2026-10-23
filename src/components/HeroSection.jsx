import Icon from './Icon.jsx'
import heroPet from '../assets/images/hero-pet.jpg'

// El componente `HeroSection` es un componente funcional de React
//  que renderiza la sección principal de la página de inicio, conocida como "hero section". 
// Esta sección incluye un título, una descripción, botones de acción y elementos visuales relacionados con el cuidado de mascotas.
function HeroSection({ onOpenWorkspace }) {
  return (
    <section className="hero-section" id="inicio">
      <div className="hero-inner page-container">
        <div className="hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> Cuidarlos mejor, todos los días</span>
          <h1>Su bienestar merece estar <span>siempre en buenas manos.</span></h1>
          <p className="hero-description">
            La vida con tu mascota tiene muchas aventuras. Haz que su salud y seguridad
            sean más fáciles de cuidar, en un solo lugar.
          </p>
          <div className="hero-actions">
            <button className="button" type="button" onClick={onOpenWorkspace}>
              Crear perfil de mi mascota <Icon name="arrow" size={18} />
            </button>
            <a className="text-link" href="#como-funciona"><span className="play-icon">▶</span> Conoce cómo funciona</a>
          </div>
          <div className="hero-note">
            <span className="note-icon"><Icon name="heart" size={17} /></span>
            <span>Más tranquilidad para ti. <strong>Más cuidado para ellos.</strong></span>
          </div>
        </div>

        <div className="hero-visual" aria-label="Perro acompañado de sus recordatorios de salud">
          <div className="hero-photo">
            <img src={heroPet} alt="Perro golden retriever disfrutando al aire libre" />
            <div className="photo-label"><span className="live-dot" /> Un cuidado más conectado</div>
          </div>
          <div className="floating-card reminder-card">
            <span className="reminder-icon"><Icon name="calendar" size={19} /></span>
            <span className="reminder-copy"><strong>Todo bajo control</strong><small>Recordatorios a tiempo</small></span>
            <span className="reminder-check"><Icon name="check" size={15} /></span>
          </div>
          <div className="floating-card care-card">
            <span className="care-icon"><Icon name="shield" size={20} /></span>
            <span><strong>Su ficha de cuidado</strong><small>Disponible en tu navegador</small></span>
          </div>
          <span className="hero-sparkle sparkle-one"><Icon name="sparkles" size={28} /></span>
          <span className="hero-sparkle sparkle-two"><Icon name="paw" size={24} /></span>
        </div>
      </div>
      <div className="hero-bottom page-container">
        <p>Un compañero para cada etapa de su vida</p>
        <div className="hero-benefits">
          <span><Icon name="check" size={16} /> Salud organizada</span>
          <span><Icon name="check" size={16} /> Identificación segura</span>
          <span><Icon name="check" size={16} /> Cuidado informado</span>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
