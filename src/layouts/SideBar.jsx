import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getGenre, getTvGenre } from "../services/api";
import { useNavigate, useSearchParams } from "react-router-dom";
import GenrePreLoader from "../components/ui/GenresPreLoader";
import BurgerBtn from "../components/ui/BurgerBtn";
import { genreAndCategoriesIcons } from "../assets/icons/genres";
import useResize from "../hooks/useResize";
import { clickOutSide } from "../utils";
import Menu from "../components/Menu";

const SideBar = () => {
    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [isMenu, setIsMenu] = useState(false);
    const width = useResize();
    const [seriesGenre, setSeriesGenre] = useState([]);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const newParams = useMemo(() => new URLSearchParams(searchParams), [searchParams])
    const t = searchParams.get('t') || '';
    const storage = localStorage.getItem('type');

    const categories = [
        { label: "Популярные", value: "popular" },
        { label: "Топ оценок", value: "top_rated" },
        { label: "Новинки", value: t === 'movie' || storage === 'movie' ? "upcoming" : "on_the_air" },
    ];

    const cleanParams = useCallback(() => {
        newParams.set('s',false)
        newParams.set('q', '')
        newParams.delete('s',false)
        newParams.delete('q', '')
    },[newParams])

    const menuRef = useRef(null);
    const skeletonData = new Array(19).fill("id");

    const handleGenreChange = useCallback((movies, genre) => {
        cleanParams();
        newParams.set('g', genre);
        newParams.set('id', String(movies))
        newParams.set('p', 1)
        localStorage.setItem('tabType', 'Все')
        navigate(`/?${newParams.toString()}`, {replace: true})
    },[cleanParams, navigate, newParams]);

    useEffect(() => {
        
        if(t && t === 'tv' || storage && storage === 'tv') {
            getTvGenre().then((data) => {
                data && setData(data);
                setLoading(false);
            });
        } else {
            getGenre().then((data) => {
            data && setData(data);
            setLoading(false);
        });
        }
    }, [t, storage]);
    

    useEffect(() => {
        setIsMobile(false);
        setIsMenu(false);
        if (width < 1060) {
            setIsMobile(true);
            if(width < 768.99) setIsMenu(true);
            const toggleSideBar = () => {
                !toggle ? setToggle(false) : setToggle(!toggle);
            };
            document.addEventListener("click", (e) => {
                clickOutSide(e, menuRef, toggleSideBar);
            });
            return () => document.removeEventListener("click", clickOutSide);
        }
    }, [width, toggle]);

    return (
        <div>
            {isMobile && <BurgerBtn setToggle={setToggle} toggle={toggle} />}
            <div
                className={`fixed overflow-auto bottom-0 sfhd:top-[5.5rem] top-[3.5rem] ${
                    toggle ? "sm:left-[2rem] left-[1rem]" : "left-[-500px]"
                } md:left-[unset] transition-[left] ease-in-out duration-500 custom_scroll sfhd:text-3xl sfhd:w-[350px] w-[200px] xl:w-[250px] bg-main z-30`}
                ref={menuRef}
            >
                {isMenu && <Menu containerClass={`mb-5 sticky top-0`} listClass={`flex-col`}/>}
                <div className="flex flex-col py-2 relative bg-main">
                    <h3 className="sticky top-0 sfhd:text-4xl xl:text-2xl text-secondary z-[1] bg-main">
                        Категории
                    </h3>
                    <ul className="mb-4 relative">
                        {categories.map(({ label, value }) => {
                            return (
                                <li
                                    key={value}
                                    className="sfhd:py-6 xl:py-3 p-1 active:text-active hover:text-secondary transition-colors duration-300 focus-within:text-secondary cursor-pointer"
                                    onClick={() => {
                                        handleGenreChange(value, label);
                                        setToggle(!toggle);
                                    }}
                                >
                                    <div
                                        className="block focus:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded-[5px]"
                                    >
                                        <div className="flex items-center p-2 sfhd:genre-icons-xl ">
                                            {genreAndCategoriesIcons[value]}
                                            <p className="ml-4 sfhd:text-2xl xl:text-xl">
                                                {label}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                    <h3 className="sticky top-0 sfhd:text-4xl xl:text-2xl text-secondary z-[1] bg-main">
                        Жанры
                    </h3>
                    <ul>
                        {loading && !data.length
                            ? skeletonData.map((item, index) => {
                                return (
                                    <li key={item + index}>
                                        <GenrePreLoader />
                                    </li>
                                );
                            })
                            : data.map((item) => {
                                return (
                                    <li
                                        key={item.id}
                                        className="active:text-active sfhd:py-6 xl:py-3 p-1 hover:text-secondary transition-colors duration-300 text-white focus-within:text-secondary"
                                        onClick={() => {
                                            handleGenreChange(item.id, item.name);
                                            setToggle(!toggle);
                                        }}
                                    >
                                        <div
                                            className="block focus:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded-[5px] cursor-pointer"
                                        >
                                            <div className="flex items-center p-2 sfhd:genre-icons-xl genre-icons">
                                                {
                                                    genreAndCategoriesIcons[
                                                        item.id
                                                    ]
                                                }
                                                <p className="ml-4 sfhd:text-2xl xl:text-xl">
                                                    {item.name.replace(
                                                        item.name[0],
                                                        item.name[0].toUpperCase()
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SideBar;
