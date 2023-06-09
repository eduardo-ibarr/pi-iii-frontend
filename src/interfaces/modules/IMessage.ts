import { TUser } from '../../types/TUser';
export interface IMessage {
	id: string;
	conversation_id: string;
	sender: TUser;
	content: string;
	read_status: boolean;
	updated_at: Date;
	created_at: Date;
}
