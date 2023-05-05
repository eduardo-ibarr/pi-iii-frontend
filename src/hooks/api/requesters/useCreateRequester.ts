import { useMutation } from 'react-query';
import { requestersService } from '../../../services/api';

export function useCreateRequester() {
  return useMutation(requestersService.addRequester);
}
