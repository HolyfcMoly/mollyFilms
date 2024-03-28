import React from "react";

const CrewItem = ({crew = [], job = ''}) => {
    if (!crew || !job) return;
    return (
            <li>
                <h2 className="sfhd:text-3xl xl:text-2xl text-secondary">{job}</h2>
                {crew.map((item, index) => {
                    return (
                        <h3 key={item.id} className="sfhd:text-2xl xl:text-xl text-dimWhite inline ">
                            {crew.length - 1 === index
                                ? item.name
                                : `${item.name}, `}
                        </h3>
                    );
                })}
            </li>
        )
};

export default CrewItem;
