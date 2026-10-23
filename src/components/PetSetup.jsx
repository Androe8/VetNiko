import { useState } from 'react'
import Icon from './Icon.jsx'
import { getLocalDateValue } from '../utils/date.js'

// Definimos un arreglo `speciesOptions` que contiene las opciones de especies de mascotas disponibles para el usuario.
const speciesOptions = [
  { value: 'perro', label: 'Perro' },
  { value: 'gato', label: 'Gato' },
  { value: 'otro', label: 'Otro' },
]

function createId() {
  return globalThis.crypto?.randomUUID?.() ?? `pet-${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function PetSetup({ initialPet, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: initialPet?.name ?? '',
    species: initialPet?.species ?? 'perro',
    breed: initialPet?.breed ?? '',
    birthDate: initialPet?.birthDate ?? '',
    weight: initialPet?.weight ?? '',
  })

  function updateField(event) {
    const { name, value } = event.target
    event.target.setCustomValidity('')
    setForm((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const petName = form.name.trim()
    if (!petName) {
      const nameInput = event.currentTarget.elements.namedItem('name')
      nameInput.setCustomValidity('Por favor, escribe el nombre de tu mascota.')
      nameInput.reportValidity()
      return
    }

    onSave({
      id: initialPet?.id ?? createId(),
      ...form,
      name: petName,
      breed: form.breed.trim(),
      weight: form.weight === '' ? null : Number(form.weight),
    })
  }

  return (
    <section className="setup-section page-container" aria-labelledby="setup-title">
      <div className="setup-card">
        <span className="eyebrow"><Icon name="paw" size={17} /> Su compañero, primero</span>
        <h1 id="setup-title">{initialPet ? 'Actualiza su perfil' : 'Empecemos por conocerle'}</h1>
        <p className="setup-description">
          Completa lo esencial. Puedes cambiar esta información más adelante.
        </p>
        <form className="pet-form" onSubmit={handleSubmit}>
          <label className="form-field">
            <span>Nombre <span className="required-mark">*</span></span>
            <input
              autoComplete="off"
              autoFocus
              maxLength={40}
              name="name"
              onChange={updateField}
              onInvalid={(event) => {
                event.currentTarget.setCustomValidity('Por favor, escribe el nombre de tu mascota.')
              }}
              placeholder="Ej. Niko"
              required
              value={form.name}
            />
          </label>
          <label className="form-field">
            <span>Especie <span className="required-mark">*</span></span>
            <select name="species" onChange={updateField} required value={form.species}>
              {speciesOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
          <label className="form-field">
            <span>Raza <span className="optional-label">Opcional</span></span>
            <input
              maxLength={60}
              name="breed"
              onChange={updateField}
              placeholder="Ej. Criollo"
              value={form.breed}
            />
          </label>
          <label className="form-field">
            <span>Fecha de nacimiento <span className="optional-label">Opcional</span></span>
            <input
              max={getLocalDateValue()}
              name="birthDate"
              onChange={updateField}
              type="date"
              value={form.birthDate}
            />
          </label>
          <label className="form-field">
            <span>Peso en kg <span className="optional-label">Opcional</span></span>
            <input
              max="200"
              min="0.1"
              name="weight"
              onChange={updateField}
              placeholder="Ej. 8.5"
              step="0.1"
              type="number"
              value={form.weight}
            />
          </label>
          <p className="form-privacy">
            <Icon name="shield" size={17} />
            Esta información se guarda únicamente en este navegador.
          </p>
          <div className="form-actions">
            <button className="button" type="submit">
              Guardar perfil <Icon name="arrow" size={18} />
            </button>
            <button className="button-quiet" type="button" onClick={onCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default PetSetup
