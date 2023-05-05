import { useMutation } from 'react-query';
import { agentTicketHistoriesService } from '../../../services/api';

export function useCreateAgentTicketHistory() {
  return useMutation(agentTicketHistoriesService.addAgentTicketHistory);
}
