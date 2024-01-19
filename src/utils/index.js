
export const convertRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const mins = runtime % 60;
    return `${hours}ч ${mins}мин`
}

export const clickOutside = ( ref, setOpen = Function.prototype, open) => {
    return  (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            !open ? setOpen(false) : setOpen(!open);
        }
    };
}