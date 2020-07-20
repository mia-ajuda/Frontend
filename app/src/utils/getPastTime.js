export default function getPastDate(date) {
    let dateFormated = new Date(date);
    let dateNow = new Date();
    let interval = dateNow.getTime() - dateFormated.getTime();
    interval = new Date(interval);
    // Qualquer data registrada é contada a partir de 1970,
    //então para pegar a quantidade certa de anos que passaram substraísse 1970.
    let yearsPassed = interval.getUTCFullYear() - 1970;
    let monthsPassed = interval.getUTCMonth();
    // Dia começa em 1, então para pegar a quantidade certa de dias substraísse 1.
    let daysPassed = interval.getUTCDate() - 1;
    let hoursPassed = interval.getUTCHours();
    let minutesPassed = interval.getUTCMinutes();

    if (yearsPassed < 0) {
        return 'Agora';
    } else if (yearsPassed > 0) {
        return `${yearsPassed} ano(s) atrás`;
    } else if (monthsPassed > 0) {
        return `${monthsPassed} mês(es) atrás`;
    } else if (daysPassed > 0) {
        return `${daysPassed} dia(s) atrás`;
    } else if (hoursPassed > 0) {
        return `${hoursPassed} hora(s) atrás`;
    } else if (minutesPassed > 0) {
        return `${minutesPassed} minuto atrás`;
    } else {
        return 'Agora';
    }
}
