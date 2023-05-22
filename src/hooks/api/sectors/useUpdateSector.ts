import { useMutation, useQueryClient } from 'react-query';
import { sectorsService } from '../../../services/api';
import { IUpdateSector } from '../../../interfaces/update';
import { invalidateAgents } from '../agents/useListAgents';
import { invalidateAgent } from '../agents/useShowAgent';

export function useUpdateSector(id: string) {
	const queryClient = useQueryClient();

	return useMutation(
		(values: IUpdateSector) => sectorsService.updateSector(values, id),
		{
			onSuccess: () => {
				invalidateAgent(queryClient, id);
				invalidateAgents(queryClient);
			},
		}
	);
}
