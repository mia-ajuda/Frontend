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

    isEmailVerified() {
        return this.firebase.auth().currentUser.emailVerified;
    }

    async login(email, password) {
        return await this.firebase
            .auth()
            .signInWithEmailAndPassword(email, password);
    }
    async sendEmailVerification() {
        await this.firebase.auth().currentUser.sendEmailVerification();
    }

    async getUserId() {
        return await this.firebase.auth().currentUser.getIdToken();
    }
    async getCurrentUser() {
        return await this.firebase.auth().currentUser;
    }
    async resetUserPassword(email) {
        await this.firebase.auth().sendPasswordResetEmail(email);
        return true;
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
