import moment from 'moment';

const getYearsSince = (date) => {
    console.log(date);
    return moment().diff(date, 'years');
};

export default getYearsSince;
