import Icon from './Icon.jsx'

// Aquí definimos un arreglo de objetos `features`, donde cada objeto representa una característica de la aplicación.
//  Cada característica tiene propiedades como `icon`, `eyebrow`, `title`, `description`, `bullets` y `color`. 
// Esto permite que la sección de características sea fácilmente escalable y mantenible, ya que podemos agregar,
//  eliminar o modificar características simplemente editando este arreglo.
const features = [
  {
    icon: 'calendar',
    eyebrow: 'SALUD ORGANIZADA',
    title: 'Su historia, siempre a la mano.',
    description: 'Lleva un registro claro de vacunas, desparasitación, medicamentos, exámenes y citas veterinarias.',
    bullets: ['Recordatorios para fechas importantes', 'Historial médico en un solo lugar'],
    color: 'feature-mint',
  },
  {
    icon: 'shield',
    eyebrow: 'IDENTIDAD Y SEGURIDAD',
    title: 'Prepara su información para estar a salvo.',
    description: 'Mantén a la mano los datos importantes de tu mascota en su ficha dentro de este dispositivo.',
    bullets: ['Perfil accesible desde tu navegador', 'La función QR estará disponible más adelante'],
    color: 'feature-peach',
  },
  {
    icon: 'book',
    eyebrow: 'PREVENCIÓN Y APRENDIZAJE',
    title: 'Decisiones más informadas, cada día.',
    description: 'Encuentra orientación de cuidado pensada para las necesidades y la etapa de vida de tu mascota.',
    bullets: ['Guías de cuidado preventivo', 'Seguimiento de peso y señales de alerta'],
    color: 'feature-lilac',
  },
]

// El componente `FeaturesSection` es un componente funcional de React que renderiza la sección de características de la aplicación.
function FeaturesSection() {
  return (
    <section className="features-section section-spacing" id="soluciones">
      <div className="page-container">
        <div className="section-heading">
          <span className="eyebrow">Todo lo que necesitan, más cerca</span>
          <h2>Una vida más sana empieza <span>con buenos hábitos.</span></h2>
          <p>Herramientas sencillas para acompañarte en el cuidado de quien siempre está a tu lado.</p>
        </div>
        <div className="feature-grid">
          {features.map((feature) => (
            <article className={`feature-card ${feature.color}`} key={feature.eyebrow}>
              <span className="feature-icon"><Icon name={feature.icon} size={23} /></span>
              <span className="feature-eyebrow">{feature.eyebrow}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <ul> {/* `bullets` es un arreglo de elementos que se renderiza como una lista de viñetas, 
              donde cada viñeta incluye un ícono de verificación y el texto correspondiente. */}
                {feature.bullets.map((bullet) => (
                  <li key={bullet}><Icon name="check" size={16} />{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
