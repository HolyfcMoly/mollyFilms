import React, { useEffect, useRef, useState } from "react";
import { getGenre } from "../services/api";
import { Link } from "react-router-dom";
import GenrePreLoader from "../components/ui/GenresPreLoader";
import BurgerBtn from "../components/ui/BurgerBtn";
import { genreAndCategoriesIcons } from "../assets/icons/genres";
// import {genresAndCategories} from "../components/ui/genresIcons";

const SideBar = () => {
    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(false);
    const [loading, setLoading] = useState(true)
    const categories = [
        { label: "Популярные", value: "popular" },
        { label: "Топ оценок", value: "top_rated" },
        { label: "Новинки", value: "upcoming" },
    ];

    const menuRef = useRef(null);
    const skeletonData = new Array(19).fill('id');
    
    useEffect(() => {
        getGenre().then((data) => {
            data && setData(data);
            setLoading(false)
        });

        const handler = (e) => {
            if(!menuRef.current.contains(e.target)) {
                setToggle(false);
            }
        }
        document.addEventListener('click', handler);
    }, []);

    return (
        <div>
            <BurgerBtn setToggle={setToggle} toggle={toggle}/>
            <div
                className={`fixed overflow-auto bottom-0 ss:top-[6.3rem] md:top-[5.8rem] top-[8.8rem] ${
                    toggle ? "sm:left-[2rem] left-[1rem]" : "left-[-500px]"
                } md:left-[unset] transition-[left] ease-in-out duration-500 custom_scroll w-[200px] bg-main z-30`}
                ref={menuRef}
            >
                <div className="flex flex-col py-2 relative">
                    <h3 className="sticky top-0 text-secondary z-[1] bg-main">Категории</h3>
                    <ul className="mb-4 relative">
                        {categories.map(({ label, value }) => {
                            return (
                                <li key={value} className="p-1 active:text-active hover:text-secondary transition-colors duration-300 focus-within:text-secondary" onClick={() => setToggle(!toggle)}>
                                    <Link
                                        to={`/`}
                                        state={{
                                            movies: value,
                                            genre: label,
                                        }}
                                        className="block focus:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded-[5px]"
                                    >
                                        <div className="flex items-center p-2 ">
                                            {/* <img src={`${genreAndCategoriesIcons[value]}`} alt="" className="genre-icons invert"/> */}
                                            {genreAndCategoriesIcons[value]}
                                            <p className="ml-4">{label}</p>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <h3 className="sticky top-0 text-secondary z-[1] bg-main">Жанры</h3>
                    <ul>
                        {loading && !data.length ? (
                            skeletonData.map((item, index)=> {
                                return (
                                    <li key={item + index}>
                                        <GenrePreLoader />
                                    </li>
                                )
                            })
                        ) : (
                            data.map((item) => {
                                return (
                                    <li
                                        key={item.id}
                                        className="active:text-active p-1 hover:text-secondary transition-colors duration-300 text-white focus-within:text-secondary"
                                        onClick={() => setToggle(!toggle)}
                                    >
                                        <Link
                                            to={`/`}
                                            state={{
                                                movies: item.id,
                                                genre: item.name,
                                            }}
                                            className="block focus:outline-none focus-visible:ring-1 focus-visible:ring-secondary rounded-[5px]"
                                        >
                                            <div className="flex items-center p-2 genre-icons">
                                            {/* {!genresAndCategories[item.id] ? <GenrePreLoader /> : genresAndCategories[item.id]} */}

                                                {genreAndCategoriesIcons[item.id]}
                                                {/* {genresAndCategories[item.id]} */}
                                                {/* <img src={`${genreAndCategoriesIcons[item.id]}`} alt="" /> */}
                                                <p className="ml-4">
                                                    {item.name.replace(
                                                        item.name[0],
                                                        item.name[0].toUpperCase()
                                                    )}
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SideBar;