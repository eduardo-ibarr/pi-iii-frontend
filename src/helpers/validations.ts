export const passwordValidator = (password: string) => {
	const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

	return passwordRegex.test(password);
};

export const nameValidator = (name: string) => {
	const nameRegex = /^(?!.*?(.)\1{2})[a-zA-ZÀ-ÿ']+( [a-zA-ZÀ-ÿ']+)+$/;

	return nameRegex.test(name);
};
