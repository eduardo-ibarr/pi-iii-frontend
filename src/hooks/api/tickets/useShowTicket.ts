import { QueryClient, useQuery } from 'react-query';
import {
	categoriesService,
	requestersService,
	sectorsService,
	ticketsService,
} from '../../../services/api';

export function useShowTicket(id: string) {
	return useQuery('showTicket', async () => {
		const ticket = await ticketsService.showTicket(id);

		const requesterOfTicket = await requestersService.showRequester(
			ticket.requester_id
		);

		const categoryOfTicket = await categoriesService.showCategory(
			ticket.category_id
		);

		const sectorOfTicket = await sectorsService.showSector(ticket.sector_id);

		return {
			...ticket,
			requester_name: requesterOfTicket.name,
			sector_name: sectorOfTicket.name,
			category_name: categoryOfTicket.name,
		};
	});
}

export async function invalidateTicket(client: QueryClient, id: string) {
	await client.invalidateQueries(['showTicket', id]);
}
