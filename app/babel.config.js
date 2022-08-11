module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo', 'module:react-native-dotenv','@babel/preset-env'],
        plugins: ['react-native-reanimated/plugin'],
    };
};
