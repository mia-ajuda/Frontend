import firebase from "firebase";

import Constants from "expo-constants";

console.log(Constants.manifest.extra.apiKey);

const Firebase = firebase.initializeApp({
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
});

export default Firebase;
