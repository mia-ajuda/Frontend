import firebase from 'firebase';
import Constants from 'expo-constants';
import authConfig from '../config/authmiaajuda-firebase';
import authConfigDEv from '../config/authmiaajuda-firebase-dev';

class FirebaseService {
    constructor() {
        const env = Constants.manifest.releaseChannel;
        const { apiKey, authDomain, projectId } =
            env == 'prod' ? authConfig : authConfigDEv;
        this.firebase = firebase.initializeApp({
            apiKey,
            authDomain,
            projectId,
        });
    }

    async login(email, password) {
        await this.firebase.auth().signInWithEmailAndPassword(email, password);
    }

    async getUserId() {
        return await this.firebase.auth().currentUser.getIdToken();
    }
    async sendEmailVerification() {
        return await this.firebase.auth().currentUser.sendEmailVerification();
    }
    async isEmailVerified() {
        return await this.firebase.auth().currentUser.emailVerified;
    }
    async resetUserPassword(email) {
        await this.firebase.auth().sendPasswordResetEmail(email);
    }
    async setPersistence() {
        await this.firebase
            .auth()
            .setPersistence(this.firebase.auth.Auth.Persistence.LOCAL);
    }
    async getCredentialFacebook(token) {
        return await this.firebase.auth.FacebookAuthProvider.credential(token);
    }
    async signInWithCredential(credential) {
        return await this.firebase.auth().signInWithCredential(credential);
    }
    async getCredentialGoogle(idToken, accessToken) {
        return await this.firebase.auth.GoogleAuthProvider.credential(
            idToken,
            accessToken,
        );
    }
    async signOut() {
        await this.firebase.auth().signOut();
    }
    async onAuthStateChanged(callbackfunction) {
        this.firebase.auth().onAuthStateChanged(callbackfunction);
    }
}

const firebaseService = new FirebaseService();
Object.freeze(firebaseService);

export default firebaseService;
