import "../styles/pages/lost-item.css"
import lostItemIcon from '../assets/home.jpg'; // Asegúrate de tener esta imagen en tus recursos

// Componente LostItemsScreen
function LostItemsScreen() {
  // Asumiendo que tienes una lista de objetos perdidos, de otro modo puedes definirla aquí
  const lostItems = [
    // Añade aquí objetos de ejemplo o intégralos desde tu estado o props
    { id: 1, foundLocation: 'Biblioteca', description: 'Reloj de pulsera negro' },
    { id: 2, foundLocation: 'Cafetería', description: 'Cuaderno de matemáticas' },
    // ...otros objetos perdidos
  ];

  return (
    <div className="lost-items-container">
      <header className="lost-items-header">
        <h1>OBJETOS PERDIDOS</h1>
      </header>
      <div className="lost-items-grid">
        {lostItems.map(item => (
          <div className="lost-item-card" key={item.id}>
            <img src={lostItemIcon} alt="Ícono del Objeto Perdido" className="lost-item-icon" />
            <div className="lost-item-info">
              <div><strong>DÓNDE FUE ENCONTRADO:</strong> {item.foundLocation}</div>
              <div><strong>DESCRIPCIÓN:</strong> {item.description}</div>
              <div className="lost-item-status">
                <button className="status-button encontrado">ENCONTRADO</button>
                <button className="status-button perdido">PERDIDO</button>
                <button className="status-button reseñado">RESEÑADO</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Puedes agregar un footer si lo necesitas */}
    </div>
  );
}

export default LostItemsScreen;
