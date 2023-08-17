import type { BaseModel } from './base';

export interface LinksModel {
	url: string;
	targetUrl: string;
	fallbackUrl: string;
}

export interface Links extends LinksModel, BaseModel {}
