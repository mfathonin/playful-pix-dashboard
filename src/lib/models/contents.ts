import { z } from 'zod';
import type { BaseModel } from './base';
import type { LinkModel } from './links';

export type ContentDigitalModel = {
	collectionId: string;
	title: string;
	link: LinkModel;
};

export type ContentDigitalAnalytics = {
	views: number;
	visitors: number;
};

export type ContentDigital = ContentDigitalModel & ContentDigitalAnalytics & BaseModel;

export const contentSchema = z.object({
	id: z.string().nonempty('ID konten harus diisi'),
	title: z.string().nonempty('Judul harus diisi'),
	targetUrl: z.string().url('URL tidak valid').nonempty('URL harus diisi')
});

export const crudContentSchema = contentSchema.extend({
	id: contentSchema.shape.id.optional(),
	collectionId: z.string().nonempty('ID koleksi harus diisi'),
	generatedUrl: z.string().nonempty('URL tidak boleh kosong')
});
