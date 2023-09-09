import type { ContentDigital } from '$lib/models/contents';

function dummyGenerator(groupId: string, title: string, targetUrl: string): ContentDigital {
	const id = Math.random().toString(16).substring(3, 11);
	return {
		id,
		groupId,
		createdAt: new Date(),
		updatedAt: new Date(),
		title,
		generatedLink: {
			targetUrl,
			fallbackUrl: 'http://localhost:5173',
			url: id
		},
		views: 0,
		visitors: 0
	};
}
// dummy fetcher for group contents
const fetchContents = async (groupId: string): Promise<ContentDigital[]> => {
	return [
		{ ...dummyGenerator('1', 'test1', 'https://www.google.com') },
		{ ...dummyGenerator('1', 'test2', 'https://www.google.com') },
		{ ...dummyGenerator('1', 'test3', 'https://www.google.com') },
		{ ...dummyGenerator('1', 'test4', 'https://www.google.com') },
		{ ...dummyGenerator('1', 'test5', 'https://www.google.com') },
		{ ...dummyGenerator('1', 'test6', 'https://www.google.com') },
		{ ...dummyGenerator('2', 'test7', 'https://www.google.com') },
		{ ...dummyGenerator('2', 'test8', 'https://www.google.com') },
		{ ...dummyGenerator('2', 'test9', 'https://www.google.com') },
		{ ...dummyGenerator('3', 'test10', 'https://www.google.com') },
		{ ...dummyGenerator('3', 'test11', 'https://www.google.com') },
		{ ...dummyGenerator('6', 'test12', 'https://www.google.com') },
		{ ...dummyGenerator('6', 'test13', 'https://www.google.com') },
		{ ...dummyGenerator('6', 'test14', 'https://www.google.com') },
		{ ...dummyGenerator('6', 'test15', 'https://www.google.com') }
	].filter((content) => content.groupId === groupId);
};

export const getContentsByGroupId = async (groupId: string) => {
	const contents = await fetchContents(groupId);

	return contents;
};
