import { Card, Input, Switch, Button, Spin, Form, Checkbox } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useUpdateAgent } from '../../../../hooks/api/agents/useUpdateAgent';
import { IUpdateAgent } from '../../../../interfaces/update';
import { openSuccessNotification } from '../../../../components';
import { handleError } from '../../../../helpers';
import Title from 'antd/es/typography/Title';
import { useShowAgent } from '../../../../hooks/api/agents/useShowAgent';
import { compare, compareSync } from 'bcryptjs';

export const UpdateAgent = () => {
	const { id } = useParams();

	const { data: agent, isLoading: isLoadingShow } = useShowAgent(id as string);

	const [wantUpdatePassword, setWantUpdatePassword] = useState(false);

	const [form] = Form.useForm<
		IUpdateAgent & {
			retypedPassword: string;
			newPassword: string;
		}
	>();

	const { mutateAsync: updateAgent, isLoading: isLoadingUpdate } =
		useUpdateAgent(id as string);

	const onFinish = async ({
		available,
		email,
		name,
		newPassword,
	}: IUpdateAgent & {
		retypedPassword: string;
		newPassword: string;
	}) => {
		try {
			await updateAgent(
				newPassword
					? { available, email, name, password: newPassword }
					: { available, email, name }
			);
			openSuccessNotification('Agente cadastrado com sucesso.');
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<Card bordered={false}>
			<Title level={3} style={{ marginBottom: '20px' }}>
				Atualização de Agente
			</Title>
			<Form
				layout="vertical"
				form={form}
				onFinish={onFinish}
				style={{ width: '500px' }}
				initialValues={{
					name: agent?.name,
					email: agent?.email,
					available: agent?.available,
				}}
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
					<Switch checkedChildren="Online" unCheckedChildren="Offline" />
				</Form.Item>

				<Form.Item>
					<Checkbox onChange={(e) => setWantUpdatePassword(e.target.checked)}>
						Atualizar a senha
					</Checkbox>
				</Form.Item>

				<Form.Item
					rules={[
						{
							required: wantUpdatePassword,
							message: 'A nova senha é obrigatória',
						},
					]}
					name="newPassword"
					label="Informe a nova senha:"
				>
					<Input.Password disabled={!wantUpdatePassword} />
				</Form.Item>

				<Form.Item
					rules={[
						{
							required: wantUpdatePassword,
							message: 'A repetição da senha é obrigatória',
						},
						{
							validator: (rule, value, callback) => {
								if (value === form.getFieldValue('newPassword')) {
									callback();
								} else {
									callback(
										'A senha nova deve ser igual a inserida anteriormente.'
									);
								}
							},
						},
					]}
					name="retypedPassword"
					label="Digite novamente a nova senha:"
				>
					<Input.Password disabled={!wantUpdatePassword} />
				</Form.Item>

				<Form.Item>
					<Button
						style={{ width: '30%', marginTop: '1rem' }}
						type="primary"
						htmlType="submit"
					>
						{isLoadingUpdate ? (
							<Spin style={{ color: 'white' }} />
						) : (
							'Atualizar'
						)}
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};
