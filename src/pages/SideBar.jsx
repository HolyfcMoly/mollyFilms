import React, { useEffect, useState } from "react";
import { CgMenuMotion } from "react-icons/cg";
import { getGenre } from "../api";
import { Link } from "react-router-dom";

const SideBar = () => {
    const [data, setData] = useState([]);
    const [toggle, setToggle] = useState(false);
    const categories = [
        { label: "Популярные", value: "popular" },
        { label: "Топ оценок", value: "top_rated" },
        { label: "Новинки", value: "upcoming" },
    ];

    useEffect(() => {
        getGenre().then((data) => {
            setData(data);
        });
    }, []);

    return (
        <div>
            <button className="fixed burger_menu top-[65px] md:hidden bg-secondary z-[100]" onClick={() => setToggle(!toggle)}>
            <CgMenuMotion />
            </button>
            <div className={`fixed overflow-auto bottom-0 top-20 ${toggle ? 'left-[unset]' : 'left-[-500px]'} md:left-[unset] custom_scroll w-[200px] bg-main z-30`}>
                <div className="flex flex-col py-2">
                    <ul>
                        {categories.map(({ label, value }) => {
                            return (
                                <li key={value} className="my-3 py-4">
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
                                        className="active:text-orange-500 my-3 text-white"
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
