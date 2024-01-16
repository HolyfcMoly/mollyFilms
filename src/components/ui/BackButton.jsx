import React from "react";
import { useNavigate } from "react-router-dom";
import IconArrowForward from "../../assets/icons/IconArrowForward";

const BackButton = ({className}) => {
    const navigate = useNavigate();
    return (
        <button
            className={`block pr-4 pl-2 py-2 bg-transparent text-secondary group hover:bg-secondary hover:text-white rounded-xl ring-1 ring-secondary transition-colors xl:text-lg text-base ${className} `}
            onClick={() => navigate(-1)}
        >
            {<IconArrowForward className={`xl:w-6 xl:h-6 w-5 h-5 scale-[-1] fill-secondary transition-colors group-hover:fill-white`}/>}
            Back
        </button>
    );
};

export default BackButton;
