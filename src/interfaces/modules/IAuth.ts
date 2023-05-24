import { TUser } from '../../types/TUser';

export interface IAuth {
	token: string;
	expiresIn: number;
	typeOfUser: TUser;
	userId: string;
}
