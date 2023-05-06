import { useMutation } from 'react-query';
import { agentTicketHistoriesService } from '../../../services/api';

export function useDeleteAgentTicketHistory() {
	return useMutation(agentTicketHistoriesService.deleteAgentTicketHistory);
}
