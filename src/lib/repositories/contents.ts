import type { BaseModel } from '$lib/models/base';
import type { ContentDigital, ContentDigitalModel } from '$lib/models/contents';
import {
	addNewDocument,
	getDocumentById,
	getDocumentsByQuery,
	updateDocument
} from '$lib/services/firebase/helper';
import { where } from 'firebase/firestore';

export const getContentsByGroupId = async (collectionId: string) => {
	try {
		const contents = await getDocumentsByQuery<ContentDigital>(
			'contents',
			where('collectionId', '==', collectionId)
		);
		return contents;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getContentsById = async (id: string): Promise<ContentDigital | undefined> => {
	try {
		const content = await getDocumentById<ContentDigital>('contents', id);
		return content;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const createContent = async (content: ContentDigitalModel) => {
	try {
		return await addNewDocument<ContentDigitalModel>('contents', content);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const updateContentById = async (
	id: string,
	content: ContentDigitalModel
): Promise<ContentDigitalModel & BaseModel> => {
	try {
		return await updateDocument<ContentDigitalModel>('contents', id, content);
	} catch (error) {
		console.error(error);
		throw error;
	}
};
