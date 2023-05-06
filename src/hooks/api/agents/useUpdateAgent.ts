import { useMutation } from 'react-query';
import { agentsService } from '../../../services/api';
import { IUpdateAgent } from '../../../interfaces/update';

export function useUpdateAgent(id: string) {
	return useMutation((values: IUpdateAgent) =>
		agentsService.updateAgent(values, id)
	);
}
