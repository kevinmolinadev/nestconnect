import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../../../assets/home/home.jpg"
import { ErrorContext } from "../../../context/error";
import { useMutation } from "@tanstack/react-query";
import { AuthService } from "../../../../infraestructure";
import { UserContext } from "../../../context/user";
import { NeedVerfication } from "../../../components/need-verification";

const Login = () => {
    const [user, setUser] = useState({ email: "", password: "" });
    const navigate = useNavigate()
    const [needValidationEmail, setNeedValidationEmail] = useState(false);
    const { updateError } = useContext(ErrorContext);
    const { updateUser } = useContext(UserContext);
    const login = useMutation({ mutationFn: (user) => AuthService.logIn(user), onSuccess: (data) => handleUser(data), onError: (e) => updateError(e.message) })

    const handleUser = (data) => {
        const { user } = data
        if (!user.validated_email) {
            setNeedValidationEmail(true)
        } else {
            updateUser(user);
            navigate("/dashboard")
        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        login.mutate(user)
    }

    if (needValidationEmail) return <NeedVerfication email={user.email} />

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
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <input type="email" id="email" required onChange={(e) => {
                                setUser({ ...user, email: e.target.value })
                            }} placeholder="Correo Electrónico" className="w-full p-2 rounded-md border-2 border-neutro-secondary focus:border-neutro-tertiary outline-none" />
                        </div>
                        <div className="mb-2">
                            <input type="password" required onChange={(e) => {
                                setUser({ ...user, password: e.target.value })
                            }} placeholder="Contraseña" className="w-full p-2 rounded-md border-2 border-neutro-secondary focus:border-neutro-tertiary outline-none" />
                        </div>
                        <div className="text-right">
                            <Link to="/forgot-password" className=" text-[#522B46] cursor-pointer mb-4 block">
                                Olvidé mi contraseña
                            </Link>
                        </div>
                        <button className="bg-neutro-tertiary w-full p-3 rounded-md hover:bg-[#A7A9AC] transition duration-300 text-white" >INICIAR SESION</button>
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