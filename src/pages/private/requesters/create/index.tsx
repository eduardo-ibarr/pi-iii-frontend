import { Card, Input, Button, Form, Spin } from 'antd';
import React from 'react';
import { ICreateRequester } from '../../../../interfaces/create';
import { useCreateRequester } from '../../../../hooks/api/requesters';
import { openSuccessNotification } from '../../../../components';
import { handleError, passwordValidator } from '../../../../helpers';
import Title from 'antd/es/typography/Title';

export const CreateRequester = () => {
	const [form] = Form.useForm<ICreateRequester & { retypedPassword: string }>();

	const { mutateAsync: createRequester, isLoading } = useCreateRequester();

	const onFinish = async ({ name, email, password }: ICreateRequester) => {
		try {
			await createRequester({ name, email, password });
			openSuccessNotification('Requisitante criado com sucesso.');
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<Card bordered={false}>
			<Title level={3} style={{ marginBottom: '20px' }}>
				Cadastro de Requisitante
			</Title>
			<Form
				layout="vertical"
				form={form}
				onFinish={onFinish}
				style={{ width: '500px' }}
			>
				<Form.Item
					rules={[
						{ required: true, message: 'O nome do requisitante é obrigatório' },
					]}
					style={{ marginBottom: '30px' }}
					label="Digite o nome da categoria:"
					name="name"
				>
					<Input />
				</Form.Item>

				<Form.Item
					rules={[
						{
							required: true,
							message: 'O email do requisitante é obrigatório',
						},
						{ type: 'email', message: 'Por favor, insira um email válido' },
					]}
					style={{ marginBottom: '30px' }}
					name="email"
					label="Digite o email do requisitante:"
				>
					<Input />
				</Form.Item>

				<Form.Item
					rules={[
						{ required: true, message: 'A senha é obrigatória' },
						{
							validator: (rule, value, callback) => {
								if (passwordValidator(form.getFieldValue('password'))) {
									callback();
								} else {
									callback(
										'A senha deve ter no mínimo 8 caracteres, contendo letras e números.'
									);
								}
							},
						},
					]}
					name="password"
					label="Informe a senha:"
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					rules={[
						{ required: true, message: 'A repetição da senha é obrigatória' },
						{
							validator: (rule, value, callback) => {
								if (value === form.getFieldValue('password')) {
									callback();
								} else {
									callback('A senha deve ser igual a inserida anteriormente.');
								}
							},
						},
					]}
					name="retypedPassword"
					label="Digite novamente a senha:"
				>
					<Input.Password />
				</Form.Item>

				<Form.Item>
					<Button
						style={{ width: '30%', marginTop: '1rem' }}
						type="primary"
						htmlType="submit"
					>
						{isLoading ? <Spin style={{ color: 'white' }} /> : 'Cadastrar'}
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};
