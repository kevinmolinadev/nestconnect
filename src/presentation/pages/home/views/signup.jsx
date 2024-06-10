import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import Home from "../../../assets/home/home.jpg"
import { AuthService, CampusService } from "../../../../infraestructure";
import VerificationCode from "../../../components/verification-code";
import { ErrorContext } from "../../../context/error";

const SignUp = () => {
    const { updateError } = useContext(ErrorContext);
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userType, setUserType] = useState("");
    const [selectedCampusId, setSelectedCampusId] = useState("");
    const [campusData, setCampusData] = useState([]);
    const fectData = useQuery({ queryKey: ["campus"], queryFn: CampusService.getAll, staleTime: 10 * 60 * 1000 })
    const sendData = useMutation({ mutationFn: (data) => AuthService.signUp(data), onError: (e) => updateError(e.message) })

    useEffect(() => {
        if (fectData.isSuccess) setCampusData(fectData.data);
    }, [fectData.isSuccess])

    if (sendData.isSuccess) {
        return <VerificationCode type="validation" />;
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!userType) return updateError("El campo Tipo de usuario no puede estar vacio")
        const data = {
            name,
            last_name: lastName,
            email,
            password,
            type: userType,
            id_campus: selectedCampusId
        }
        sendData.mutate(data)
    };

    return (
        <div className="flex flex-col flex-grow ">
            <div className="flex flex-grow justify-center items-center relative overflow-hidden">
                <img className="absolute top-0 object-cover w-full" src={Home} alt="Home" />
                <div className="bg-white bg-opacity-75 p-8 relative z-10 rounded-lg shadow-2xl w-11/12 md:w-8/12 lg:w-2/6">
                    <h1 className="text-4xl font-bold text-[#522B46] mb-6 text-center">BIENVENIDO</h1>
                    <form onSubmit={handleRegister}>
                        <div className="mb-4">
                            <input
                                required
                                type="text"
                                placeholder="Nombre"
                                className="p-2 rounded-md w-full"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                required
                                type="text"
                                placeholder="Apellidos"
                                className="p-2 rounded-md w-full"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <input
                                required
                                type="email"
                                id="email"
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
                                <option value="moderator">Moderador</option>
                                <option value="administrator">Administrador</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <select
                                className="p-2 rounded-md w-full"
                                value={selectedCampusId}
                                onChange={(e) => setSelectedCampusId(e.target.value)}
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
                                required
                                type="password"
                                placeholder="Contraseña"
                                className="p-2 rounded-md w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="bg-[#522B46] text-white rounded-md p-2 w-full mt-4 hover:bg-[#A7A9AC] transition-colors duration-300">Regístrate</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default SignUp;