import { useCallback, useEffect, useState } from 'react'

const useTextToggle = (fullText = '', symbols = 550) => {
    const [displayText,setDisplayText] = useState('');

    const getPreviewText = useCallback((text = '') => {
        if(text.length <= symbols) return text;
        return text.slice(0, symbols) + '...'
    },[symbols])

    const toggleText = () => {
        if(displayText.length < fullText.length) {
            setDisplayText(fullText)
        } else {
            setDisplayText(getPreviewText(fullText))
        }
    }

    useEffect(() => {
        setDisplayText(getPreviewText(fullText))
    },[fullText, getPreviewText])
    return [displayText, toggleText]
}

export default useTextToggle
