import React from "react";

const CrewItem = ({crew = [], job = ''}) => {
    if (!crew || !job) return;
    return (
            <li>
                <h2 className="text-secondary">{job}</h2>
                {crew.map((item, index) => {
                    return (
                        <h3 key={item.id} className="text-dimWhite inline ">
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
