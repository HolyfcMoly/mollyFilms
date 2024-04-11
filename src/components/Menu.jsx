import React, { memo, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const Menu = memo(({ containerClass, listClass }) => {
    const navigate = useNavigate();
    const newParams = useMemo(() => new URLSearchParams(), []);

    const handleHomeClick = useCallback(() => {
        newParams.set("h", "t");
        newParams.set("t", "movie");
        newParams.delete("t");
        localStorage.setItem("type", "movie");
        localStorage.removeItem("tabType");
        navigate(`/?${newParams.toString()}`);
    }, [navigate, newParams]);

    const handleMoviesClick = useCallback(() => {
        newParams.set("t", "movie");
        localStorage.setItem("type", "movie");
        localStorage.removeItem("tabType");
        navigate(`/?${newParams.toString()}`);
    }, [navigate, newParams]);

    const handleSeriesClick = useCallback(() => {
        newParams.set("t", "tv");
        localStorage.setItem("type", "tv");
        localStorage.removeItem("tabType");
        navigate(`/?${newParams.toString()}`);
    }, [navigate, newParams]);

    const handleClick = (e) => {
        if (e === "Главная") {
            handleHomeClick();
        } else if (e === "Фильмы") {
            handleMoviesClick();
        } else {
            handleSeriesClick();
        }
    };

    const navigation = ["Главная", "Фильмы", "Сериалы"];

    return (
        <div className={`${containerClass}`}>
            <ul className={`flex gap-4 ${listClass}`}>
                {navigation.map((item) => {
                    return (
                        <li
                            key={item}
                            onClick={(e) => handleClick(e.target.innerHTML)}
                            className="cursor-pointer hover:text-secondary transition-colors duration-300 active:text-secondary/70"
                        >
                            {item}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
});
Menu.displayName = "Menu";
export default Menu;
