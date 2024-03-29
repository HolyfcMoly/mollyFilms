import React from "react";

const BurgerBtn = ({ setToggle, toggle }) => (
        <button
            className="fixed md:hidden top-[0.75rem] right-[1rem] w-[1.9rem] h-[1.9rem]  z-[100]"
            onClick={(e) => {
                e.stopPropagation();
                setToggle(!toggle);
            }}
        >
            <div className="burger flex flex-col justify-between items-end h-full w-[1.5rem]">
                <div
                    className={`w-full h-[2px] my-1 bg-secondary ${
                        toggle ? "menu_close" : "menu_open"
                    }`}
                ></div>
                <div
                    className={`w-2/3 h-[2px] my-1 bg-secondary ${
                        toggle ? "menu_close" : "menu_open"
                    }`}
                ></div>
                <div
                    className={`w-full h-[2px] my-1 bg-secondary ${
                        toggle ? "menu_close" : "menu_open"
                    }`}
                ></div>
            </div>
        </button>
    );

export default BurgerBtn;
