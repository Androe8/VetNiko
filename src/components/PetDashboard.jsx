import { useState } from 'react'
import Icon from './Icon.jsx'
import ReminderForm from './ReminderForm.jsx'
import ReminderList from './ReminderList.jsx'
import PetDeleteDialog from './PetDeleteDialog.jsx'
import { formatDate } from '../utils/date.js'

// Definimos un objeto `speciesLabels` que mapea las especies de mascotas a sus etiquetas correspondientes. 
// Esto nos permite mostrar nombres legibles para el usuario en lugar de valores internos.
const speciesLabels = {
  perro: 'Perro',
  gato: 'Gato',
  otro: 'Otro',
}

//Aqui definimos el componente `PetDashboard`, que es un componente funcional de React que renderiza el panel de control 
// del usuario para su mascota.
function PetDashboard({
  pet,
  reminders,
  hasStorageError,
  onEditPet,
  onDeletePet,
  onAddReminder,
  onToggleReminder,
  onDeleteReminder,
}) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const pendingCount = reminders.filter((reminder) => !reminder.completed).length

  // Renderizamos el panel de control del usuario para su mascota, que incluye la información del perfil de la mascota,
  //  un resumen de los cuidados pendientes y la agenda de cuidados. También se muestra un diálogo de confirmación
  //  cuando el usuario intenta eliminar el perfil de su mascota.
  return (
    <>
      <section className="workspace-section page-container" id="workspace">
        <div className="workspace-heading">
          <div>
            <span className="eyebrow">Tu espacio VetNiko</span>
            <h1>Hola, {pet.name} <span className="greeting-paw">🐾</span></h1>
            <p>Un lugar sencillo para tener presente su cuidado.</p>
          </div>
          <button className="button button-outline" type="button" onClick={onEditPet}>
            Editar perfil
          </button>
        </div>

        <div className="workspace-grid">
          <section className="pet-profile-card" id="pet-card" aria-labelledby="pet-card-title">
            <div className="pet-profile-top">
              <span className="pet-avatar"><Icon name="paw" size={31} /></span>
              <span className={`profile-tag${hasStorageError ? ' profile-tag-warning' : ''}`}>
                <Icon name={hasStorageError ? 'close' : 'check'} size={14} />
                {hasStorageError ? 'Solo en esta sesión' : 'Guardado en navegador'}
              </span>
            </div>
            <h2 id="pet-card-title">{pet.name}</h2>
            <p className="pet-subtitle">
              {[speciesLabels[pet.species] ?? 'Mascota', pet.breed].filter(Boolean).join(' · ')}
            </p>
            <div className="pet-facts">
              {pet.birthDate && (
                <div><span>Fecha de nacimiento</span><strong>{formatDate(pet.birthDate)}</strong></div>
              )}
              {pet.weight && (
                <div><span>Peso registrado</span><strong>{pet.weight} kg</strong></div>
              )}
              {!pet.birthDate && !pet.weight && (
                <p className="profile-hint">Agrega su fecha de nacimiento y peso para completar la ficha.</p>
              )}
            </div>
            <button className="text-button" type="button" onClick={onEditPet}>
              Completar o editar datos <Icon name="arrow" size={16} />
            </button>
            <button
              className="text-button delete-pet-button"
              type="button"
              onClick={() => setDeleteDialogOpen(true)}
            >
              Eliminar perfil de {pet.name}
            </button>
          </section>

          <section className="care-summary-card" aria-label="Resumen de cuidados">
            <span className="care-summary-icon"><Icon name="calendar" size={21} /></span>
            <span className="care-summary-label">Pendientes en tu agenda</span>
            <strong className="care-summary-count">{pendingCount}</strong>
            <span className="care-summary-caption">
              {pendingCount === 1 ? 'cuidado por atender' : 'cuidados por atender'}
            </span>
            <a href="#care-schedule">Ver agenda <Icon name="arrow" size={15} /></a>
          </section>

          <section className="care-schedule-card" id="care-schedule" aria-labelledby="care-title">
            <div className="care-section-heading">
              <div>
                <span className="eyebrow">Organiza su salud</span>
                <h2 id="care-title">Agenda de cuidados</h2>
              </div>
            </div>
            <ReminderForm onAdd={onAddReminder} />
            <ReminderList
              reminders={reminders}
              onToggle={onToggleReminder}
              onDelete={onDeleteReminder}
            />
          </section>

          <aside className="local-data-note">
            <Icon name="shield" size={19} />
            <p>
              <strong>Solo en este dispositivo.</strong> Tu perfil y agenda se guardan en este navegador.
              No hay cuenta, sincronización ni avisos automáticos todavía.
            </p>
          </aside>
        </div>
      </section>
      { /*//Aqui se renderiza el diálogo de confirmación para eliminar el perfil de la mascota, que se muestra
      //  cuando el estado `deleteDialogOpen` es verdadero. El diálogo recibe el nombre de la mascota y funciones
      //  para cancelar o confirmar la eliminación.*/ }
      {deleteDialogOpen && (
        <PetDeleteDialog
          petName={pet.name}
          onCancel={() => setDeleteDialogOpen(false)}
          onConfirm={onDeletePet}
        />
      )}
    </>
  )
}

export default PetDashboard
