import { Card, Input, Button, Spin, Form, Select } from 'antd';
import Title from 'antd/es/typography/Title';
import React from 'react';
import { ICreateTicket } from '../../../../../interfaces/create';
import { handleError } from '../../../../../helpers';
import { useListCategories } from '../../../../../hooks/api/categories';
import { useListSectors } from '../../../../../hooks/api/sectors';
import TextArea from 'antd/es/input/TextArea';
import {
	LoadingSpin,
	openSuccessNotification,
} from '../../../../../components';
import { useCreateTicket } from '../../../../../hooks/api/tickets/useCreateTicket';
import useAppContext from '../../../../../hooks/app/useAppContext';

interface ISelectOption {
	value: string;
	label: string;
}

export const CreateTicket = () => {
	const [form] = Form.useForm<ICreateTicket>();

	const { userId } = useAppContext();

	const { data: categories, isLoading: isLoadingCategories } =
		useListCategories();

	const { data: sectors, isLoading: isLoadingSectors } = useListSectors();

	const { mutateAsync: createTicket, isLoading: isLoadingCreation } =
		useCreateTicket();

	let categoriesForSelect: ISelectOption[] = [];
	let sectorsForSelect: ISelectOption[] = [];

	if (isLoadingCategories || isLoadingSectors) {
		return <LoadingSpin />;
	}

	if (sectors && categories) {
		categoriesForSelect = categories.map((category) => ({
			label: category.name,
			value: category.id,
		}));

		sectorsForSelect = sectors.map((sector) => ({
			label: sector.name,
			value: sector.id,
		}));
	}

	const onFinish = async ({
		category_id,
		sector_id,
		content,
		subject,
	}: ICreateTicket) => {
		try {
			await createTicket({
				category_id,
				content,
				sector_id,
				requester_id: userId || '',
				status: 'not viewed',
				subject,
			});

			openSuccessNotification(
				'Solicitação criada com sucesso, acompanhe-a em "Tickets" no menu lateral.'
			);
		} catch (error) {
			handleError(error);
		}
	};

	return (
		<Card bordered={false}>
			<Title level={3} style={{ marginBottom: '20px' }}>
				Solicite um Atendimento de Suporte
			</Title>
			<Form
				layout="vertical"
				form={form}
				onFinish={onFinish}
				style={{ width: '500px' }}
			>
				<Form.Item
					rules={[{ required: true, message: 'A categoria é obrigatória' }]}
					style={{ marginBottom: '30px' }}
					name="category_id"
					label="Sobre qual categoria você precisa de ajuda?"
				>
					<Select style={{ width: 120 }} options={categoriesForSelect} />
				</Form.Item>

				<Form.Item
					rules={[{ required: true, message: 'O setor é obrigatório' }]}
					style={{ marginBottom: '30px' }}
					name="sector_id"
					label="Selecione o seu setor:"
				>
					<Select style={{ width: 120 }} options={sectorsForSelect} />
				</Form.Item>

				<Form.Item
					rules={[
						{ required: true, message: 'O assunto/título é obrigatório' },
					]}
					style={{ marginBottom: '30px' }}
					label="Insira o assunto/título da sua solicitação:"
					name="subject"
				>
					<Input />
				</Form.Item>

				<Form.Item
					rules={[
						{
							required: true,
							message: 'A descrição da solicitação é obrigatória',
						},
					]}
					name="content"
					label="Fale mais sobre a sua solicitação:"
				>
					<TextArea rows={4} />
				</Form.Item>

				<Form.Item>
					<Button
						style={{ width: '30%', marginTop: '1rem' }}
						type="primary"
						htmlType="submit"
					>
						{isLoadingCreation ? (
							<Spin style={{ color: 'white' }} />
						) : (
							'Enviar solicitação'
						)}
					</Button>
				</Form.Item>
			</Form>
		</Card>
	);
};
