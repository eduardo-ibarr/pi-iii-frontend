import { useMutation } from 'react-query';
import { ticketsService } from '../../../services/api';

export function useDeleteTicket() {
	return useMutation(ticketsService.deleteTicket);
}
