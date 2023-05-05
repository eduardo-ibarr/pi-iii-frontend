import { useQuery } from 'react-query';
import { agentTicketHistoriesService } from '../../../services/api';

export function useListAgentTicketHistories() {
  return useQuery(
    'listAgentTicketHistory',
    agentTicketHistoriesService.listAgentTicketHistory
  );
}
