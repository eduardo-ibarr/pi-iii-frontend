import { useMutation, useQueryClient } from 'react-query';
import { ticketsService } from '../../../services/api';
import { invalidateTickets } from './useListTickets';
import { invalidateTicketsByRequester } from './useListTicketsByRequester';

export function useDeleteTicket() {
	const queryClient = useQueryClient();

	return useMutation(ticketsService.deleteTicket, {
		onSuccess: () => {
			invalidateTickets(queryClient);
			invalidateTicketsByRequester(queryClient);
		},
	});
}
