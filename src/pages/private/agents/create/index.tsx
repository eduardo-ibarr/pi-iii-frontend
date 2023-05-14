import { Card, Input, Button, Form, Spin, Switch } from 'antd';
import React from 'react';
import { ICreateAgent } from '../../../../interfaces/create';
import { useCreateAgent } from '../../../../hooks/api/agents/useCreateAgent';
import { openSuccessNotification } from '../../../../components';
import { handleError } from '../../../../helpers';
import Title from 'antd/es/typography/Title';

export const CreateAgent = () => {
	const [form] = Form.useForm<ICreateAgent & { retypedPassword: string }>();

	const { mutateAsync: createAgent, isLoading } = useCreateAgent();

	const onFinish = async ({
		available,
		email,
		name,
		password,
	}: ICreateAgent & { retypedPassword: string }) => {
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
			>
				<Form.Item
					rules={[
						{ required: true, message: 'O nome do agente é obrigatório' },
					]}
					style={{ marginBottom: '30px' }}
					label="Digite o nome do agente:"
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
					rules={[
						{ required: true, message: 'O email do agente é obrigatório' },
					]}
					style={{ marginBottom: '30px' }}
					name="available"
					label="Disponibilidade atual do agente:"
				>
					<Switch
						checkedChildren="Online"
						unCheckedChildren="Offline"
						defaultChecked
					/>
				</Form.Item>
				<Form.Item
					rules={[{ required: true, message: 'A senha é obrigatória' }]}
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
