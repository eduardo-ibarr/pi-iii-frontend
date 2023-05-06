import { Form, Radio, Input, Button, Spin } from 'antd';
import form from 'antd/es/form';
import React from 'react';
import { ILogin } from '../../interfaces/modules';
import { useLogin } from '../../hooks/api/auth/useLogin';

export const LoginPage = () => {
	const [form] = Form.useForm();

	const { mutateAsync: login, isLoading, error } = useLogin();

	console.log(error);

	const onFinish = async ({ email, password, type_of_user }: ILogin) => {
		console.log({ email, password, type_of_user });

		try {
			const response = await login({ email, password, type_of_user });

			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Form form={form} onFinish={onFinish} style={{ maxWidth: '700px' }}>
			<Form.Item label="Selecione o tipo de usuário:" name="type_of_user">
				<Radio.Group>
					<Radio.Button value="agent">Agente de Suporte</Radio.Button>
					<Radio.Button value="requester">Requisitante</Radio.Button>
				</Radio.Group>
			</Form.Item>
			<Form.Item name="email" label="Informe o email:">
				<Input />
			</Form.Item>
			<Form.Item name="password" label="Informe a senha:">
				<Input.Password />
			</Form.Item>
			<Form.Item>
				<Button type="primary" htmlType="submit">
					{isLoading ? <Spin /> : 'Login'}
				</Button>
			</Form.Item>
		</Form>
	);
};
