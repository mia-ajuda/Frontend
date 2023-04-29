module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'rgba(75, 138, 185, 1)',
                    100: 'rgba(75, 138, 185, 0.1)',
                    200: 'rgba(75, 138, 185, 0.2)',
                    300: 'rgba(75, 138, 185, 0.3)',
                    400: 'rgba(75, 138, 185, 0.4)',
                    500: 'rgba(75, 138, 185, 0.5)',
                    600: 'rgba(75, 138, 185, 0.6)',
                    700: 'rgba(75, 138, 185, 0.7)',
                    800: 'rgba(75, 138, 185, 0.8)',
                    900: 'rgba(75, 138, 185, 0.9)',
                    contrast: '#81b0ff',
                },
                secondary: '#f7ef6e',
                danger: '#e47171',
                black: '#353535',
                light: '#f7f7f7',
                success: '#77dd77',
                background: '#f1f1f1',
                gray: '#e6e6e6',
                new_background: '#F2F2F7',
                'first-rank': '#BF6159',
                'second-rank': '#538D95',
                'thirt-rank': '#D0A408',
            },
            spacing: {
                38: '9.5rem',
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
