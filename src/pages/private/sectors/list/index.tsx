import { Button, Modal, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useState } from 'react';
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons';
import { ISector } from '../../../../interfaces/modules';
import { useNavigate } from 'react-router';
import { LoadingSpin } from '../../../../components/LoadingSpin';
import Typography from 'antd/es/typography/Typography';
import { handleError } from '../../../../helpers/handleError';
import { Link } from 'react-router-dom';
import { openSuccessNotification } from '../../../../components';
import { useListSectors, useDeleteSector } from '../../../../hooks/api/sectors';
import { sortByName } from '../../../../helpers';

interface DataType {
	key: React.Key;
	name: string;
	createdAt: string;
	moreInfo: string;
}

export const ListSectors = () => {
	const history = useNavigate();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [idSectorToDelete, setIdSectorToDelete] = useState('');

	const { data: sectors, isLoading: isLoadingList } = useListSectors();
	const { mutateAsync: deleteSector } = useDeleteSector();

	const handleShowMoreInfo = (id: string) => {
		history(`/app/setores/${id}`);
	};

	const showModal = (id: string) => {
		setIdSectorToDelete(id);
		setIsModalOpen(true);
	};

	const columns: ColumnsType<DataType> = [
		{
			title: 'Nome',
			dataIndex: 'name',
		},
		{
			title: 'Criada em',
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

	const data: DataType[] = (sectors as ISector[]).map((sector, i) => ({
		key: i,
		name: sector.name,
		createdAt: new Date(sector.created_at).toLocaleString('pt-BR'),
		moreInfo: sector.id,
	}));

	const dataSorted = sortByName(data);

	const handleOk = async () => {
		try {
			await deleteSector(idSectorToDelete);

			openSuccessNotification('Setor excluído com sucesso.');
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
				<Link to="/app/setores/novo">
					<Button type="primary" style={{ marginBottom: '20px' }}>
						Criar novo setor
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
					Tem certeza que deseja excluir definitivamente esse setor?
				</Typography>
			</Modal>
		</>
	);
};
