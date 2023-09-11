import type { BaseModel } from '$lib/models/base';
import {
	Timestamp,
	addDoc,
	collection,
	doc,
	getDocs,
	serverTimestamp,
	updateDoc,
	type DocumentData
} from 'firebase/firestore';
import { FirebaseDB } from './firebase';

export const getAllDocuments = async <T extends DocumentData>(
	collectionName: string
): Promise<T[]> => {
	const collectionRef = collection(FirebaseDB, collectionName);
	const querySnapshot = await getDocs(collectionRef);
	return querySnapshot.docs.map((doc) => {
		return {
			id: doc.id,
			...doc.data(),
			createdAt: doc.data().createdAt.toDate(),
			updatedAt: doc.data().updatedAt.toDate()
		} as unknown as T & BaseModel;
	});
};

// Function to add a new document to a collection
export const addNewDocument = async <T extends DocumentData>(
	collectionName: string,
	documentData: T
): Promise<T & BaseModel> => {
	const timestamp = serverTimestamp();
	const documentWithTimestamps = {
		...documentData,
		createdAt: timestamp,
		updatedAt: timestamp
	};
	const collectionRef = collection(FirebaseDB, collectionName);
	const docRef = await addDoc(collectionRef, documentWithTimestamps);
	return {
		id: docRef.id,
		...documentData,
		createdAt: Timestamp.now(),
		updatedAt: Timestamp.now()
	} as unknown as T & BaseModel;
};

// Function to update an existing document in a collection
export const updateDocument = async <T extends DocumentData>(
	collectionName: string,
	documentId: string,
	documentData: T
): Promise<T & BaseModel> => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { id, ...documentWithoutId } = documentData;
	const documentRef = doc(collection(FirebaseDB, collectionName), documentId);
	await updateDoc(documentRef, {
		...documentWithoutId,
		updatedAt: serverTimestamp()
	});

	return {
		documentData,
		updatedAt: Timestamp.now()
	} as unknown as T & BaseModel;
};
