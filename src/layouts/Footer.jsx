import React from "react";
import { logo } from "../assets";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        const newParams = new URLSearchParams({h: 't'})
        localStorage.setItem('type', 'movie');
        navigate(`/?${newParams.toString()}`)
    }

    return (
        <div className="flex items-center justify-between mt-10 py-3 relative before:absolute before:top-0 before:left-0 before:w-full before:bg-dark before:h-[1px]">
            <div onClick={handleClick} className="cursor-pointer">
                <img src={logo} alt="logo" className="sfhd:w-[250px] sfhd:h-[60px] w-[150px] h-[30px]" />
            </div>
            <a href="https://github.com/HolyfcMoly/mollyFilms" rel="noreferrer" target="_blank">CodeLink</a>
        </div>
    );
};

export default Footer;
