export interface ICreateTicket {
	requester_id: string;
	category_id: string;
	sector_id: string;
	status: string;
	subject: string;
	content: string;
	read_status: boolean;
}
