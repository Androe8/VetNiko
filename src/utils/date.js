export function getLocalDateValue(date = new Date()) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

// La función `formatDate` toma un valor de fecha en formato "YYYY-MM-DD" y lo convierte a un formato
//  legible en español (Colombia), utilizando la API de `Intl.DateTimeFormat`. 
// Esto permite mostrar las fechas de manera más amigable para los usuarios.

export function formatDate(dateValue) {
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
  }).format(new Date(`${dateValue}T12:00:00`))
}
