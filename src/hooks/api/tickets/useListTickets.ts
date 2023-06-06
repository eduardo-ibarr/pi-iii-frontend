import { QueryClient, useQuery } from 'react-query';
import { ticketsService } from '../../../services/api';

export function useListTickets() {
	return useQuery('listTickets', ticketsService.listTickets);
}

export async function invalidateTickets(client: QueryClient) {
	await client.invalidateQueries('listTickets');
}
