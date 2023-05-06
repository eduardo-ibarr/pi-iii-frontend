import { useQuery } from 'react-query';
import { agentsService } from '../../../services/api';

export function useShowAgent(id: string) {
	return useQuery('showAgent', () => agentsService.showAgent(id));
}
