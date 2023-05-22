import { Card, Input, Button, Spin, Form } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';
import { IUpdateSector } from '../../../../interfaces/update';
import { LoadingSpin, openSuccessNotification } from '../../../../components';
import { handleError } from '../../../../helpers';
import Title from 'antd/es/typography/Title';
import { useShowSector, useUpdateSector } from '../../../../hooks/api/sectors';

export const UpdateSector = () => {
	const { id } = useParams();

	const { data: sector, isLoading: isLoadingShow } = useShowSector(
		id as string
	);
	const { mutateAsync: updateSector, isLoading: isLoadingUpdate } =
		useUpdateSector(id as string);

	const [form] = Form.useForm<IUpdateSector>();

	if (isLoadingShow) {
		return <LoadingSpin />;
	}

	const onFinish = async ({ name }: IUpdateSector) => {
		try {
			await updateSector({ name });

			openSuccessNotification('Setor atualizado com sucesso.');
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<Card bordered={false}>
			<Title level={3} style={{ marginBottom: '20px' }}>
				Atualização de Setor
			</Title>
			<Form
				layout="vertical"
				form={form}
				onFinish={onFinish}
				style={{ width: '500px' }}
				initialValues={{
					name: sector?.name,
				}}
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
