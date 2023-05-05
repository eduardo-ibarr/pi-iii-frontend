import { ILogin } from '../../interfaces/modules';
import { IAuth } from '../../interfaces/modules/IAuth';

import client from './instance';

export const login = async (values: ILogin): Promise<IAuth> => {
  const { data } = await client.post<IAuth>('/api/login', values);
  return data;
};

export const logoff = async (id: string): Promise<void> => {
  await client.get('/api/logoff');
};
