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
import authConfig from '../config/authmiaajuda-firebase';
import authConfigDev from '../config/authmiaajuda-firebase-dev';

class FirebaseService {
    constructor() {
        const env = Constants.manifest.releaseChannel;
        const { apiKey, authDomain, projectId } =
            env == 'prod' ? authConfig : authConfigDev;
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
