import React, { useEffect, useState } from "react";
import { getGenre } from "../api";
import { Link } from "react-router-dom";

const SideBar = () => {
    const [data, setData] = useState([]);

    const categories = [
        { label: "Popular", value: "popular" },
        { label: "Top Rated", value: "top_rated" },
        { label: "Upcoming", value: "upcoming" },
    ];

    useEffect(() => {
        getGenre().then(data => {
            setData(data);
        });
    }, []);

    return (
        <div>
            <div className="w-[200px]">
                <div className="flex flex-col flex-1 fixed overflow-y-auto custom_scroll w-[200px] h-[100%] z-30">
                    <div className=" pt-32">
                        <ul>
                            {categories.map(({ label, value }) => {
                                return (
                                <li key={value} className="my-3 py-4">

                                        <Link to={`/`} state={{movies: value}}>
                                            <div>
                                                <img src="" alt="" />
                                                <p>{label}</p>
                                            </div>
                                        </Link>
                                    
                                </li>
                                )
                            })}
                        </ul>
                        <h3>---</h3>
                        <ul className="flexStart flex-col">
                            {!data.length ? (
                                <h3>wait</h3>
                            ) : (
                                data.map((item) => {
                                    return (
                                        <li key={item.id} className=" my-3 text-white">
                                            <Link to={`/`} state={{movies: item.id}}>
                                                <div>
                                                    <img src="" alt="" />
                                                    <p>{item.name}</p>
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
        </div>
    );
};

export default SideBar;
