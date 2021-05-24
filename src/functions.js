const filterArray = (array, substring, male, female) => {
    if(substring.length)
        array = array.filter(val => val.name.toLowerCase().indexOf(substring.toLowerCase()) !== -1);
    return array.filter(val => {
        if(male && female)
            return val.gender === 'female' && val.gender === 'male';
        if(male)
            return val.gender === 'male';
        if(female)
            return val.gender === 'female';
        return val;
    });
};

export default filterArray;
