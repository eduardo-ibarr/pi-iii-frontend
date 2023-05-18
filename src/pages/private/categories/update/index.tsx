import { Card, Input, Button, Spin, Form } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { IUpdateCategory } from '../../../../interfaces/update';
import { LoadingSpin, openSuccessNotification } from '../../../../components';
import { handleError } from '../../../../helpers';
import Title from 'antd/es/typography/Title';
import {
	useShowCategory,
	useUpdateCategory,
} from '../../../../hooks/api/categories';

export const UpdateCategory = () => {
	const { id } = useParams();

	const { data: category, isLoading: isLoadingShow } = useShowCategory(
		id as string
	);
	const { mutateAsync: updateCategory, isLoading: isLoadingUpdate } =
		useUpdateCategory(id as string);

	const [form] = Form.useForm<IUpdateCategory>();

	if (isLoadingShow) {
		return <LoadingSpin />;
	}

	const onFinish = async ({ name }: IUpdateCategory) => {
		try {
			await updateCategory({ name });

			openSuccessNotification('Categoria atualizada com sucesso.');
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<Card bordered={false}>
			<Title level={3} style={{ marginBottom: '20px' }}>
				Atualização de Categoria
			</Title>
			<Form
				layout="vertical"
				form={form}
				onFinish={onFinish}
				style={{ width: '500px' }}
				initialValues={{
					name: category?.name,
				}}
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
