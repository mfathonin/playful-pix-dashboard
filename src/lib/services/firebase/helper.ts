import type { BaseModel } from '$lib/models/base';
import {
	Timestamp,
	addDoc,
	collection,
	doc,
	getDocs,
	serverTimestamp,
	updateDoc,
	type DocumentData,
	deleteDoc,
	QueryConstraint,
	query,
	getDoc
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

// Function to get all documents in a collection
export const getDocumentsByQuery = async <T extends DocumentData>(
	collectionName: string,
	...filter: QueryConstraint[]
): Promise<T[]> => {
	const collectionRef = collection(FirebaseDB, collectionName);
	const collectionQuery = query(collectionRef, ...filter);
	const querySnapshot = await getDocs(collectionQuery);
	return querySnapshot.docs.map(
		(doc) =>
			({
				id: doc.id,
				...doc.data(),
				createdAt: doc.data().createdAt.toDate(),
				updatedAt: doc.data().updatedAt.toDate()
			} as unknown as T & BaseModel)
	);
};

// Function to get a document by ID in a collection
export const getDocumentById = async <T extends DocumentData>(
	collectionName: string,
	documentId: string
): Promise<(T & BaseModel) | undefined> => {
	const collectionRef = collection(FirebaseDB, collectionName);
	const documentRef = doc(collectionRef, documentId);
	const documentSnapshot = await getDoc(documentRef);

	return documentSnapshot.exists()
		? ({
				id: documentSnapshot.id,
				...documentSnapshot.data(),
				createdAt: documentSnapshot.data().createdAt.toDate(),
				updatedAt: documentSnapshot.data().updatedAt.toDate()
		  } as unknown as T & BaseModel)
		: undefined;
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

// Function to delete an existing document in a collection
export const deleteDocument = async (collectionName: string, documentId: string): Promise<void> => {
	const documentRef = doc(collection(FirebaseDB, collectionName), documentId);
	await deleteDoc(documentRef);
};
