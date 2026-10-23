import { useRef, useState } from 'react'

// El hook `usePetData` es un hook personalizado de React que maneja el estado de los datos de la mascota y los recordatorios,
//  incluyendo la carga y almacenamiento en el almacenamiento local del navegador. Proporciona funciones para actualizar los datos y manejar errores de almacenamiento.

//aqui almacenamiento local del navegador. Proporciona funciones para actualizar los datos y manejar errores de almacenamiento. en el local storage del navegador. 
const STORAGE_KEY = 'vetniko:pet-data:v1'

const emptyData = {
  pet: null,
  reminders: [],
}

function containsOnlyDigits(value) {
  return [...value].every((character) => character >= '0' && character <= '9')
}

function isDateValue(value) {
  if (typeof value !== 'string' || value.length !== 10) return false

  // Valida el formato y también que el día exista en el calendario.
  const dateParts = value.split('-')
  if (dateParts.length !== 3) return false

  // Valida que el año tenga 4 dígitos, el mes y el día tengan 2 dígitos cada uno, y que todos sean números.
  const [yearText, monthText, dayText] = dateParts
  if (
    yearText.length !== 4 ||
    monthText.length !== 2 ||
    dayText.length !== 2
  ) return false

  if (![yearText, monthText, dayText].every(containsOnlyDigits)) return false

  const year = Number(yearText)
  const month = Number(monthText)
  const day = Number(dayText)
  if (year < 1 || month < 1 || month > 12 || day < 1 || day > 31) return false

  const parsedDate = new Date(0)
  parsedDate.setFullYear(year, month - 1, day)

  return parsedDate.getFullYear() === year &&
    parsedDate.getMonth() === month - 1 &&
    parsedDate.getDate() === day
}

// Valida que los datos cargados desde el almacenamiento local tengan la estructura y tipos esperados para
//  evitar errores en la aplicación.
function isStoredData(value) {
  return (
    value !== null &&
    typeof value === 'object' &&
    (value.pet === null || (
      typeof value.pet === 'object' &&
      typeof value.pet.id === 'string' &&
      typeof value.pet.name === 'string' &&
      ['perro', 'gato', 'otro'].includes(value.pet.species) &&
      typeof value.pet.breed === 'string' &&
      (value.pet.birthDate === '' || isDateValue(value.pet.birthDate)) &&
      (value.pet.weight === null || (
        typeof value.pet.weight === 'number' &&
        Number.isFinite(value.pet.weight)
      ))
    )) &&
    Array.isArray(value.reminders) &&
    value.reminders.every((reminder) => (
      reminder !== null &&
      typeof reminder === 'object' &&
      typeof reminder.id === 'string' &&
      typeof reminder.title === 'string' &&
      typeof reminder.type === 'string' &&
      isDateValue(reminder.date) &&
      typeof reminder.completed === 'boolean'
    ))
  )
}

// Carga los datos de la mascota y los recordatorios desde el almacenamiento local del navegador, 
// manejando errores y devolviendo un estado inicial válido. 

function loadData() {
  try {
    const savedValue = window.localStorage.getItem(STORAGE_KEY)
    if (!savedValue) return { data: emptyData, error: '' }

    const parsedValue = JSON.parse(savedValue)
    if (!isStoredData(parsedValue)) {
      return {
        data: emptyData,
        error: 'Los datos guardados no tienen un formato válido. Puedes crear un nuevo perfil en este dispositivo.',
      }
    }

    return { data: parsedValue, error: '' }
  } catch {
    return {
      data: emptyData,
      error: 'No fue posible leer el almacenamiento del navegador. Podrás continuar, pero los cambios podrían no conservarse.',
    }
  }
}

//aqui se realiza la carga de los datos de la mascota y los recordatorios desde el almacenamiento local del navegador, 
//  manejando errores y devolviendo un estado inicial válido. Esto asegura que la aplicación tenga datos consistentes al iniciar.
function usePetData() {
  const [initialState] = useState(loadData)
  const [data, setData] = useState(initialState.data)
  const dataRef = useRef(initialState.data)
  const [storageError, setStorageError] = useState(initialState.error)

  function updateData(update) {
    const nextData = typeof update === 'function' ? update(dataRef.current) : update
    dataRef.current = nextData
    setData(nextData)

    // Guarda cada cambio al instante para conservarlo al recargar la página.
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData))
      setStorageError('')
    } catch {
      setStorageError('No se pudieron guardar los cambios en este navegador. Libera espacio o revisa sus permisos.')
    }
  }

  return { data, updateData, storageError }
}

export default usePetData
