import moment from 'moment';

export default function calculateAge(birthday) {
    const age = moment().diff(moment(birthday), 'years');
    return age;
}
