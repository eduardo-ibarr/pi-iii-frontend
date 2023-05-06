import { useMutation } from 'react-query';
import { ticketsService } from '../../../services/api';

export function useCreateTicket() {
	return useMutation(ticketsService.addTicket);
}
