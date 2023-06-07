import { Card, Input, Button, Spin, Form, Checkbox } from 'antd';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
	IUpdateRequester,
	IUpdateRequesterPassword,
} from '../../../../interfaces/update';
import { LoadingSpin, openSuccessNotification } from '../../../../components';
import {
	handleError,
	nameValidator,
	passwordValidator,
} from '../../../../helpers';
import Title from 'antd/es/typography/Title';
import {
	useShowRequester,
	useUpdateRequester,
	useUpdateRequesterPassword,
} from '../../../../hooks/api/requesters';

export const UpdateRequester = () => {
	const { id } = useParams();

	const [wantUpdatePassword, setWantUpdatePassword] = useState(false);

	const { data: requester, isLoading: isLoadingShow } = useShowRequester(
		id as string
	);
	const { mutateAsync: updateRequester, isLoading: isLoadingUpdateRequester } =
		useUpdateRequester(id as string);
	const { mutateAsync: updatePassword, isLoading: isLoadingUpdatePassword } =
		useUpdateRequesterPassword(id as string);

	const [form] = Form.useForm<IUpdateRequester & IUpdateRequesterPassword>();

	if (isLoadingShow) {
		return <LoadingSpin />;
	}

	const onFinish = async ({
		email,
		name,
		new_password,
		old_password,
	}: IUpdateRequester & IUpdateRequesterPassword) => {
		try {
			if (wantUpdatePassword) {
				await updatePassword({ new_password, old_password });
			}

			await updateRequester({ email, name });

			openSuccessNotification('Requisitante atualizado com sucesso.');
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<Card bordered={false}>
			<Title level={4} style={{ marginBottom: '20px' }}>
				Atualização de dados
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
					label="Nome:"
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
					label="Email:"
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
							message: 'A senha atual é obrigatória',
						},
					]}
					name="old_password"
					label="Informe a senha atual:"
				>
					<Input.Password disabled={!wantUpdatePassword} />
				</Form.Item>

				<Form.Item
					rules={[
						{
							required: wantUpdatePassword,
							message: 'A nova senha é obrigatória',
						},
						{
							validator: (rule, value, callback) => {
								if (wantUpdatePassword && !passwordValidator(value)) {
									callback(
										'A nova senha deve ter no mínimo 8 caracteres, contendo letras e números.'
									);
								} else {
									callback();
								}
							},
						},
					]}
					name="new_password"
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
								if (value === form.getFieldValue('new_password')) {
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
						{isLoadingUpdateRequester || isLoadingUpdatePassword ? (
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
