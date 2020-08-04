function parseDate(date) {
    const newDate = new Date(date);
    return `${('0' + (newDate.getDate() + 1)).slice(-2)}/${(
        '0' +
        (newDate.getMonth() + 1)
    ).slice(-2)}/${newDate.getFullYear()}`;
}

export default parseDate;
