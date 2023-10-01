export const getPrefixLinks = () => location.origin + '/links/';
export const getLinks = (text: string): string => {
	return new URL(text, getPrefixLinks()).href;
};
