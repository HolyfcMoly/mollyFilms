import React from "react";
import { useNavigate } from "react-router-dom";

const BackButton = ({className}) => {
    const navigate = useNavigate();
    return (
        <button
            className={`px-4 py-2 bg-transparent text-secondary hover:bg-secondary hover:text-white rounded-xl ring-1 ring-secondary transition-colors ${className}`}
            onClick={() => navigate(-1)}
        >
            Back
        </button>
    );
};

export default BackButton;
