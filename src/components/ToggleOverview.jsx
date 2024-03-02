import React, {  useState } from "react";
import useTextToggle from "../hooks/useTextToggle";

const ToggleOverview = ({
    fullText = '',
    textSymbols = 200,
    children,
    className,
    textClass
}) => {
    const [expand,setExpand] = useState(false);
    const [text, toggleText] = useTextToggle(fullText, textSymbols) ;

    return (
        <div className={`${className}`}>
            {text && (
                <>
                    <p className={`xl:text-3xl ${textClass}`}>{text}</p>
                    {text.length > textSymbols && (
                        <button
                            onClick={() => {
                                setExpand(!expand);
                                toggleText();
                            }}
                            className="text-dimWhite xl:text-2xl"
                        >
                            {!expand ? "Показать полностью" : "Скрыть"}
                        </button>
                    )}
                </>
            )}
            {children}
        </div>
    );
};

export default ToggleOverview;
