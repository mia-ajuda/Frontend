const formatDate = (date, character = '/') => {
    const dateArray = date.split(character);
    const year = character == '-' ? dateArray[2].substring(0, 2) : dateArray[2];
    const month = dateArray[1];
    const day = dateArray[0];
    return `${year}-${month}-${day}`;
};

export default formatDate;
