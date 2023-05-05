import { useMutation } from 'react-query';
import { categoriesService } from '../../../services/api';

export function useCreateCategory() {
  return useMutation(categoriesService.addCategory);
}
