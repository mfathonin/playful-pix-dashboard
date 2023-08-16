export const registrationCode = async (): Promise<string> => {
	const res = await fetch('/api/v1/registrationCode');
	if (res.status !== 200) throw new Error('Failed to fetch registration code');

	const { registrationCode } = await res.json();

	return registrationCode;
};
