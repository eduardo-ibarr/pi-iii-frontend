import { useQuery } from 'react-query';
import { ticketsService } from '../../../services/api';

export function useListTickets() {
	return useQuery('listTickets', ticketsService.listTickets);
}
