import Home from "../assets/home.jpg";
import ForgotPassword from './ForgotPassword';
import CodeVerifier from './CodeVerifier';
import { useState, useEffect } from "react";
 
 
function RegistrarScreen() {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('');
    const [campus, setCampus] = useState('');

    const [showCodeVerifier, setShowCodeVerifier] = useState(false);

  const handleShowCodeVerifier = () => {
    setShowCodeVerifier(true);
  };
  if (showCodeVerifier ) {
    console.log("llegamos aqui")
    return <CodeVerifier />;
  }

 
 

 
    const handleRegister = async (e) => {
        e.preventDefault();
 
        const userData = {
            name,
            last_name: lastName,
            email,
            password,
            type: userType,
            id_campus: selectedCampusId
        };
 
        try {
            const response = await fetch('http://localhost:3000/api/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });
 
            const data = await response.json();
 
            if (response.ok) {
                setShowCodeVerifier(true);
                console.log('Registro exitoso', data);
            } else {
                console.error('Error en el registro', data);
            }
        } catch (error) {
            console.error('Error al conectar con la API', error);
        }
    };
        const [campusData, setCampusData] = useState([]);
        const [selectedCampusId, setSelectedCampusId] = useState("");
        const [error, setError] = useState(null);
 
 
    useEffect(() => {
        fetch("http://localhost:3000/api/v1/campus")
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
          })
          .then((data) => {setCampusData(data);
          })
          .catch((error) => {
            console.error("Error fetching campus data:", error);
            setError(error.toString());
          });
      }, []);
     
      const handleCampusChange = (e) => {
        setSelectedCampusId(e.target.value);
      };
      if (showCodeVerifier) {
        return <CodeVerifier />;
    }

    return (
        <div className="flex flex-col h-screen">
            <div className="flex flex-grow justify-center items-center">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${Home})` }}>
                    <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-2xl"
                         style={{
                             maxWidth: '500px',
                             margin: 'auto',
                             marginTop: '20vh'
                         }}>
                        <h1 className="text-4xl font-bold text-[#522B46] mb-6 text-center">BIENVENIDO A A.V.U</h1>
                        <form onSubmit={handleRegister}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    className="p-2 rounded-md w-full"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Apellidos"
                                    className="p-2 rounded-md w-full"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    placeholder="Correo Electrónico"
                                    className="p-2 rounded-md w-full"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <select
                                    className="p-2 rounded-md w-full"
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                >
                                    <option value="">Selecciona tipo de usuario</option>
                                    <option value="student">Estudiante</option>
                                    <option value="administraitor">Profesor</option>
                                </select>
                            </div>
                            <div className="card">
        {error && <p>Error: {error}</p>}
        <select
          value={selectedCampusId}
          onChange={handleCampusChange}
          className="p-2 rounded-md w-full"
        >
          <option value="">Selecciona campus</option>
          {campusData.map((campus) => (
            <option key={campus.id} value={campus.id}>
              {campus.name}
            </option>
          ))}
        </select>
      </div>
                            <div className="mb-4">
                                <input
                                    type="password"
                                    placeholder="Contraseña"
                                    className="p-2 rounded-md w-full"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button type="submit" /*onClick={handleShowCodeVerifier}*/ className="bg-[#522B46] text-white rounded-md p-2 w-full mt-4 hover:bg-[#A7A9AC] transition-colors duration-300">Regístrate</button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default RegistrarScreen;