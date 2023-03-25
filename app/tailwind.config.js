module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#4b8ab9',
                    contrast: '#81b0ff',
                    lowOpacity: '#E4F4FF',
                },
                secondary: {
                    DEFAULT: '#f7ef6e',
                },
                danger: {
                    DEFAULT: '#e47171',
                },
                dark: {
                    DEFAULT: '#353535',
                },
                light: {
                    DEFAULT: '#f7f7f7',
                },
                success: {
                    DEFAULT: '#77dd77',
                },
            },
            screens: {
                sm: '320px',
                md: '480px',
                lg: '640px',
            },
            fontFamily: {
                sans: ['montserrat-regular'],
            },

            boxShadow: {
                default: '0.5px solid rgba(53, 53, 53, 0.3)',
            },
        },
    },
    plugins: [],
};
