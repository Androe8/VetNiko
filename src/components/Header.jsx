import { useEffect, useState } from 'react'
import Icon from './Icon.jsx'

// Definimos la navegación para la página de inicio, que incluye enlaces a secciones específicas de la página.
const landingNavigation = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'El desafío', href: '#desafio' },
  { label: 'Soluciones', href: '#soluciones' },
  { label: 'Cómo funciona', href: '#como-funciona' },
]

// El componente `Header` es un componente funcional de React que renderiza el encabezado del sitio web.
function Header({ mode, hasPet, onOpenWorkspace, onOpenPetArea, onReturnHome }) {
  const [menuOpen, setMenuOpen] = useState(false) // Estado para controlar si el menú de navegación está abierto o cerrado.
  const isLanding = mode === 'landing' // Verifica si el modo actual es "landing" para determinar qué navegación mostrar.
  const isSetup = mode === 'setup' // Verifica si el modo actual es "setup" para determinar qué navegación mostrar.
  const navigation = isLanding // Si estamos en la página de inicio, usamos la navegación definida para el landing; si estamos en el modo de configuración, no mostramos enlaces; de lo contrario, mostramos enlaces a las secciones del espacio del usuario.
    ? landingNavigation
    : isSetup
      ? []
      : [
        { label: 'Mi espacio', href: '#workspace' },
        { label: 'Perfil', href: '#pet-card' },
        { label: 'Agenda', href: '#care-schedule' },
      ] // Definimos la navegación para el espacio del usuario, que incluye enlaces a secciones específicas del espacio del usuario.

  // Usamos un efecto para cerrar el menú de navegación cuando se presiona la tecla "Escape". Esto mejora la accesibilidad y la experiencia del usuario al permitirle cerrar el menú rápidamente con el teclado.    
  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  function closeMenu() {
    setMenuOpen(false)
  }

  // Renderizamos el encabezado del sitio web, que incluye la marca,
  //  el botón de menú y la navegación principal. La clase CSS `is-setup`
  //  se aplica al encabezado si estamos en el modo de configuración, lo que permite estilos específicos para ese modo.
  return (
    <header className={`site-header${isSetup ? ' is-setup' : ''}`}>
      <div className="header-inner page-container">
        <a
          className="brand"
          href={isLanding || isSetup ? '#inicio' : '#workspace'}
          aria-label={isLanding || isSetup ? 'VetNiko, inicio' : 'VetNiko, mi espacio'}
          onClick={closeMenu}
        >
          <span className="brand-mark"><Icon name="paw" size={24} /></span>
          <span>Vet<span className="brand-accent">Niko</span></span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen || isSetup}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <Icon name={menuOpen ? 'close' : 'menu'} />
        </button>
        {/* La navegación principal se renderiza como un elemento `<nav>` con enlaces a las secciones del sitio web. */}
        <nav
          className={`primary-navigation${menuOpen || isSetup ? ' is-open' : ''}`}
          id="primary-navigation"
          aria-label="Navegación principal"
        >
          {navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu}>{item.label}</a>
          ))}
          {isLanding ? (
            <>
              <button className="navigation-link" type="button" onClick={() => {
                closeMenu()
                onOpenPetArea('pet-card')
              }}>
                Mi perfil
              </button>
              <button className="navigation-link" type="button" onClick={() => {
                closeMenu()
                onOpenPetArea('care-schedule')
              }}>
                Agenda
              </button>
              <button className="button button-small header-cta" type="button" onClick={() => {
                closeMenu()
                onOpenWorkspace()
              }}>
                {hasPet ? 'Mi mascota' : 'Crear perfil'} <Icon name="arrow" size={17} />
              </button>
            </>
          ) : (
            <button className="button button-small header-cta" type="button" onClick={() => {
              closeMenu()
              onReturnHome()
            }}>
              {isSetup ? 'Cancelar registro' : 'Volver al inicio'}
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header