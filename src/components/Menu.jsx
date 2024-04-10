import React, { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Menu = memo(({containerClass, listClass}) => {
    const navigate = useNavigate();
    const newParams = useMemo(() => new URLSearchParams(),[]) 
    
    const handleHomeClick = useCallback(() => {
        newParams.set('h','t')
        newParams.set('t', 'movie');
        newParams.delete('t');
        localStorage.setItem('type', 'movie');
        localStorage.removeItem('tabType')
        navigate(`/?${newParams.toString()}`)
    },[navigate, newParams])

    const handleMoviesClick = useCallback(() => {
        newParams.set('t', 'movie');
        localStorage.setItem('type', 'movie');
        localStorage.removeItem('tabType')
        navigate(`/?${newParams.toString()}`)
    },[navigate, newParams])

    const handleSeriesClick = useCallback(() => {
        newParams.set('t', 'tv');
        localStorage.setItem('type', 'tv');
        localStorage.removeItem('tabType')
        navigate(`/?${newParams.toString()}`)
    },[navigate, newParams])

    return (
        <div className={`${containerClass}`}>
            <ul className={`flex gap-4 ${listClass}`}>
                <li onClick={handleHomeClick} className="cursor-pointer hover:text-secondary transition-colors duration-300 active:text-secondary/70">Главная</li>
                <li onClick={handleMoviesClick} className="cursor-pointer hover:text-secondary transition-colors duration-300 active:text-secondary/70">Фильмы</li>
                <li onClick={handleSeriesClick} className="cursor-pointer hover:text-secondary transition-colors duration-300 active:text-secondary/70">Сериалы</li>
            </ul>
        </div>
    );
});
Menu.displayName = 'Menu';
export default Menu;
