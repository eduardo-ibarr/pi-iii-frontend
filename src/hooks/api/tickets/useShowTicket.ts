import { useQuery } from 'react-query';
import { requestersService, ticketsService } from '../../../services/api';

export function useShowTicket(id: string) {
	return useQuery('showTicket', async () => {
		const ticket = await ticketsService.showTicket(id);

		const requesterOfTicket = await requestersService.showRequester(
			ticket.requester_id
		);

		return {
			...ticket,
			requester_name: requesterOfTicket.name,
		};
	});
}
