import { useMutation } from 'react-query';
import { conversationsService } from '../../../services/api';

export function useCreateConversation() {
  return useMutation(conversationsService.addConversation);
}
