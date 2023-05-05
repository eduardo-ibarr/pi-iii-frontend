import { useMutation } from 'react-query';
import { conversationsService } from '../../../services/api';
import { IUpdateConversation } from '../../../interfaces/update';

export function useUpdateConversation(id: string) {
  return useMutation((values: IUpdateConversation) =>
    conversationsService.updateConversation(values, id)
  );
}
