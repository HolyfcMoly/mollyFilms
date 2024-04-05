import React, {  memo, useState } from "react";
import useTextToggle from "../hooks/useTextToggle";

const ToggleOverview = memo(({
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
                    <p className={`sfhd:text-3xl xl:text-2xl ${textClass}`}>{text}</p>
                    {text.length > textSymbols && (
                        <button
                            onClick={() => {
                                setExpand(!expand);
                                toggleText();
                            }}
                            className="text-dimWhite sfhd:text-3xl xl:text-2xl"
                        >
                            {!expand ? "Показать полностью" : "Скрыть"}
                        </button>
                    )}
                </>
            )}
            {children}
        </div>
    );
});
ToggleOverview.displayName = 'ToggleOverview';
export default ToggleOverview;
