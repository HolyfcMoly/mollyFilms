
export const convertRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const mins = runtime % 60;
    if(hours === 0)  return `${mins}мин`;
    return `${hours}ч ${mins}мин`;
}

export const clickOutside = ( ref, setOpen = Function.prototype, open) => {
    return  (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            !open ? setOpen(false) : setOpen(!open);
        }
    };
}

export const toggleBodyClasses = (isOpen, isMobile, timeout = 300) => {
    if (isOpen) {
        document.body.classList.add("overflow-hidden");
        if (!isMobile) {
            document.body.classList.add("mr-[17px]");
        }
    } else {
        setTimeout(() => {
            document.body.classList.remove("overflow-hidden");
        }, timeout);
        if (!isMobile) {
            setTimeout(() => {
                document.body.classList.remove("mr-[17px]");
            }, timeout);
        }
    }
}