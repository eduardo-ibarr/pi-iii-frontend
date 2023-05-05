import { useQuery } from 'react-query';
import { ticketsService } from '../../../services/api';

export function useShowTicket(id: string) {
  return useQuery('showTicket', () => ticketsService.showTicket(id));
}
