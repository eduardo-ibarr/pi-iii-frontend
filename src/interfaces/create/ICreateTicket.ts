import { TTicketStatus } from '../../types/TTicketStatus';

export interface ICreateTicket {
	requester_id: string;
	category_id: string;
	sector_id: string;
	status: TTicketStatus;
	subject: string;
	content: string;
}
