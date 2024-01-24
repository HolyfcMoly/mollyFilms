import React from "react";
import { Link } from "react-router-dom";
import { avatar } from "../assets";

const CastCard = ({cast, className = ''}) => {
    return (
        <div className={`sfhd:w-[140px] sfhd:max-w-[120px] max-w-[90px] w-full h-full ${className}`}>
            <Link to={`/profile/${cast.id}`} className="">
                <div>
                    <div className="sfhd:h-[180px] h-[135px]">
                        <img
                            src={`${
                                !cast.profile_path
                                    ? `${avatar}`
                                    : `https://image.tmdb.org/t/p/original${cast.profile_path}`
                            }`}
                            alt={`${cast.original_name}`}
                            loading="lazy"
                            className="object-cover w-full h-full rounded-2xl bg-dark/25"
                        />
                    </div>
                    <p className="mt-3 sfhd:text-2xl xl:text-xl md:text-sm text-xs">
                        {cast.original_name}
                    </p>
                    <p className="text-dimWhite xl:text-base text-xs">
                        {cast.character}
                    </p>
                </div>
            </Link>
        </div>
    );
};

export default CastCard;
