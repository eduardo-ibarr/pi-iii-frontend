import { Card, Input, Button, Spin, Form, Checkbox } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUpdateRequester } from '../../../../interfaces/update';
import { LoadingSpin, openSuccessNotification } from '../../../../components';
import { handleError } from '../../../../helpers';
import Title from 'antd/es/typography/Title';
import {
	useShowRequester,
	useUpdateRequester,
} from '../../../../hooks/api/requesters';

export const UpdateRequester = () => {
	const { id } = useParams();

	const [wantUpdatePassword, setWantUpdatePassword] = useState(false);

	const { data: requester, isLoading: isLoadingShow } = useShowRequester(
		id as string
	);
	const { mutateAsync: updateRequester, isLoading: isLoadingUpdate } =
		useUpdateRequester(id as string);

	const [form] = Form.useForm<IUpdateRequester>();

	if (isLoadingShow) {
		return <LoadingSpin />;
	}

	const onFinish = async ({ name, email, password }: IUpdateRequester) => {
		try {
			await updateRequester(
				password ? { email, name, password } : { email, name }
			);
			openSuccessNotification('Requisitante atualizado com sucesso.');
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<Card bordered={false}>
			<Title level={3} style={{ marginBottom: '20px' }}>
				Atualização de Requisitante
			</Title>
			<Form
				layout="vertical"
				form={form}
				onFinish={onFinish}
				style={{ width: '500px' }}
				initialValues={{
					name: requester?.name,
					email: requester?.email,
				}}
			>
				<Form.Item
					rules={[
						{ required: true, message: 'O nome do requisitante é obrigatório' },
					]}
					style={{ marginBottom: '30px' }}
					label="Digite o nome do requisitante:"
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
					name="password"
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
								if (value === form.getFieldValue('password')) {
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
					<Button style={{ width: '30%' }} type="primary" htmlType="submit">
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
