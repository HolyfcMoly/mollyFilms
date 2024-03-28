import React from "react";
import { useNavigate } from "react-router-dom";

const Menu = ({containerClass, listClass}) => {
    const navigate = useNavigate();
    const newParams = new URLSearchParams()
    
    const handleHomeClick = () => {
        newParams.set('h','t')
        localStorage.setItem('type', 'movie');
        localStorage.removeItem('tabType')
        navigate(`/?${newParams.toString()}`)
    }

    const handleMoviesClick = () => {
        newParams.set('t', 'movie');
        localStorage.setItem('type', 'movie');
        localStorage.removeItem('tabType')
        navigate(`/?${newParams.toString()}`)
    }

    const handleSeriesClick = () => {
        newParams.set('t', 'tv');
        localStorage.setItem('type', 'tv');
        localStorage.removeItem('tabType')
        navigate(`/?${newParams.toString()}`)
    }

    return (
        <div className={`${containerClass}`}>
            <ul className={`flex gap-4 ${listClass}`}>
                <li onClick={handleHomeClick} className="cursor-pointer">Главная</li>
                <li onClick={handleMoviesClick} className="cursor-pointer">Фильмы</li>
                <li onClick={handleSeriesClick} className="cursor-pointer">Сериалы</li>
            </ul>
        </div>
    );
};

export default Menu;
