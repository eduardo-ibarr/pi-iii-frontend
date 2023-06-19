/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import { Button, Input, Modal, Select, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useMemo, useState } from 'react';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { IRequester } from '../../../../interfaces/modules';
import { useNavigate } from 'react-router';
import { LoadingSpin } from '../../../../components/LoadingSpin';
import Typography from 'antd/es/typography/Typography';
import { handleError } from '../../../../helpers/handleError';
import { Link } from 'react-router-dom';
import { openSuccessNotification } from '../../../../components';
import {
	useListRequesters,
	useDeleteRequester,
} from '../../../../hooks/api/requesters';
import { sortByName } from '../../../../helpers';

interface DataType {
	key: React.Key;
	name: string;
	email: string;
	createdAt: string;
	moreInfo: string;
}

const filterOptions = [
	{ value: 'name', label: 'Nome' },
	{ value: 'email', label: 'Email' },
];

type TFilterOptions = 'email' | 'name';

type TFilterData = {
	type: TFilterOptions;
	value: string;
};

export const ListRequesters = () => {
	const history = useNavigate();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [idRequesterToDelete, setIdRequesterToDelete] = useState('');
	const [filterData, setFilterData] = useState<TFilterData>({
		type: 'name',
		value: '',
	});

	const { data: requesters, isLoading: isLoadingList } = useListRequesters();
	const { mutateAsync: deleteRequester } = useDeleteRequester();

	const requestersFiltered = useMemo(() => {
		if (filterData.value.length > 0 && requesters) {
			const filterFunctions = {
				name: () => {
					return requesters.filter((requester) =>
						requester.name
							.toLowerCase()
							.includes(filterData.value.toLowerCase())
					);
				},
				email: () => {
					return requesters.filter((requester) =>
						requester.email
							.toLowerCase()
							.includes(filterData.value.toLowerCase())
					);
				},
			};

			return filterFunctions[filterData.type]();
		}

		return [];
	}, [filterData]);

	const handleShowMoreInfo = (id: string) => {
		history(`/app/admin/requisitantes/${id}`);
	};

	const showModal = (id: string) => {
		setIdRequesterToDelete(id);
		setIsModalOpen(true);
	};

	const columns: ColumnsType<DataType> = [
		{
			title: 'Nome',
			dataIndex: 'name',
		},
		{
			title: 'Email',
			dataIndex: 'email',
		},
		{
			title: 'Criado em',
			dataIndex: 'createdAt',
		},
		{
			title: 'Ações',
			align: 'center',
			dataIndex: 'moreInfo',
			render: (id) => ({
				children: (
					<>
						<Tooltip title="Mais informações">
							<Button
								type="primary"
								style={{ marginRight: '10px' }}
								shape="circle"
								onClick={() => handleShowMoreInfo(id)}
								icon={<SearchOutlined />}
							/>
						</Tooltip>
						<Tooltip title="Excluir">
							<Button
								type="primary"
								danger
								shape="circle"
								onClick={() => showModal(id)}
								icon={<DeleteOutlined />}
							/>
						</Tooltip>
					</>
				),
			}),
		},
	];

	if (isLoadingList) {
		return <LoadingSpin />;
	}

	const data: DataType[] =
		requestersFiltered.length > 0
			? requestersFiltered.map((requester, i) => ({
					key: i,
					name: requester.name,
					email: requester.email,
					createdAt: new Date(requester.created_at).toLocaleString('pt-BR'),
					moreInfo: requester.id,
			  }))
			: filterData.value && requestersFiltered.length === 0
			? []
			: (requesters as IRequester[]).map((requester, i) => ({
					key: i,
					name: requester.name,
					email: requester.email,
					createdAt: new Date(requester.created_at).toLocaleString('pt-BR'),
					moreInfo: requester.id,
			  }));

	const dataSorted = sortByName(data);

	const handleOk = async () => {
		try {
			await deleteRequester(idRequesterToDelete);

			openSuccessNotification('Requisitante excluído com sucesso.');
		} catch (error) {
			handleError(error);
		}

		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const handleChangeFilterType = (type: TFilterOptions) => {
		setFilterData(() => ({ value: '', type }));
	};

	const handleChangeFilterValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setFilterData((previous) => ({ ...previous, value: event.target.value }));
	};

	return (
		<>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					marginRight: '10px',
					marginBottom: '20px',
				}}
			>
				<div
					style={{
						display: 'flex',
						gap: '15px',
						alignItems: 'center',
						marginLeft: '5px',
					}}
				>
					<Typography>Buscar por</Typography>

					<Select
						defaultValue="name"
						onChange={handleChangeFilterType}
						style={{ width: '100px' }}
						options={filterOptions}
					/>

					<Input
						onChange={handleChangeFilterValue}
						style={{ width: '300px', height: '32px' }}
						placeholder={`Digite aqui o ${
							filterData.type === 'email' ? 'email' : 'nome'
						} para a busca...`}
					/>
				</div>

				<Link to="/app/admin/requisitantes/novo">
					<Button type="primary">Criar novo requisitante</Button>
				</Link>
			</div>

			<Table
				columns={columns}
				dataSource={dataSorted}
				pagination={{
					pageSize: 5,
				}}
			/>

			<Modal
				title="Cuidado!"
				open={isModalOpen}
				centered
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Typography>
					Tem certeza que deseja excluir definitivamente esse requisitante?
				</Typography>
			</Modal>
		</>
	);
};
