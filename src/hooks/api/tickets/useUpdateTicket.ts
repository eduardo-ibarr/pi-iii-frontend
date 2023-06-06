import { useMutation, useQueryClient } from 'react-query';
import { ticketsService } from '../../../services/api';
import { IUpdateTicket } from '../../../interfaces/update';
import { invalidateTicket } from './useShowTicket';
import { invalidateTickets } from './useListTickets';
import { invalidateTicketsByRequester } from './useListTicketsByRequester';

export function useUpdateTicket(id: string) {
	const queryClient = useQueryClient();

	return useMutation(
		(values: IUpdateTicket) => ticketsService.updateTicket(values, id),
		{
			onSuccess: () => {
				invalidateTicket(queryClient, id);
				invalidateTickets(queryClient);
				invalidateTicketsByRequester(queryClient);
			},
		}
	);
}
