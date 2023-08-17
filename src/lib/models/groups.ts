import type { BaseModel } from './base';

export interface GroupModel {
	title: string;
	attributes?: Record<string, string[]>;
}

export interface Group extends GroupModel, BaseModel {}
