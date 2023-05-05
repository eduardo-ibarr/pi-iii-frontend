import { useQuery } from 'react-query';
import { agentsService } from '../../../services/api';

export function useListAgents() {
  return useQuery('listAgents', agentsService.listAgents);
}
