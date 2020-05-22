export default ({ config }) => {
  return {
    ...config,
    extra: {
      IP_ADDRESS: process.env["IP_ADDRESS"],
      apiKey: process.env["apiKey"],
      authDomain: process.env["authDomain"],
      projectId: process.env["projectId"],
      facebookId: process.env["facebookId"],
      googleIosClientId: process.env["googleIosClientId"],
      googleAndroidClientId: process.env["googleAndroidClientId"],
    },
    android: {
      package: "com.unb.miaajuda",
      config: {
        googleMaps: {
          apiKey: process.env["MAPS_API_KEY"],
        },
      },
    },
  };
};
