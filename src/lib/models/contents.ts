import { z } from 'zod';
import type { BaseModel } from './base';
import type { LinksModel } from './links';

export interface ContentDigitalModel {
	groupId: string;
	title: string;
	generatedLink: LinksModel;
}

export interface ContentDigitalAnalytics {
	views: number;
	visitors: number;
}

export interface ContentDigital extends ContentDigitalModel, ContentDigitalAnalytics, BaseModel {}

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

export const createContentSchema = z.object({
	collectionId: z.string().optional(),
	title: z.string().nonempty('Judul harus diisi'),
	targetUrl: z.string().url('URL tidak valid').nonempty('URL harus diisi')
});

export const editContentSchema = z.object({
	title: z.string().nonempty('Judul harus diisi'),
	targetUrl: z.string().url('URL tidak valid').nonempty('URL harus diisi'),
	url: z.string().nonempty('Link harus diisi').min(4, 'Link harus lebih dari 4 karakter')
});
