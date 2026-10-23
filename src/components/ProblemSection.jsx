import Icon from './Icon.jsx'

// Definimos un arreglo `challenges` que contiene los desafíos que enfrentan los dueños de mascotas,
//  cada uno con un número, ícono, título, descripción y tono de color.
const challenges = [
  {
    number: '01',
    icon: 'calendar',
    title: 'La salud no debería depender de la memoria',
    description: 'Vacunas, medicamentos y controles pueden quedar en papeles sueltos o pasar desapercibidos.',
    tone: 'mint',
  },
  {
    number: '02',
    icon: 'pin',
    title: 'Cuando se pierde, cada minuto importa',
    description: 'Sin una identificación actualizada, encontrar a tu compañero puede ser mucho más difícil.',
    tone: 'peach',
  },
  {
    number: '03',
    icon: 'book',
    title: 'Cuidar también es saber qué hacer',
    description: 'Con tanta información, no siempre es fácil reconocer qué cuidados preventivos necesita.',
    tone: 'lilac',
  },
]

// El componente `ProblemSection` es un componente funcional de React que renderiza la sección de desafíos de la página de inicio,
//  mostrando los problemas comunes que enfrentan los dueños de mascotas y cómo la aplicación puede ayudar a resolverlos.
function ProblemSection() {
  return (
    <section className="problem-section section-spacing" id="desafio">
      <div className="page-container">
        <div className="section-heading">
          <span className="eyebrow">Cuidar puede ser más sencillo</span>
          <h2>Pequeños olvidos. <span>Grandes preocupaciones.</span></h2>
          <p>Sabemos que acompañar a una mascota implica estar pendiente de muchas cosas.</p>
        </div>
        <div className="challenge-grid">
          {challenges.map((challenge) => (
            <article className="challenge-card" key={challenge.number}>
              <div className="challenge-topline">
                <span className={`challenge-icon ${challenge.tone}`}><Icon name={challenge.icon} size={22} /></span>
                <span className="challenge-number">{challenge.number}</span>
              </div>
              <h3>{challenge.title}</h3>
              <p>{challenge.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
