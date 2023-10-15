import type { BaseModel } from '$lib/models/base';
import type { ContentDigital, ContentDigitalModel } from '$lib/models/contents';
import {
	addNewDocument,
	deleteDocument,
	getDocumentById,
	getDocumentsByQuery,
	updateDocument
} from '$lib/services/firebase/helper';
import { FC_CONTENTS } from '$lib/utils';
import { where } from 'firebase/firestore';

export const getContentsByGroupId = async (collectionId: string) => {
	try {
		const contents = await getDocumentsByQuery<ContentDigital>(
			FC_CONTENTS,
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
		const content = await getDocumentById<ContentDigital>(FC_CONTENTS, id);
		return content;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const getContentsByUrl = async (url: string): Promise<ContentDigital[] | undefined> => {
	try {
		const contents = await getDocumentsByQuery<ContentDigital>(
			FC_CONTENTS,
			where('link.url', '==', url)
		);
		return contents;
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const createContent = async (content: ContentDigitalModel) => {
	try {
		return await addNewDocument<ContentDigitalModel>(FC_CONTENTS, content);
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
		return await updateDocument<ContentDigitalModel>(FC_CONTENTS, id, content);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const deleteContentById = async (id: string) => {
	try {
		return await deleteDocument(FC_CONTENTS, id);
	} catch (error) {
		console.error(error);
		throw error;
	}
};
