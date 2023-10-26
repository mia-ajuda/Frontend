import { initializeApp } from 'firebase/app';
import {
    getAuth,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    getIdToken,
    signOut,
    signInWithCredential,
    onAuthStateChanged,
} from 'firebase/auth';
import Constants from 'expo-constants';
const { AUTH_CONFIG_JSON, AUTH_DEV_CONFIG_JSON } = process.env
console.log(process.env)
// console.log(AUTH_CONFIG_JSON)
// const authConfig = JSON.parse(AUTH_CONFIG_JSON);
// const authConfigDev = JSON.parse(AUTH_DEV_CONFIG_JSON);

class FirebaseService {
    constructor() {
        const env = Constants.manifest.releaseChannel;
        const { apiKey, authDomain, projectId } = {};
        this.app = initializeApp({
            apiKey,
            authDomain,
            projectId,
        });
        this.auth = getAuth();
    }

    isEmailVerified() {
        return this.auth.currentUser.emailVerified;
    }

    async login(email, password) {
        return await signInWithEmailAndPassword(this.auth, email, password);
    }

    async sendEmailVerification() {
        await sendEmailVerification(this.auth.currentUser);
    }

    async getUserId() {
        return await getIdToken(this.auth.currentUser);
    }

    async getCurrentUser() {
        return this.auth.currentUser;
    }

    async resetUserPassword(email) {
        await sendPasswordResetEmail(this.auth, email);
        return true;
    }

    async signInWithCredential(credential) {
        return await signInWithCredential(this.auth, credential);
    }

    async signOut() {
        await signOut(this.auth);
    }

    async onAuthStateChanged(callbackfunction) {
        onAuthStateChanged(this.auth, callbackfunction);
    }
}

const firebaseService = new FirebaseService();
Object.freeze(firebaseService);

export default firebaseService;
