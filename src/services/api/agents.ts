import { ICreateAgent } from '../../interfaces/create';
import { IUpdateAgent, IUpdateAgentPassword } from '../../interfaces/update';
import { IAgent } from '../../interfaces/modules';

import client from './instance';

export const addAgent = async (values: ICreateAgent): Promise<IAgent> => {
	const { data } = await client.post<IAgent>('/agents', values);
	return data;
};

export const showAgent = async (id: string): Promise<IAgent> => {
	const { data } = await client.get<IAgent>(`/agents/${id}`);
	return data;
};

export const listAgents = async (): Promise<IAgent[]> => {
	const { data } = await client.get<IAgent[]>('/agents');
	return data;
};

export const updateAgent = async (
	values: IUpdateAgent,
	id: string
): Promise<IAgent> => {
	const { data } = await client.put<IAgent>(`/agents/${id}`, values);
	return data;
};

export const updateAgentPassword = async (
	values: IUpdateAgentPassword,
	id: string
): Promise<void> => {
	await client.put(`/agents/${id}/password`, values);
};

export const deleteAgent = async (id: string): Promise<void> => {
	await client.delete<IAgent>(`/agents/${id}`);
};
