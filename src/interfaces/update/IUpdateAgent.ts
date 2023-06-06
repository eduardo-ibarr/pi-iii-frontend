export interface IUpdateAgent {
	name?: string;
	email?: string;
	available?: boolean;
}

export interface IUpdateAgentPassword {
	old_password: string;
	new_password: string;
}
