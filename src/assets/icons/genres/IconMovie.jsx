import React from "react";

const IconMovie = ({className}) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        className={`${className}`}
    >
        <g fill="none" stroke="currentColor" strokeWidth="4">
            <path
                strokeLinejoin="round"
                d="M24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20Z"
            />
            <path
                strokeLinejoin="round"
                d="M24 18a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm0 18a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm-9-9a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm18 0a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"
            />
            <path strokeLinecap="round" d="M24 44h20" />
        </g>
    </svg>
);

export default IconMovie;
