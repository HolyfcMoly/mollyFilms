import React, { useEffect, useRef, useState } from "react";
import { getGenre } from "../services/api";
import { Link } from "react-router-dom";

const SideBar = () => {
    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(false);
    const categories = [
        { label: "Популярные", value: "popular" },
        { label: "Топ оценок", value: "top_rated" },
        { label: "Новинки", value: "upcoming" },
    ];

    const menuRef = useRef(null);

    useEffect(() => {
        getGenre().then((data) => {
            setData(data);
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
            <button
                className="fixed md:hidden ss:top-[65px] top-[101px] w-[1.9rem] h-[1.9rem]  z-[100]"
                onClick={(e) => {
                    e.stopPropagation()
                    setToggle(!toggle)
                }}
            >
                <div className="burger flex flex-col justify-between items-start h-full w-[1.5rem]">
                    <div className={`w-full h-[2px] my-1 bg-secondary ${toggle ? 'menu_close' : 'menu_open'}`}></div>
                    <div className={`w-2/3 h-[2px] my-1 bg-secondary ${toggle ? 'menu_close' : 'menu_open'}`}></div>
                    <div className={`w-full h-[2px] my-1 bg-secondary ${toggle ? 'menu_close' : 'menu_open'}`}></div>
                </div>
            </button>
            <div
                className={`fixed overflow-auto bottom-0 ss:top-[6.3rem] md:top-[5.8rem] top-[8.8rem] ${
                    toggle ? "sm:left-[2rem] left-[1rem]" : "left-[-500px]"
                } md:left-[unset] transition-[left] ease-in-out duration-500 custom_scroll w-[200px] bg-main z-30`}
                ref={menuRef}
            >
                <div className="flex flex-col py-2">
                    <ul>
                        {categories.map(({ label, value }) => {
                            return (
                                <li key={value} className="my-3 py-4 active:text-active hover:text-secondary transition-colors duration-300" onClick={() => setToggle(!toggle)}>
                                    <Link
                                        to={`/`}
                                        state={{
                                            movies: value,
                                            genre: label,
                                        }}
                                    >
                                        <div>
                                            <img src="" alt="" />
                                            <p>{label}</p>
                                        </div>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <h3>---</h3>
                    <ul className="flexStart flex-col">
                        {!data.length ? (
                            <h3>wait</h3>
                        ) : (
                            data.map((item) => {
                                return (
                                    <li
                                        key={item.id}
                                        className="active:text-active my-3 hover:text-secondary transition-colors duration-300 text-white"
                                        onClick={() => setToggle(!toggle)}
                                    >
                                        <Link
                                            to={`/`}
                                            state={{
                                                movies: item.id,
                                                genre: item.name,
                                            }}
                                        >
                                            <div>
                                                <img src="" alt="" />
                                                <p className="">
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
