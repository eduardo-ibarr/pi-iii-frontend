import { ICreateRequester } from '../../interfaces/create';
import {
	IUpdateRequester,
	IUpdateRequesterPassword,
} from '../../interfaces/update';
import { IRequester } from '../../interfaces/modules';

import client from './instance';

export const addRequester = async (
	values: ICreateRequester
): Promise<IRequester> => {
	const { data } = await client.post<IRequester>('/requesters', values);
	return data;
};

export const showRequester = async (id: string): Promise<IRequester> => {
	const { data } = await client.get<IRequester>(`/requesters/${id}`);
	return data;
};

export const listRequesters = async (): Promise<IRequester[]> => {
	const { data } = await client.get<IRequester[]>('/requesters');
	return data;
};

export const updateRequester = async (
	values: IUpdateRequester,
	id: string
): Promise<IRequester> => {
	const { data } = await client.put<IRequester>(`/requesters/${id}`, values);
	return data;
};

export const updateRequesterPassword = async (
	values: IUpdateRequesterPassword,
	id: string
): Promise<void> => {
	await client.put(`/requesters/${id}/password`, values);
};

export const deleteRequester = async (id: string): Promise<void> => {
	await client.delete(`/requesters/${id}`);
};
