import { useEffect, useState } from 'react'

const useTextToggle = (fullText = '') => {
    const [displayText,setDisplayText] = useState('');

    const getPreviewText = (text = '') => {
        if(text.length <= 550) return text;
        return text.slice(0, 550) + '...'
    }

    const toggleText = () => {
        if(displayText.length < fullText.length) {
            setDisplayText(fullText)
        } else {
            setDisplayText(getPreviewText(fullText))
        }
    }

    useEffect(() => {
        setDisplayText(getPreviewText(fullText))
    },[fullText])
    return [displayText, toggleText]
}

export default useTextToggle
