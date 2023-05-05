import { useQuery } from 'react-query';
import { conversationsService } from '../../../services/api';

export function useListConversations() {
  return useQuery('listConversations', conversationsService.listConversations);
}
