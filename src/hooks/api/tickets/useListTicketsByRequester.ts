import { useQuery } from 'react-query';
import { ticketsService } from '../../../services/api';

export function useListTicketsByRequester(id: string) {
	return useQuery('listTickets', async () => {
		const tickets = await ticketsService.listTickets();
		return tickets.filter((ticket) => ticket.requester_id === id);
	});
}
