import { ICreateAgentTicketHistory } from '../../interfaces/create';
import { IUpdateAgentTicketHistory } from '../../interfaces/update';
import { IAgentTicketHistory } from '../../interfaces/modules';

import client from './instance';

export const addAgentTicketHistory = async (
  values: ICreateAgentTicketHistory
): Promise<IAgentTicketHistory> => {
  const { data } = await client.post<IAgentTicketHistory>(
    '/agent-ticket-histories',
    values
  );
  return data;
};

export const showAgentTicketHistory = async (
  id: string
): Promise<IAgentTicketHistory> => {
  const { data } = await client.get<IAgentTicketHistory>(
    `/agent-ticket-histories/${id}`
  );
  return data;
};

export const listAgentTicketHistory = async (): Promise<
  IAgentTicketHistory[]
> => {
  const { data } = await client.get<IAgentTicketHistory[]>(
    '/agent-ticket-histories/'
  );
  return data;
};

export const updateAgentTicketHistory = async (
  values: IUpdateAgentTicketHistory,
  id: string
): Promise<IAgentTicketHistory> => {
  const { data } = await client.put<IAgentTicketHistory>(
    `/agent-ticket-histories/${id}`,
    values
  );
  return data;
};

export const deleteAgentTicketHistory = async (id: string): Promise<void> => {
  await client.delete<IAgentTicketHistory>(`/agent-ticket-histories/${id}`);
};
