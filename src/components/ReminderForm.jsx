import { useState } from 'react'
import Icon from './Icon.jsx'
import { getLocalDateValue } from '../utils/date.js'

// Definimos un arreglo `reminderTypes` que contiene los tipos de recordatorios disponibles para el usuario.
const reminderTypes = ['Vacuna', 'Desparasitación', 'Cita veterinaria', 'Medicamento', 'Otro']

// La función `createId` genera un identificador único para cada recordatorio, utilizando la API de `crypto` si está disponible,
//  o una combinación de la fecha actual y un número aleatorio como alternativa. Esto asegura que cada recordatorio tenga un identificador único.
function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `care-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function ReminderForm({ onAdd }) {
  const [title, setTitle] = useState('')
  const [type, setType] = useState(reminderTypes[0])
  const [date, setDate] = useState(getLocalDateValue())

  function handleSubmit(event) {
    event.preventDefault()
    const reminderTitle = title.trim()
    if (!reminderTitle) return

    onAdd({
      id: createId(),
      title: reminderTitle,
      type,
      date,
      completed: false,
    })
    setTitle('')
    setType(reminderTypes[0])
    setDate(getLocalDateValue())
  }

  return (
    <form className="reminder-form" onSubmit={handleSubmit}>
      <label className="form-field reminder-title-field">
        <span>¿Qué necesitas recordar?</span>
        <input
          maxLength={80}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Ej. Refuerzo de vacuna"
          required
          value={title}
        />
      </label>
      <label className="form-field">
        <span>Tipo</span>
        <select onChange={(event) => setType(event.target.value)} value={type}>
          {reminderTypes.map((reminderType) => (
            <option key={reminderType} value={reminderType}>{reminderType}</option>
          ))}
        </select>
      </label>
      <label className="form-field">
        <span>Fecha</span>
        <input
          onChange={(event) => setDate(event.target.value)}
          required
          type="date"
          value={date}
        />
      </label>
      <button className="button reminder-submit" type="submit">
        <Icon name="check" size={17} /> Agregar
      </button>
    </form>
  )
}

export default ReminderForm
