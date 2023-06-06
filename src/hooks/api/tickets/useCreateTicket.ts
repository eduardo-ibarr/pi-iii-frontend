import { useMutation, useQueryClient } from 'react-query';
import { ticketsService } from '../../../services/api';
import { invalidateTickets } from './useListTickets';
import { invalidateTicketsByRequester } from './useListTicketsByRequester';

export function useCreateTicket() {
	const queryClient = useQueryClient();

	return useMutation(ticketsService.addTicket, {
		onSuccess: () => {
			invalidateTickets(queryClient);
			invalidateTicketsByRequester(queryClient);
		},
	});
}
