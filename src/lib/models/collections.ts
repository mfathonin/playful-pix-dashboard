import type { BaseModel } from './base';

export interface CollectionModel {
	name: string;
	attributes?: Record<string, string>;
}

export interface Collection extends CollectionModel, BaseModel {}
