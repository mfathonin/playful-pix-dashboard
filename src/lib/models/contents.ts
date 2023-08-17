import type { BaseModel } from './base';
import type { LinksModel } from './links';

export interface ContentDigitalModel {
	title: string;
	link: string;
	generatedLink: LinksModel;
}

export interface ContentDigitalAnalytics {
	views: number;
	visitors: number;
}

export interface ContentDigital extends ContentDigitalModel, ContentDigitalAnalytics, BaseModel {}
