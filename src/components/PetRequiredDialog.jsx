import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'

// El componente `PetRequiredDialog` es un componente funcional de React que renderiza un diálogo de aviso
//  para informar al usuario que necesita crear un perfil de mascota antes de poder acceder a ciertas funciones.
//  Recibe funciones para cerrar el diálogo y para iniciar la creación del perfil.
function PetRequiredDialog({ onClose, onCreateProfile }) {
  const dialogRef = useRef(null)

  // Usamos un efecto para manejar la navegación por teclado dentro del diálogo. Esto permite al usuario cerrar el diálogo con la tecla "Escape" y navegar entre los botones usando la tecla "Tab".
  //  Esto mejora la accesibilidad y la experiencia del usuario al permitirle interactuar con el diálogo de manera más eficiente. 
  useEffect(() => {
    function handleDialogKeys(event) {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key !== 'Tab') return

      const buttons = dialogRef.current?.querySelectorAll('button:not([disabled])')
      if (!buttons?.length) return

      const firstButton = buttons[0]
      const lastButton = buttons[buttons.length - 1]

      if (event.shiftKey && document.activeElement === firstButton) {
        event.preventDefault()
        lastButton.focus()
      } else if (!event.shiftKey && document.activeElement === lastButton) {
        event.preventDefault()
        firstButton.focus()
      }
    }

    window.addEventListener('keydown', handleDialogKeys)
    return () => window.removeEventListener('keydown', handleDialogKeys)
  }, [onClose])

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) onClose()
  }

  return (
    <div className="dialog-backdrop" onMouseDown={handleBackdropClick}>
      <section
        aria-labelledby="pet-required-title"
        aria-modal="true"
        className="pet-required-dialog"
        ref={dialogRef}
        role="dialog"
      >
        <button
          aria-label="Cerrar aviso"
          className="dialog-close"
          onClick={onClose}
          type="button"
        >
          <Icon name="close" size={19} />
        </button>
        <span className="dialog-paw"><Icon name="paw" size={28} /></span>
        <span className="eyebrow">Un paso pequeño, mucho cuidado</span>
        <h2 id="pet-required-title">Primero, cuéntanos de tu mascota</h2>
        <p>
          Para mostrar su perfil y organizar su agenda necesitamos crear primero
          su ficha. Solo toma un momento, y podrás editarla cuando quieras.
        </p>
        <div className="dialog-actions">
          <button className="button" onClick={onCreateProfile} type="button" autoFocus>
            Crear perfil <Icon name="arrow" size={17} />
          </button>
          <button className="button-quiet" onClick={onClose} type="button">
            Ahora no
          </button>
        </div>
      </section>
    </div>
  )
}

export default PetRequiredDialog
