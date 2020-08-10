import isAllEqual from './isAllEqual';

const cnpjValidator = (rawCnpj) => {
    const findNonNumbers = /([^0-9])+/g;

    let cnpj = rawCnpj.replace(findNonNumbers, '');
    if (isAllEqual(cnpj) || cnpj.length != 14) return false;
    let digitPosition = 2;
    let multiplier = 5;
    while (digitPosition > 0) {
        let index = 0;
        let verifierDigit = 0;
        let repeatCycle = 0;
        while (repeatCycle < 2) {
            for (let i = multiplier; i > 1; i--, index++)
                verifierDigit += Number(cnpj[index]) * i;
            multiplier = 9;
            repeatCycle++;
        }

        verifierDigit = verifierDigit % 11;
        if (verifierDigit < 2) verifierDigit = 0;
        else verifierDigit = 11 - verifierDigit;
        if (verifierDigit != Number(cnpj[cnpj.length - digitPosition])) {
            return false;
        }
        multiplier = 6;
        digitPosition--;
    }
    return true;
};

export default cnpjValidator;
