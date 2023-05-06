import { useMutation } from 'react-query';
import { agentTicketHistoriesService } from '../../../services/api';
import { IUpdateAgentTicketHistory } from '../../../interfaces/update';

export function useUpdateAgentTicketHistory(id: string) {
	return useMutation((values: IUpdateAgentTicketHistory) =>
		agentTicketHistoriesService.updateAgentTicketHistory(values, id)
	);
}
