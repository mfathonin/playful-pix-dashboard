import type { BaseModel } from './base';

export interface CollectionModel {
	name: string;
	attributes?: { key: string; value: string }[];
}

export interface Collection extends CollectionModel, BaseModel {}
