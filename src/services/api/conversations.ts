import { ICreateConversation } from '../../interfaces/create';
import { IUpdateConversation } from '../../interfaces/update';
import { IConversation } from '../../interfaces/modules';

import client from './instance';

export const addConversation = async (
  values: ICreateConversation
): Promise<IConversation> => {
  const { data } = await client.post<IConversation>('/conversations', values);
  return data;
};

export const showConversation = async (id: string): Promise<IConversation> => {
  const { data } = await client.get<IConversation>(`/conversations/${id}`);
  return data;
};

export const listConversations = async (): Promise<IConversation[]> => {
  const { data } = await client.get<IConversation[]>('/conversations');
  return data;
};

export const updateConversation = async (
  values: IUpdateConversation,
  id: string
): Promise<IConversation> => {
  const { data } = await client.put<IConversation>(
    `/conversations/${id}`,
    values
  );
  return data;
};

export const deleteConversation = async (id: string): Promise<void> => {
  await client.delete<IConversation>(`/conversations/${id}`);
};
