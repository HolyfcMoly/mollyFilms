import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate()

    const handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            navigate( "/", {state: {query: query}} );
            setQuery('');
        }
    }
    
    return (
        <div>
            <input
                onKeyDown={(e) => handleKeyPress(e)}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full focus:outline-none rounded-[5px] ring-secondary focus-visible:ring-1 px-2 py-[2px] caret-secondary text-white"
            />
        </div>
    );
};

export default Search;
