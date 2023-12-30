import React from "react";

const IconAnimation = ({ className }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 48 48"
        xmlns="http://www.w3.org/2000/svg"
        stroke="currentColor"
        fill="currentColor"
        className={`${className}`}
    >
        <g fill="none">
            <path
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M5 13.06c0 2.48 1.292 4.461 3 5.94c-1.076 2.146-2 4.474-2 7c0 9.221 8.124 17 18 17s18-7.779 18-17c0-2.526-.924-4.854-2-7c1.708-1.479 3-3.521 3-6c0-4.452-3.68-8-8-8c-3.273 0-5.833 2.06-7 5a19.831 19.831 0 0 0-4-.394c-1.351 0-2.735.129-4 .394c-1.167-2.94-3.727-5-7-5c-4.32 0-8 3.609-8 8.06Z"
            />
            <circle cx="20" cy="19" r="2" fill="#000" />
            <circle cx="28" cy="19" r="2" fill="#000" />
            <circle cx="24" cy="26" r="3" fill="currentColor" />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M24 26v8"
            />
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="4"
                d="M28 33c-2.276 2.276-5.724 2.276-8 0"
            />
        </g>
    </svg>
);

export default IconAnimation;
