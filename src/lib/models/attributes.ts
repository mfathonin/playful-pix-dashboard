import type { BaseModel } from './base';

export interface AttributesModel {
	key: string;
	availableValues: string[];
}

export interface Attributes extends AttributesModel, BaseModel {}
