import { useLocation, useNavigate } from "react-router-dom";
import Search from "./Search";
import { logo, search } from "../assets";
import Menu from "./Menu";
import useResize from "../hooks/useResize";
import { useCallback, useEffect, useMemo, useState } from "react";
import { memo } from "react";

const Navbar = memo(() => {
    const navigate = useNavigate();
    const width = useResize();
    const [isMenu, setIsMenu] = useState(false);

    const handleClick = useCallback(() => {
        const newParams = new URLSearchParams({h: 't'})
        localStorage.setItem('type', 'movie');
        navigate(`/?${newParams.toString()}`)
    },[navigate])

    const memoWidth = useMemo(() => width,[width])

    useEffect(() => {
        setIsMenu(false)
        if(memoWidth > 769) {
            setIsMenu(true)
        }
    }, [memoWidth])

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
            <div className="flex-[0.7] xs:flex-[0.5]"></div>
        </div>
    </nav>
)});
Navbar.displayName = 'Navbar';
export default Navbar;
