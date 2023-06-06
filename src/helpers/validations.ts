export const passwordValidator = (password: string) => {
	const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

	return passwordRegex.test(password);
};
