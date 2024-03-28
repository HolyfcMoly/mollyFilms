import { useNavigate } from "react-router-dom";
import Search from "./Search";
import { logo } from "../assets";
import Menu from "./Menu";
import useResize from "../hooks/useResize";
import { useEffect, useState } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const width = useResize();
    const [isMenu, setIsMenu] = useState(false);

    const handleClick = () => {
        const newParams = new URLSearchParams({h: 't'})
        localStorage.setItem('type', 'movie');
        navigate(`/?${newParams.toString()}`)
    }

    useEffect(() => {
        setIsMenu(false)
        if(width > 769) {
            setIsMenu(true)
        }
    }, [width])
    
    return (
    <nav className="flex ss:flex-1 gap-4 relative items-center ss:justify-between justify-start w-full">
        <div className="flex flex-2 items-center">
            <div onClick={handleClick} className="cursor-pointer">
                <img src={logo} alt="logo" className="sfhd:w-[250px] sfhd:h-[60px] w-[150px] h-[30px]" />
            </div>
            {isMenu && <Menu containerClass={`ml-5`}/>}
            
        </div>

        <div className="flex-1.5 flex w-full">
            <Search className={`flex-1 flex justify-end relative`}/>
            <div className="flex-[0.3]"></div>
        </div>
    </nav>
)};

export default Navbar;
