import { Link } from "react-router-dom";
import Search from "./Search";
import { logo } from "../assets";

const Navbar = () => (
    <nav className="flex ss:flex-1 relative items-center ss:justify-between justify-start w-full">
        <div className="flex flex-1">
            <Link to={"/"} state={{homePage: 1}}>
                <img src={logo} alt="logo" className="sfhd:w-[250px] sfhd:h-[60px] w-[150px] h-[30px]" />
            </Link>
        </div>

        <div className="flex-1 flex w-full">
            <Search className={`flex-1 flex justify-end relative`}/>
            <div className="flex-[0.5]"></div>
        </div>
    </nav>
);

export default Navbar;
