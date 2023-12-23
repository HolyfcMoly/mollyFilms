import { Link } from "react-router-dom";
import Search from "./Search";
import { logo } from "../assets";

const Navbar = () => (
    <nav className="flex ss:flex-1 items-center flex-wrap justify-between w-full">
        <div className="ss:flex-1">
            <Link to={"/"}>
                <img src={logo} alt="logo" className="w-[150px] h-[30px]" />
            </Link>
        </div>

        <div className="ss:flex-1 ss:mt-0 mt-[1rem] ss:order-none order-3 w-full">
            <Search />
        </div>

        <div className="ss:flex-[0.5] text-right">
            <a href="!#">Code Link</a>
        </div>
    </nav>
);

export default Navbar;
