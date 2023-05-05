import { ICreateSector } from '../../interfaces/create';
import { IUpdateSector } from '../../interfaces/update';
import { ISector } from '../../interfaces/modules';

import client from './instance';

export const addSector = async (values: ICreateSector): Promise<ISector> => {
  const { data } = await client.post<ISector>('/sectors', values);
  return data;
};

export const showSector = async (id: string): Promise<ISector> => {
  const { data } = await client.get<ISector>(`/sectors/${id}`);
  return data;
};

export const listSectors = async (): Promise<ISector[]> => {
  const { data } = await client.get<ISector[]>('/sectors');
  return data;
};

export const updateSector = async (
  values: IUpdateSector,
  id: string
): Promise<ISector> => {
  const { data } = await client.put<ISector>(`/sectors/${id}`, values);
  return data;
};

export const deleteSector = async (id: string): Promise<void> => {
  await client.delete<ISector>(`/sectors/${id}`);
};
