import { TTicketStatus } from '../../types/TTicketStatus';

export interface ITicket {
	id: string;
	requester_id: string;
	category_id: string;
	agent_id: string;
	sector_id: string;
	status: TTicketStatus;
	subject: string;
	content: string;
	read_status: string;
	created_at: Date;
	updated_at: Date;
}
