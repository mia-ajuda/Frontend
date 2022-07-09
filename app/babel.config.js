module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo", "module:react-native-dotenv"],
    plugins: [
      "react-native-reanimated/plugin",
    ],
  };
};
