import React from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <div className="flex items-center justify-between mt-10 py-3 relative before:absolute before:top-0 before:left-0 before:w-full before:bg-dark before:h-[1px]">
            <Link to={"/"}>
                <img
                    src={logo}
                    alt="logo"
                    className="sfhd:w-[250px] sfhd:h-[60px] w-[150px] h-[30px]"
                />
            </Link>
            <a href="!#">CodeLink</a>
        </div>
    );
};

export default Footer;
