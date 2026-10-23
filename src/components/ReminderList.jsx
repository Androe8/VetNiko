import Icon from './Icon.jsx'
import { formatDate, getLocalDateValue } from '../utils/date.js'

// El componente `ReminderList` es un componente funcional de React que renderiza una lista de recordatorios para el cuidado de la mascota.
//  Recibe un arreglo de recordatorios y funciones para alternar el estado de completado y eliminar recordatorios.
function ReminderList({ reminders, onToggle, onDelete }) {
  const orderedReminders = [...reminders].sort((first, second) => (
    first.date.localeCompare(second.date)
  ))

  if (orderedReminders.length === 0) {
    return (
      <div className="empty-reminders">
        <span className="empty-reminders-icon"><Icon name="calendar" size={21} /></span>
        <strong>Aún no tienes recordatorios</strong>
        <p>Agrega una fecha importante para el cuidado de tu mascota.</p>
      </div>
    )
  }
  // Renderizamos la lista de recordatorios ordenados por fecha, mostrando el título, tipo, fecha y estado de cada recordatorio.
  return (
    <ul className="reminder-list">
      {orderedReminders.map((reminder) => {
        const isOverdue = !reminder.completed && reminder.date < getLocalDateValue()

        return (
          <li className={`reminder-row${reminder.completed ? ' is-completed' : ''}`} key={reminder.id}>
            <button
              className="reminder-toggle"
              type="button"
              aria-label={`${reminder.completed ? 'Marcar pendiente' : 'Marcar completado'}: ${reminder.title}`}
              aria-pressed={reminder.completed}
              onClick={() => onToggle(reminder.id)}
            >
              <Icon name="check" size={15} />
            </button>
            <div className="reminder-details">
              <strong>{reminder.title}</strong>
              <span>{reminder.type} · {formatDate(reminder.date)}</span>
            </div>
            {isOverdue && <span className="reminder-status overdue">Vencido</span>}
            {reminder.completed && <span className="reminder-status completed">Listo</span>}
            <button
              className="reminder-delete"
              type="button"
              aria-label={`Eliminar recordatorio: ${reminder.title}`}
              onClick={() => onDelete(reminder.id)}
            >
              <Icon name="close" size={17} />
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default ReminderList
