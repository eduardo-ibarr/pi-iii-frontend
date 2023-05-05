import { useQuery } from 'react-query';
import { messagesService } from '../../../services/api';

export function useListMessages() {
  return useQuery('listMessages', messagesService.listMessages);
}
