import type { Attributes } from '$lib/models/attributes';

// Dummy data
const dummyData: Attributes[] = [
	{
		id: '1',
		key: 'attribute 1',
		availableValues: ['value 1', 'value 2'],
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{
		id: '2',
		key: 'attribute 2',
		availableValues: ['value 3', 'value 4'],
		createdAt: new Date(),
		updatedAt: new Date()
	}
];

const generateDummyAttribute = (key: string, values: string[] = []): Attributes => ({
	id: Math.random().toString(),
	key,
	availableValues: values,
	createdAt: new Date(),
	updatedAt: new Date()
});

export const getAvailableAttributes = async (): Promise<Attributes[]> => {
	// TODO: Fetch attributes from the API

	return dummyData;
};

export const getAvailableAttributeByKey = async (key: string): Promise<Attributes | undefined> => {
	try {
		// TODO: Fetch attribute from the API
		return dummyData.find((attribute) => attribute.key === key);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const createAttribut = async (attribute: Attributes): Promise<Attributes> => {
	const newAttribute = generateDummyAttribute(attribute.key, attribute.availableValues);
	dummyData.push(newAttribute);
	return newAttribute;
};

export const addAttribute = async (attributeKey: string, value: string): Promise<Attributes[]> => {
	try {
		// TODO change this mutation to use the API
		let oldAttribute = dummyData.find((attribute) => attribute.key === attributeKey);
		if (oldAttribute === undefined) {
			oldAttribute = generateDummyAttribute(attributeKey);
		}

		if (!oldAttribute?.availableValues.includes(value)) {
			oldAttribute?.availableValues.push(value);
		}
		if (oldAttribute === undefined) {
			dummyData.push(oldAttribute);
		}

		return dummyData;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
