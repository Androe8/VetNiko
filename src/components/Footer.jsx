import Icon from './Icon.jsx'
// El componente `Footer` es un componente funcional de React que renderiza el pie de página del sitio web.
function Footer() {
  return (
    <footer className="site-footer">
      <div className="page-container footer-inner">
        <a className="brand footer-brand" href="#inicio">
          <span className="brand-mark"><Icon name="paw" size={21} /></span>
          <span>Vet<span className="brand-accent">Niko</span></span>
        </a>
        <p>Un compañero para cuidar a quien siempre está contigo.</p>
        <a className="back-to-top" href="#inicio">Volver arriba ↑</a>
        <span className="footer-copy">© {new Date().getFullYear()} VetNiko</span>
      </div>
    </footer>
  )
}

export default Footer
