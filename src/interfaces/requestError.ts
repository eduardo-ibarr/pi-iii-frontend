interface IValidationError {
	body: {
		keys: string[];
		message: string;
		source: string;
	};
}

export interface IRequestError {
	statusCode?: number;
	error: string;
	message: string;
	validation?: IValidationError;
}
