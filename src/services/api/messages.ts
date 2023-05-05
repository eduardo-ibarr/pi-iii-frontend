import { ICreateMessage } from '../../interfaces/create';
import { IUpdateMessage } from '../../interfaces/update';
import { IMessage } from '../../interfaces/modules';

import client from './instance';

export const addMessage = async (values: ICreateMessage): Promise<IMessage> => {
  const { data } = await client.post<IMessage>('/messages', values);
  return data;
};

export const showMessage = async (id: string): Promise<IMessage> => {
  const { data } = await client.get<IMessage>(`/messages/${id}`);
  return data;
};

export const listMessages = async (): Promise<IMessage[]> => {
  const { data } = await client.get<IMessage[]>('/messages');
  return data;
};

export const updateMessage = async (
  values: IUpdateMessage,
  id: string
): Promise<IMessage> => {
  const { data } = await client.put<IMessage>(`/messages/${id}`, values);
  return data;
};

export const deleteMessage = async (id: string): Promise<void> => {
  await client.delete<IMessage>(`/messages/${id}`);
};
