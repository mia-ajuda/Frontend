import Constants from "expo-constants";

const ENV = {
  dev: {
    socketUrl: `http://${process.env["IP_ADDRESS"]}:8000/`,
    apiUrl: `http://${process.env["IP_ADDRESS"]}:8000/api`,
  },
  staging: {
    socketUrl: `http://164.41.92.25:8000/`,
    apiUrl: `http://164.41.92.25:8000/api/`,
  },
  prod: {
    socketUrl: `http://164.41.92.25:8000/`,
    apiUrl: `http://164.41.92.25:8000/api/`,
  },
};

function getEnvVars(env = "") {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
  if (env.indexOf("prod") !== -1) return ENV.prod;
  if (env.indexOf("staging") !== -1) return ENV.staging;
}

export default getEnvVars(Constants.manifest.releaseChannel);
