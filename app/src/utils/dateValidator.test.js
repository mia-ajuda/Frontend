
function dateValidator(date) {
    // 17/02/1999
    let currentYear = 2022;
    currentYear = parseInt(currentYear);

    const [day, month, year] = date.split('/').map((date) => parseInt(date)); // [17, 02, 1999]

    if (day < 1 || day > 31 || !day) return false;
    if (month < 1 || month > 12 || !month) return false;

    if (year < 1800 || year > currentYear || !year) {
        if (month == 2) {
            if (year % 4 == 0) {
                if (day < 1 || day > 29) {
                    return false;
                }
            }
        }
        return false;
    }

    return true;
}

test("Teste validação de data", () => {

    expect(dateValidator("99/01/2001")).toBe(true);

});