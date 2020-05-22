import {
  apiKey,
  authDomain,
  projectId,
  facebookId,
  googleIosClientId,
  googleAndroidClientId,
  MAPS_API_KEY,
} from "react-native-dotenv";

export default ({ config }) => {
  return {
    ...config,
    extra: {
      apiKey: process.env["apiKey"],
      authDomain: authDomain,
      projectId: projectId,
      facebookId: facebookId,
      googleIosClientId: googleIosClientId,
      googleAndroidClientId: googleAndroidClientId,
    },
    android: {
      package: "com.unb.miaajuda",
      config: {
        googleMaps: {
          apiKey: MAPS_API_KEY,
        },
      },
    },
  };
};
