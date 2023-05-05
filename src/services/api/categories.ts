import { ICreateCategory } from '../../interfaces/create';
import { IUpdateCategory } from '../../interfaces/update';
import { ICategory } from '../../interfaces/modules';

import client from './instance';

export const addCategory = async (
  values: ICreateCategory
): Promise<ICategory> => {
  const { data } = await client.post<ICategory>('/categories', values);
  return data;
};

export const showCategory = async (id: string): Promise<ICategory> => {
  const { data } = await client.get<ICategory>(`/categories/${id}`);
  return data;
};

export const listCategories = async (): Promise<ICategory[]> => {
  const { data } = await client.get<ICategory[]>('/categories');
  return data;
};

export const updateCategory = async (
  values: IUpdateCategory,
  id: string
): Promise<ICategory> => {
  const { data } = await client.put<ICategory>(`/categories/${id}`, values);
  return data;
};

export const deleteCategory = async (id: string): Promise<void> => {
  await client.delete<ICategory>(`/categories/${id}`);
};
