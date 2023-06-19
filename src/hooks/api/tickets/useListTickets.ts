import { QueryClient, useQuery } from 'react-query';
import { requestersService, ticketsService } from '../../../services/api';

export function useListTickets() {
	return useQuery('listTickets', async () => {
		const tickets = await ticketsService.listTickets();

		const requesters = await requestersService.listRequesters();

		return tickets.map((ticket) => ({
			...ticket,
			requester_name:
				requesters.find((requester) => requester.id === ticket.requester_id)
					?.name || '',
		}));
	});
}

export async function invalidateTickets(client: QueryClient) {
	await client.invalidateQueries('listTickets');
}
