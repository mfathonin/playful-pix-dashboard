import type { Collection } from '$lib/models/collections';

// Dummy data
const dummyData: Collection[] = [
	{
		id: '1',
		name: 'Buku 1',
		createdAt: new Date(),
		updatedAt: new Date(),
		attributes: { 'Attribute 1': 'value 2', 'Tahun Terbit': '2022' }
	},
	{
		id: '2',
		name: 'Grup Buku 2 dengan title yang lumayan panjang sehingga pasti kena overflow',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{ id: '3', name: 'Group 3', createdAt: new Date(), updatedAt: new Date() },
	{ id: '4', name: 'Group 4', createdAt: new Date(), updatedAt: new Date() },
	{ id: '5', name: 'Group 5', createdAt: new Date(), updatedAt: new Date() },
	{ id: '6', name: 'Group 6', createdAt: new Date(), updatedAt: new Date() },
	{ id: '7', name: 'Group 7', createdAt: new Date(), updatedAt: new Date() },
	{ id: '8', name: 'Group 8', createdAt: new Date(), updatedAt: new Date() },
	{ id: '9', name: 'Group 9', createdAt: new Date(), updatedAt: new Date() },
	{ id: '10', name: 'Group 10', createdAt: new Date(), updatedAt: new Date() },
	{ id: '11', name: 'Group 11', createdAt: new Date(), updatedAt: new Date() },
	{ id: '12', name: 'Group 12', createdAt: new Date(), updatedAt: new Date() },
	{ id: '13', name: 'Group 13', createdAt: new Date(), updatedAt: new Date() },
	{ id: '14', name: 'Group 14', createdAt: new Date(), updatedAt: new Date() },
	{ id: '15', name: 'Group 15', createdAt: new Date(), updatedAt: new Date() },
	{ id: '16', name: 'Group 16', createdAt: new Date(), updatedAt: new Date() },
	{ id: '17', name: 'Group 17', createdAt: new Date(), updatedAt: new Date() }
];

const generateGroup = (title: string): Collection => ({
	id: Math.random().toString(),
	name: title,
	createdAt: new Date(),
	updatedAt: new Date()
});

export const getGroups = async (): Promise<Collection[]> => {
	// TODO: Fetch groups from the API

	return dummyData;
};

export const getGroupById = async (id: string): Promise<Collection | undefined> => {
	try {
		// TODO: Fetch group from the API
		return dummyData.find((group) => group.id === id);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const createGroup = async (group: Collection): Promise<Collection> => {
	const newGroup = generateGroup(group.name);
	dummyData.push(newGroup);
	return newGroup;
};
