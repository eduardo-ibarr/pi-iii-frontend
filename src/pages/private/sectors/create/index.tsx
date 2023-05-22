import { Card, Input, Button, Form, Spin } from 'antd';
import React from 'react';
import { ICreateSector } from '../../../../interfaces/create';
import { useCreateSector } from '../../../../hooks/api/sectors';
import { openSuccessNotification } from '../../../../components';
import { handleError } from '../../../../helpers';
import Title from 'antd/es/typography/Title';

export const CreateSector = () => {
	const [form] = Form.useForm<ICreateSector>();

	const { mutateAsync: createSector, isLoading } = useCreateSector();

	const onFinish = async ({ name }: ICreateSector) => {
		try {
			await createSector({ name });
			openSuccessNotification('Setor criado com sucesso.');
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<Card bordered={false}>
			<Title level={3} style={{ marginBottom: '20px' }}>
				Cadastro de Setor
			</Title>
			<Form
				layout="vertical"
				form={form}
				onFinish={onFinish}
				style={{ width: '500px' }}
			>
				<Form.Item
					rules={[{ required: true, message: 'O nome do setor é obrigatório' }]}
					style={{ marginBottom: '30px' }}
					label="Digite o nome do setor:"
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
