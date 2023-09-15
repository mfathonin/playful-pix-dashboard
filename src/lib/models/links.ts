import type { BaseModel } from './base';

export type LinkModel = {
	url: string;
	targetUrl: string;
	fallbackUrl: string;
};

export type LinkData = LinkModel & {
	visited: number;
	opened: number;
};

export type Links = LinkModel & BaseModel;
export type LinksAnalitycs = LinkData & BaseModel;
