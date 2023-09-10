// Import the functions you need from the SDKs you need
import { deleteApp, getApp, getApps, initializeApp, type FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getAuth, setPersistence, inMemoryPersistence } from 'firebase/auth';
import {
	CACHE_SIZE_UNLIMITED,
	getFirestore,
	persistentLocalCache,
	persistentMultipleTabManager
} from 'firebase/firestore';
import { env } from '$env/dynamic/private';

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
let firebaseApp: FirebaseApp;
if (!getApps().length) {
	firebaseApp = initializeApp(firebaseConfig);
} else {
	firebaseApp = getApp();
	deleteApp(firebaseApp);
	firebaseApp = initializeApp(firebaseConfig);
}

// Export Firebase services
export const FirebaseAuth = getAuth(firebaseApp);
setPersistence(FirebaseAuth, inMemoryPersistence);

export const FirebaseDB = getFirestore(firebaseApp);
persistentLocalCache({
	cacheSizeBytes: CACHE_SIZE_UNLIMITED,
	tabManager: persistentMultipleTabManager()
});

/**
 * How to access Firebase Analytics if supported.
 * @returns {import('firebase/analytics').Analytics | undefined} Analytics object if supported, undefined otherwise
 *
 * @example
 * import { FirebaseAnalytics } from '$lib/services/firebase/firebase';
 *
 * FirebaseAnalytics().then((analytics) => {
 * 	if (analytics) {
 * 		logEvent(analytics, 'page_view', { page_title: 'Home', page_location: '/' });
 * 	}
 * });
 */
export const FirebaseAnalytics = async () => {
	const isAnalyticsSupported = await isSupported();
	if (isAnalyticsSupported) {
		const analytics = getAnalytics(firebaseApp);
		return analytics;
	} else {
		console.warn('Analytics is not supported');
		return undefined;
	}
};
