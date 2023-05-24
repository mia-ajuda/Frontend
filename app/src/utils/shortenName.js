export default function shortenName(name) {
    return name.split(' ').slice(0, 2).join(' ');
}

export function untilTwoLastNames(name) {
    return name.split(' ').slice(0, 3).join(' ');
}

export function firstName(name) {
    return name.split(' ').slice(0, 1).join(' ');
}
