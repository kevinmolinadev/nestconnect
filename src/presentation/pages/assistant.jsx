const Assistant = () => {
    const data = JSON.parse(sessionStorage.getItem("chat")) //aqui en data obtienen la informacion del chat
    console.log(data)
    return (
      <div>
        <p>Aqui implementan el formulario para el nombre y numero de telefono</p>
      </div>
    )
  }
export default Assistant;