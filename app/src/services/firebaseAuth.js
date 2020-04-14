import firebase from 'firebase';
import authConfig from '../config/authmiaajuda-firebase';

console.log(authConfig);

const config= authConfig;

const Firebase = firebase.initializeApp(config);

export default Firebase;