import { Link } from "react-router-dom";
import LogoLight from "../assets/logo-light.png";


const Logo = () => {
    return (
        <Link to={"/"} >
            <img className="w-52 md:w-60 lg:w-64" src={LogoLight} alt="logo" />
        </Link>
    )
}
export default Logo;