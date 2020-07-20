export default function phoneValidator(phone) {
    if (phone.length >= 14) {
        return true;
    } else {
        return false;
    }
}
