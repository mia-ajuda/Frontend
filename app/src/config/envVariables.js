import Constants from "expo-constants";

const prodUrl = "http://164.41.92.25:8000/";
const devUrl = `http://164.41.92.25:8000/`;

const ENV = {
  dev: {
    socketUrl: devUrl,
    apiUrl: devUrl + "api",
  },
  staging: {
    apiUrl: prodUrl,
  },
  prod: {
    socketUrl: devUrl,
    apiUrl: prodUrl + "api",
  },
};

function getEnvVars(env = "") {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
  if (env.indexOf("prod") !== -1) return ENV.prod;
  if (env.indexOf("staging") !== -1) return ENV.staging;
}

export default getEnvVars(Constants.manifest.releaseChannel);
