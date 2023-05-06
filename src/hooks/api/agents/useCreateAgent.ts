import { useMutation } from 'react-query';
import { agentsService } from '../../../services/api';

export function useCreateAgent() {
	return useMutation(agentsService.addAgent);
}
