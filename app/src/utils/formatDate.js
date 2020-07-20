const formatDate = (date) => {
    const dateArray = date.split('/');
    const year = dateArray[2];
    const month = dateArray[1];
    const day = dateArray[0];
    return `${year}-${month}-${day}`;
};

export default formatDate;
