import { Button, Modal, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
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

export const ListRequesters = () => {
	const history = useNavigate();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [idRequesterToDelete, setIdRequesterToDelete] = useState('');

	const { data: requesters, isLoading: isLoadingList } = useListRequesters();
	const { mutateAsync: deleteRequester } = useDeleteRequester();

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

	const data: DataType[] = (requesters as IRequester[]).map((requester, i) => ({
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

	return (
		<>
			<div style={{ textAlign: 'right', marginRight: '10px' }}>
				<Link to="/app/admin/requisitantes/novo">
					<Button type="primary" style={{ marginBottom: '20px' }}>
						Criar novo requisitante
					</Button>
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
