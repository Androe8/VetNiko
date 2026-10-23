import { useEffect, useRef } from 'react'
import Icon from './Icon.jsx'

// El componente `PetDeleteDialog` es un componente funcional de React que renderiza un diálogo de confirmación
//  para eliminar el perfil de una mascota. Recibe el nombre de la mascota y funciones para cancelar o confirmar la eliminación.
function PetDeleteDialog({ petName, onCancel, onConfirm }) {
  const dialogRef = useRef(null)

  useEffect(() => {
    function handleDialogKeys(event) {
      if (event.key === 'Escape') {
        onCancel()
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
  }, [onCancel])

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) onCancel()
  }

  return (
    <div className="dialog-backdrop" onMouseDown={handleBackdropClick}>
      <section
        aria-labelledby="delete-pet-title"
        aria-modal="true"
        className="pet-required-dialog delete-pet-dialog"
        ref={dialogRef}
        role="dialog"
      >
        <button
          aria-label="Cerrar confirmación"
          className="dialog-close"
          onClick={onCancel}
          type="button"
        >
          <Icon name="close" size={19} />
        </button>
        <span className="dialog-paw delete-dialog-icon"><Icon name="heart" size={26} /></span>
        <span className="eyebrow">Antes de continuar</span>
        <h2 id="delete-pet-title">¿Eliminar el perfil de {petName}?</h2>
        <p>
          Se borrarán el perfil y todos sus recordatorios de este navegador.
          Esta acción no se puede deshacer.
        </p>
        <div className="dialog-actions">
          <button className="button delete-confirm-button" onClick={onConfirm} type="button" autoFocus>
            Sí, eliminar perfil
          </button>
          <button className="button-quiet" onClick={onCancel} type="button">
            Mantener perfil
          </button>
        </div>
      </section>
    </div>
  )
}

export default PetDeleteDialog
