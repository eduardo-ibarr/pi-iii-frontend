import { Card, Input, Button, Form, Spin } from 'antd';
import React from 'react';
import { ICreateCategory } from '../../../../interfaces/create';
import { useCreateCategory } from '../../../../hooks/api/categories';
import { openSuccessNotification } from '../../../../components';
import { handleError } from '../../../../helpers';
import Title from 'antd/es/typography/Title';

export const CreateCategory = () => {
	const [form] = Form.useForm<ICreateCategory & { retypedPassword: string }>();

	const { mutateAsync: createCategory, isLoading } = useCreateCategory();

	const onFinish = async ({
		name,
	}: ICreateCategory & { retypedPassword: string }) => {
		try {
			await createCategory({ name });
			openSuccessNotification('Categoria criada com sucesso.');
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<Card bordered={false}>
			<Title level={3} style={{ marginBottom: '20px' }}>
				Cadastro de Categoria
			</Title>
			<Form
				layout="vertical"
				form={form}
				onFinish={onFinish}
				style={{ width: '500px' }}
			>
				<Form.Item
					rules={[
						{ required: true, message: 'O nome da categoria é obrigatório' },
					]}
					style={{ marginBottom: '30px' }}
					label="Digite o nome da categoria:"
					name="name"
				>
					<Input />
				</Form.Item>

				<Form.Item>
					<Button style={{ width: '30%' }} type="primary" htmlType="submit">
						{isLoading ? <Spin style={{ color: 'white' }} /> : 'Cadastrar'}
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};
