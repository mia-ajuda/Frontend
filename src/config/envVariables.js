import Constants from "expo-constants";

import { IP_ADDRESS } from "react-native-dotenv";

const ENV = {
  dev: {
    socketUrl: `http://${IP_ADDRESS}:8000/`,
    apiUrl: `http://${IP_ADDRESS}:8000/api`,
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

console.log("bbbbbbbbbbbbbbbbb");
console.log(JSON.stringify(ENV.dev.apiUrl));

function getEnvVars(env = "") {
  if (env === null || env === undefined || env === "") return ENV.dev;
  if (env.indexOf("dev") !== -1) return ENV.dev;
  if (env.indexOf("prod") !== -1) return ENV.prod;
  if (env.indexOf("staging") !== -1) return ENV.staging;
}

export default getEnvVars(Constants.manifest.releaseChannel);
