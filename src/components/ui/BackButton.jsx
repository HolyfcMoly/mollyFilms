import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import IconArrowForward from "../../assets/icons/IconArrowForward";

const BackButton = memo(({className, actions}) => {
    const navigate = useNavigate();
    const handleClick = () => {
        window.scrollTo(0,0)
        navigate(-1);
        actions?.forEach(action => action)
    }
    
    return (
        <button
            className={`block pr-4 pl-2 py-2 bg-transparent text-secondary group hover:bg-secondary hover:text-white rounded-xl ring-1 ring-secondary transition-colors sfhd:text-2xl xl:text-lg text-base ${className} `}
            onClick={handleClick}
        >
            {<IconArrowForward className={`sfhd:w-8 sfhd:h-8 xl:w-6 xl:h-6 w-5 h-5 scale-[-1] fill-secondary transition-colors group-hover:fill-white`}/>}
            Назад
        </button>
    );
});
BackButton.displayName = 'BackButton';
export default BackButton;
