import React, { useEffect, useRef, useState } from "react";
import { getGenre, getTvGenre } from "../services/api";
import { Link } from "react-router-dom";
import GenrePreLoader from "../components/ui/GenresPreLoader";
import BurgerBtn from "../components/ui/BurgerBtn";
import { genreAndCategoriesIcons } from "../assets/icons/genres";
import useResize from "../hooks/useResize";
import { clickOutSide, filterDuplicates } from "../utils";

const SideBar = () => {
    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const width = useResize();
    const [seriesGenre, setSeriesGenre] = useState([]);

    const categories = [
        { label: "Популярные", value: "popular" },
        { label: "Топ оценок", value: "top_rated" },
        { label: "Новинки", value: "upcoming" },
    ];

    const menuRef = useRef(null);
    const skeletonData = new Array(19).fill("id");

    const handleGenreChange = () => {
        localStorage.setItem("isGenreChanged", true);
    };

    useEffect(() => {
        getGenre().then((data) => {
            data && setData(data);
            setLoading(false);
        });

        getTvGenre().then((data) => {
            data && setSeriesGenre(data);
            setLoading(false);
        });
    }, []);

    useEffect(() => {
        setIsMobile(false);
        if (width < 1060) {
            setIsMobile(true);
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
                <div className="flex flex-col py-2 relative">
                    <h3 className="sticky top-0 sfhd:text-4xl xl:text-2xl text-secondary z-[1] bg-main">
                        Категории
                    </h3>
                    <ul className="mb-4 relative">
                        {categories.map(({ label, value }) => {
                            return (
                                <li
                                    key={value}
                                    className="sfhd:py-6 xl:py-3 p-1 active:text-active hover:text-secondary transition-colors duration-300 focus-within:text-secondary"
                                    onClick={() => {
                                        setToggle(!toggle);
                                    }}
                                >
                                    <Link
                                        to={`/`}
                                        state={{
                                            movies: value,
                                            genre: label,
                                        }}
                                        onClick={() => handleGenreChange() }
                                        className="block focus:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded-[5px]"
                                    >
                                        <div className="flex items-center p-2 sfhd:genre-icons-xl ">
                                            {genreAndCategoriesIcons[value]}
                                            <p className="ml-4 sfhd:text-2xl xl:text-xl">
                                                {label}
                                            </p>
                                        </div>
                                    </Link>
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
                                        onClick={() => setToggle(!toggle)}
                                    >
                                        <Link
                                            to={`/`}
                                            state={{
                                                movies: item.id,
                                                genre: item.name,
                                            }}
                                            onClick={() => handleGenreChange() }
                                            className="block focus:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded-[5px]"
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
                                        </Link>
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
