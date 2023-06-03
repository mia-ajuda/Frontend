const colors = require('./colors');

module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: colors,
            spacing: {
                38: '9.5rem',
            },
            fontSize: {
                xss: '10px',
            },
        },
        fontFamily: {
            'ms-bold': ['montserrat-bold'],
            'ms-semibold': ['montserrat-semibold'],
            'ms-medium': ['montserrat-medium'],
            'ms-regular': ['montserrat-regular'],
            'ms-light': ['montserrat-light'],
        },
    },
    plugins: [],
};
