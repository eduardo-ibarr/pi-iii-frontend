export interface ILogin {
  type_of_user: 'requester' | 'agent';
  email: string;
  password: string;
}
