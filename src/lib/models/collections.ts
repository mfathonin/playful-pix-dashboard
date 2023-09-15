import { z } from 'zod';
import type { BaseModel } from './base';

export type CollectionModel = {
	name: string;
	attributes?: { key: string; value: string }[];
};

export type Collection = CollectionModel & BaseModel;

export const collectionSchema = z.object({
	id: z.string().nonempty('ID koleksi harus diisi'),
	name: z.string().nonempty('Nama koleksi harus diisi'),
	attributes: z
		.object({
			key: z.string().nonempty('Nama properti harus diisi'),
			value: z.string().nonempty('Nilai properti harus diisi')
		})
		.array()
});

export const crudCollectionSchema = collectionSchema.extend({
	id: collectionSchema.shape.id.optional()
});
