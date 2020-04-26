import firebase from "firebase";
import authConfig from "../config/authmiaajuda-firebase";

const config = authConfig;

const Firebase = firebase.initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId
});

export default Firebase;
