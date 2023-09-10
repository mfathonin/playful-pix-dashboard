import {
	collection,
	query,
	type DocumentData,
	type QueryConstraint,
	getDocs
} from 'firebase/firestore';
import { FirebaseDB } from './firebase';

// For more info, see https://firebase.google.com/docs/firestore/query-data/get-data
export const getDocumentsByQuery = async <T extends DocumentData>(
	collectionName: string,
	...filter: QueryConstraint[]
): Promise<T[]> => {
	const collectionRef = collection(FirebaseDB, collectionName);
	const collectionQuery = query(collectionRef, ...filter);
	const querySnapshot = await getDocs(collectionQuery);
	return querySnapshot.docs.map((doc) => ({ id: doc?.id, ...doc?.data() } as unknown as T));
};
