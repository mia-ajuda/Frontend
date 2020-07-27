import moment from 'moment';

const getYearsSince = (date) => {
    return moment().diff(date, 'years');
};

export default getYearsSince;
