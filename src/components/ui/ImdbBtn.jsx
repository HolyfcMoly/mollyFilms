import React, { memo } from 'react'

const ImdbBtn = memo(({src, className}) =>  (
    <a href={src} rel="noreferrer" target="_blank" className={`inline-block border-[1px] border-secondary sfhd:rounded-xl rounded-md sfhd:px-6 sfhd:py-3 px-4 py-1 text-secondary sfhd:text-3xl xl:text-2xl ${className}`}>IMDB</a>
))
ImdbBtn.displayName = 'ImdbBtn';
export default ImdbBtn
