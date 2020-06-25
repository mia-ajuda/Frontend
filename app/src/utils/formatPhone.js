function formatPhone(phone) {
    if (phone.length === 13) {
        return `(${phone.slice(3, 5)}) ${phone.slice(5, 9)}-${phone.slice(
            9,
            14,
        )}`;
    }

    return `(${phone.slice(3, 5)}) ${phone.slice(5, 10)}-${phone.slice(
        10,
        14,
    )}`;
}
export default formatPhone;
