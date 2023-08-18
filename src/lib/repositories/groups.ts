import type { Group } from '$lib/models/groups';

// Dummy data
const dummyData: Group[] = [
	{
		id: '1',
		title: 'Buku 1',
		createdAt: new Date(),
		updatedAt: new Date(),
		attributes: { 'Attribute 1': ['value 2'], 'Tahun Terbit': ['2022'] }
	},
	{
		id: '2',
		title: 'Grup Buku 2 dengan title yang lumayan panjang sehingga pasti kena overflow',
		createdAt: new Date(),
		updatedAt: new Date()
	},
	{ id: '3', title: 'Group 3', createdAt: new Date(), updatedAt: new Date() },
	{ id: '4', title: 'Group 4', createdAt: new Date(), updatedAt: new Date() },
	{ id: '5', title: 'Group 5', createdAt: new Date(), updatedAt: new Date() },
	{ id: '6', title: 'Group 6', createdAt: new Date(), updatedAt: new Date() },
	{ id: '7', title: 'Group 7', createdAt: new Date(), updatedAt: new Date() },
	{ id: '8', title: 'Group 8', createdAt: new Date(), updatedAt: new Date() },
	{ id: '9', title: 'Group 9', createdAt: new Date(), updatedAt: new Date() },
	{ id: '10', title: 'Group 10', createdAt: new Date(), updatedAt: new Date() },
	{ id: '11', title: 'Group 11', createdAt: new Date(), updatedAt: new Date() },
	{ id: '12', title: 'Group 12', createdAt: new Date(), updatedAt: new Date() },
	{ id: '13', title: 'Group 13', createdAt: new Date(), updatedAt: new Date() },
	{ id: '14', title: 'Group 14', createdAt: new Date(), updatedAt: new Date() },
	{ id: '15', title: 'Group 15', createdAt: new Date(), updatedAt: new Date() },
	{ id: '16', title: 'Group 16', createdAt: new Date(), updatedAt: new Date() },
	{ id: '17', title: 'Group 17', createdAt: new Date(), updatedAt: new Date() }
];

const generateGroup = (title: string): Group => ({
	id: Math.random().toString(),
	title,
	createdAt: new Date(),
	updatedAt: new Date()
});

export const getGroups = async (): Promise<Group[]> => {
	// TODO: Fetch groups from the API

	return dummyData;
};

export const getGroupById = async (id: string): Promise<Group | undefined> => {
	try {
		// TODO: Fetch group from the API
		return dummyData.find((group) => group.id === id);
	} catch (error) {
		console.error(error);
		throw error;
	}
};

export const createGroup = async (group: Group): Promise<Group> => {
	const newGroup = generateGroup(group.title);
	dummyData.push(newGroup);
	return newGroup;
};
