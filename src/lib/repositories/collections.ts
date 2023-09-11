import type { Collection, CollectionModel } from '$lib/models/collections';
import {
	addNewDocument,
	deleteDocument,
	getAllDocuments,
	updateDocument
} from '$lib/services/firebase/helper';
import { FC_COLLECTIONS } from '$lib/utils';

export const getCollections = async (): Promise<Collection[]> => {
	try {
		const collections = await getAllDocuments<Collection>(FC_COLLECTIONS);
		return collections;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getCollectionById = async (id: string): Promise<Collection | undefined> => {
	try {
		const collections = await getAllDocuments<Collection>(FC_COLLECTIONS);
		return collections.find((collection) => collection.id === id);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const createCollection = async (collection: CollectionModel): Promise<Collection> => {
	try {
		return await addNewDocument<CollectionModel>(FC_COLLECTIONS, collection);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const updateCollectionById = async (
	id: string,
	collection: CollectionModel
): Promise<Collection> => {
	try {
		return await updateDocument<CollectionModel>(FC_COLLECTIONS, id, collection);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const deleteCollectionById = async (id: string): Promise<void> => {
	try {
		await deleteDocument(FC_COLLECTIONS, id);
	} catch (error) {
		console.error(error);
		throw error;
	}
};
