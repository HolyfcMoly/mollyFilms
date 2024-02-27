export const convertRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const mins = runtime % 60;
    if(!hours || !mins) return '';
    if (hours === 0) return `${mins}мин`;
    return `${hours}ч ${mins}мин`;
};

export const clickOutSide = (event, ref, fn = Function.prototype) => {
    if(event.target !== ref.current) {
        fn(event);
    }
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
};

//filter duplicates by id
export const filterDuplicates = (arr) => {
        if(!Array.isArray(arr)) {
            return [];
        }

        const newArr = [...new Set(arr.map(item => item.id))].map(id => {
            return arr.find(item => item.id === id)
        });
        return newArr
}

//filter jobs by department and delete duplicates
export const filteredJob = (crew = [], department = "", type='') => {
    if(!crew || null) return [];
    const filteredDepartment = crew.filter(item => item[type] === department );
    
    const uniqueCrew = [...new Set(filteredDepartment.map(item => item.id))].map(id => {
        return filteredDepartment.find(dep => dep.id === id)
    });
    return uniqueCrew;
};


export const getFullAge = (birthday) => {
    if(!birthday || null) return;
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

export const getStringDeclination = (number, word = '') => {
    if(!number || null) return '';
    if(word === 'сезон') {
        if(number % 10 === 1 && number !== 11) {
            return `${number} сезон` // для 1 
        }
        if(number % 10 >= 2 && number % 10 <= 4 && (number < 12 || number > 14)) {
            return `${number} сезона` // 2,3,4 кроме 12,13 и 14
        }
    
        return `${number} сезонов` // для всех остальных

    } else if(word === 'год') {
        if(number % 10 === 1 && number !== 11) {
            return `${number} год` 
        }
        if(number % 10 >= 2 && number % 10 <= 4 && (number < 12 || number > 14)) {
            return `${number} года` 
        }
    
        return `${number} лет`
        
    } else if(word === 'эпизод') {
        if(number % 10 === 1 && number !== 11) {
            return `${number} 'эпизод'` 
        }
        if(number % 10 >= 2 && number % 10 <= 4 && (number < 12 || number > 14)) {
            return `${number} эпизода` 
        }
    
        return `${number} эпизодов` 
    }
    
}

export const getPremierDate = (str) => {
    if(typeof str !== 'string') return;
    const monthNames = [
        "Января",
        "Февраля",
        "Марта",
        "Апреля",
        "Майя",
        "Июня",
        "Июля",
        "Августа",
        "Сентября",
        "Октября",
        "Ноября",
        "Декабря",
    ];
    const date = new Date(str);
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`  ;
}