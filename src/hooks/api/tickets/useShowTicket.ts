import { QueryClient, useQuery } from 'react-query';
import {
	agentsService,
	categoriesService,
	requestersService,
	sectorsService,
	ticketsService,
} from '../../../services/api';
import { IAgent } from '../../../interfaces/modules';

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

		let agentOfTicket = {} as IAgent;

		if (ticket.agent_id) {
			agentOfTicket = await agentsService.showAgent(ticket.agent_id);
		}

		return {
			...ticket,
			requester_name: requesterOfTicket.name,
			requester_email: requesterOfTicket.email,
			sector_name: sectorOfTicket.name,
			category_name: categoryOfTicket.name,
			agent_email: agentOfTicket.email,
			agent_name: agentOfTicket.name,
		};
	});
}

export async function invalidateTicket(client: QueryClient, id: string) {
	await client.invalidateQueries(['showTicket', id]);
}
