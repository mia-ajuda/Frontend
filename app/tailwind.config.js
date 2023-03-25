module.exports = {
    content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: {
                    default: '#4b8ab9',
                    contrast: '#81b0ff',
                    lowOpacity: '#E4F4FF',
                },
                secondary: {
                    default: '#f7ef6e',
                },
                danger: {
                    default: '#e47171',
                },
                dark: {
                    default: '#353535',
                },
                light: {
                    default: '#f7f7f7',
                },
                success: {
                    default: '#77dd77',
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
