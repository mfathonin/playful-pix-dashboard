// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth, setPersistence, inMemoryPersistence } from 'firebase/auth';
import { env } from '$env/dynamic/private';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: env.API_KEY,
	authDomain: env.AUTH_DOMAIN,
	projectId: env.PROJECT_ID,
	storageBucket: env.STORAGE_BUCKET,
	messagingSenderId: env.MESSAGING_SENDER_ID,
	appId: env.APP_ID,
	measurementId: env.MEASUREMENT_ID
};

// Initialize Firebase
let firebaseApp;
if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApp();
	deleteApp(firebaseApp);
	firebaseApp = initializeApp(firebaseConfig);
}
// export const fitebaseAnalytics = getAnalytics(firebaseApp);

export const auth = getAuth(firebaseApp);
