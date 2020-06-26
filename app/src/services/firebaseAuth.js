import firebase from 'firebase';
import Constants from 'expo-constants';
import authConfig from '../config/authmiaajuda-firebase';
import authConfigDEv from '../config/authmiaajuda-firebase-dev';

const env = Constants.manifest.releaseChannel;
const { apiKey, authDomain, projectId } =
    env == 'prod' ? authConfig : authConfigDEv;

const Firebase = firebase.initializeApp({
    apiKey,
    authDomain,
    projectId,
});

export default Firebase;
