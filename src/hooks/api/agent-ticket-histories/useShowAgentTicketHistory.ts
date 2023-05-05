import { useQuery } from 'react-query';
import { agentTicketHistoriesService } from '../../../services/api';

export function useShowAgentTicketHistory(id: string) {
  return useQuery('showAgentTicketHistory', () =>
    agentTicketHistoriesService.showAgentTicketHistory(id)
  );
}
