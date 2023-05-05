import { ICreateTicket } from '../../interfaces/create';
import { IUpdateTicket } from '../../interfaces/update';
import { ITicket } from '../../interfaces/modules';

import client from './instance';

export const addTicket = async (values: ICreateTicket): Promise<ITicket> => {
  const { data } = await client.post<ITicket>('/tickets', values);
  return data;
};

export const showTicket = async (id: string): Promise<ITicket> => {
  const { data } = await client.get<ITicket>(`/tickets/${id}`);
  return data;
};

export const listTickets = async (): Promise<ITicket[]> => {
  const { data } = await client.get<ITicket[]>('/tickets');
  return data;
};

export const updateTicket = async (
  values: IUpdateTicket,
  id: string
): Promise<ITicket> => {
  const { data } = await client.put<ITicket>(`/tickets/${id}`, values);
  return data;
};

export const deleteTicket = async (id: string): Promise<void> => {
  await client.delete<ITicket>(`/tickets/${id}`);
};
