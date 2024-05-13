import { useState } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../../assets/home/home.jpg"

const Login = () => {

    const [user, setUser] = useState({ email: "", password: "" });

    const handleLogin = async () => {
        const response = await fetch("http://localhost:3000/api/v1/auth/login", {
            credentials: "include",
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })

        if (response.ok) {
            console.log("Login exitoso")
        }
    }

    return (
        <div className="flex-grow flex">
            <header className="bg-neutro-tertiary p-7 text-center text-white fixed top-0 w-full z-10">
            </header>
            <div className="w-[55%]" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            </div>
            <div className="flex-grow flex flex-col items-center justify-center bg-white p-8 text-black">
                <div className="w-3/5">
                    <h2 className="text-3xl mb-4">BIENVENIDO</h2>
                    <p className="mb-8">ES UN GUSTO VOLVER A VERTE</p>
                    <form>
                        <div className="mb-4">
                            <input type="text" onChange={(e) => {
                                setUser({ ...user, email: e.target.value })
                            }} placeholder="Correo Electrónico" className="w-full p-2 rounded-md border-2 border-neutro-secondary focus:border-neutro-tertiary outline-none" />
                        </div>
                        <div className="mb-2">
                            <input type="password" onChange={(e) => {
                                setUser({ ...user, password: e.target.value })
                            }} placeholder="Contraseña" className="w-full p-2 rounded-md border-2 border-neutro-secondary focus:border-neutro-tertiary outline-none" />
                        </div>
                        <div className="text-right">
                            <Link to="/forgot-password" className=" text-[#522B46] cursor-pointer mb-4 block">
                                Olvidé mi contraseña
                            </Link>
                        </div>
                        <button type="button" onClick={handleLogin} className="bg-neutro-tertiary w-full p-3 rounded-md hover:bg-[#A7A9AC] transition duration-300 text-white" >INICIAR SESION</button>
                        <div className="flex gap-1 mt-4">
                            <p>Aun no tienes una cuenta?</p>
                            <Link to="/signup" className="text-neutro-tertiary">Registrate</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Login;