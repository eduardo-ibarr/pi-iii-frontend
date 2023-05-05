import { useMutation } from 'react-query';
import { requestersService } from '../../../services/api';
import { IUpdateRequester } from '../../../interfaces/update';

export function useUpdateRequester(id: string) {
  return useMutation((values: IUpdateRequester) =>
    requestersService.updateRequester(values, id)
  );
}
