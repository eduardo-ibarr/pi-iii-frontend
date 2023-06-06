import { TUser } from '../../types/TUser';

export interface ILogin {
	type_of_user: TUser;
	email: string;
	password: string;
}
