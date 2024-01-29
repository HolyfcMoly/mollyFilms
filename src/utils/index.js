export const convertRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const mins = runtime % 60;
    if(!hours || !mins) return '';
    if (hours === 0) return `${mins}мин`;
    return `${hours}ч ${mins}мин`;
};

export const clickOutside = (ref, setOpen = Function.prototype, open) => {
    return (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            !open ? setOpen(false) : setOpen(!open);
        }
    };
};

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
};

export const filteredJob = (crew, department = "") => {
    const filteredDepartment = crew.filter(item => item.department === department);
    
    const uniqueCrew = [...new Set(filteredDepartment.map(item => item.id))].map(id => {
        return filteredDepartment.find(dep => dep.id === id)
    });
    return uniqueCrew.slice(0, 10);
};


export const getFullAge = (birthday) => {
    const date = new Date(); 
    const now = new Date(date.getFullYear(), date.getMonth(), date.getDate()); //today without time
    const birthDate = new Date(birthday); 
    const birthDay = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());// birthday 
    let fullAge = date.getFullYear() - birthDate.getFullYear(); // age

    //if the birthday is just ahead. then age - 1
    if(now < birthDay) {
        return --fullAge
    }

    return fullAge
}

export const getStringAge = (fullAge) => {
    if(fullAge % 10 === 1 && fullAge !== 11) {
        return `${fullAge} год` // для 1 года
    }
    if(fullAge % 10 >= 2 && fullAge % 10 <= 4 && (fullAge < 12 || fullAge > 14)) {
        return `${fullAge} года` // 2,3,4 года кроме 12,13 и 14
    }

    return `${fullAge} лет` // для всех остальных
}