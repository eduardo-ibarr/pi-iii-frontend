export interface IUpdateRequester {
	name?: string;
	email?: string;
}

export interface IUpdateRequesterPassword {
	old_password: string;
	new_password: string;
}
