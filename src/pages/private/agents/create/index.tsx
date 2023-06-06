import { Card, Input, Button, Form, Spin, Switch } from 'antd';
import React from 'react';
import { ICreateAgent } from '../../../../interfaces/create';
import { useCreateAgent } from '../../../../hooks/api/agents';
import { openSuccessNotification } from '../../../../components';
import {
	handleError,
	nameValidator,
	passwordValidator,
} from '../../../../helpers';
import Title from 'antd/es/typography/Title';

export const CreateAgent = () => {
	const [form] = Form.useForm<ICreateAgent>();

	const { mutateAsync: createAgent, isLoading } = useCreateAgent();

	const onFinish = async ({
		available,
		email,
		name,
		password,
	}: ICreateAgent) => {
		try {
			await createAgent({ available, email, name, password });
			openSuccessNotification('Agente cadastrado com sucesso.');
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<Card bordered={false}>
			<Title level={3} style={{ marginBottom: '20px' }}>
				Cadastro de Agente
			</Title>
			<Form
				layout="vertical"
				form={form}
				onFinish={onFinish}
				style={{ width: '500px' }}
				initialValues={{
					available: true,
				}}
			>
				<Form.Item
					rules={[
						{ required: true, message: 'O nome do agente é obrigatório' },
						{
							validator: (rule, value, callback) => {
								if (nameValidator(form.getFieldValue('name'))) {
									callback();
								} else {
									callback(
										'O nome deve ser completo, contendo apenas letras, sem haver repetições.'
									);
								}
							},
						},
					]}
					style={{ marginBottom: '30px' }}
					label="Digite o nome completo do agente:"
					name="name"
				>
					<Input />
				</Form.Item>
				<Form.Item
					rules={[
						{ required: true, message: 'O email do agente é obrigatório' },
						{ type: 'email', message: 'Por favor, insira um email válido' },
					]}
					style={{ marginBottom: '30px' }}
					name="email"
					label="Digite o email do agente:"
				>
					<Input />
				</Form.Item>
				<Form.Item
					style={{ marginBottom: '30px' }}
					rules={[
						{
							required: true,
							message: 'A disponibilidade do agente é obrigatória',
						},
					]}
					name="available"
					label="Disponibilidade atual do agente:"
				>
					<Switch
						checkedChildren="Online"
						defaultChecked
						unCheckedChildren="Offline"
					/>
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
