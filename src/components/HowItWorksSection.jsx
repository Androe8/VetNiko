import Icon from './Icon.jsx'

//Aqui definimos un arreglo de objetos `steps`, donde cada objeto representa un paso en el proceso de uso de la aplicación.
//  Cada paso tiene propiedades como `number`, `title` y `description`. 
// Esto permite que la sección "Cómo funciona" sea fácilmente escalable y mantenible, ya que podemos agregar,
//  eliminar o modificar pasos simplemente editando este arreglo.
const steps = [
  { number: '01', title: 'Crea su perfil', description: 'Guarda sus datos importantes y conoce sus necesidades.' },
  { number: '02', title: 'Organiza su cuidado', description: 'Registra su salud y ten presentes las próximas fechas.' },
  { number: '03', title: 'Disfruta con tranquilidad', description: 'Consulta información útil y mantén su perfil actualizado.' },
]

// El componente `HowItWorksSection` es un componente funcional de React que renderiza la sección "Cómo funciona"
//  de la página de inicio mediante una lista de pasos tipo json.
function HowItWorksSection({ onOpenWorkspace }) {
  return (
    <section className="how-section section-spacing" id="como-funciona">
      <div className="page-container how-inner">
        <div className="how-heading">
          <span className="eyebrow">Simple desde el primer día</span>
          <h2>Más tiempo para lo que <span>de verdad importa.</span></h2>
          <p>Una forma práctica de tener el cuidado de tu mascota siempre presente.</p>
          <button className="button button-light" type="button" onClick={onOpenWorkspace}>
            Crear perfil gratis <Icon name="arrow" size={18} />
          </button>
        </div>
        <div className="steps-list">
          {steps.map((step) => (
            <article className="step-item" key={step.number}>
              <span className="step-number">{step.number}</span>
              <div><h3>{step.title}</h3><p>{step.description}</p></div>
              {step.number === '03' && <Icon className="step-heart" name="heart" size={23} />}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorksSection
