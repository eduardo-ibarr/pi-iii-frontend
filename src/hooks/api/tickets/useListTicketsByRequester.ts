import { QueryClient, useQuery } from 'react-query';
import { ticketsService } from '../../../services/api';

export function useListTicketsByRequester(id: string) {
	return useQuery('listTicketsByRequester', async () => {
		const tickets = await ticketsService.listTickets();

		const ticketsByRequester = tickets.filter(
			(ticket) => ticket.requester_id === id
		);

		return ticketsByRequester;
	});
}

export async function invalidateTicketsByRequester(client: QueryClient) {
	await client.invalidateQueries('listTicketsByRequester');
}
