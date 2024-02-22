// import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Header = () => (
    <header className={`w-full sfhd:h-[5.5rem] h-[3.5rem] flex items-center sticky top-0 left-0 sm:px-8 px-4 z-50 bg-[#16181b]`}>
        <Navbar />
    </header>
);

export default Header;
