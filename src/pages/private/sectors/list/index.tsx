/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import { Button, Input, Modal, Table, Tooltip } from 'antd';
import { ColumnsType } from 'antd/es/table';
import React, { useMemo, useState } from 'react';
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

	const [filterValue, setFilterValue] = useState('');

	const sectorsFiltered = useMemo(() => {
		if (filterValue.length > 0 && sectors) {
			return sectors.filter((sector) =>
				sector.name.toLowerCase().includes(filterValue.toLowerCase())
			);
		}

		return [];
	}, [filterValue]);

	if (isLoadingList) {
		return <LoadingSpin />;
	}

	const data: DataType[] =
		sectorsFiltered.length > 0
			? sectorsFiltered.map((sector, i) => ({
					key: i,
					name: sector.name,
					createdAt: new Date(sector.created_at).toLocaleString('pt-BR'),
					moreInfo: sector.id,
			  }))
			: filterValue && sectorsFiltered.length === 0
			? []
			: (sectors as ISector[]).map((sector, i) => ({
					key: i,
					name: sector.name,
					createdAt: new Date(sector.created_at).toLocaleString('pt-BR'),
					moreInfo: sector.id,
			  }));

	const handleShowMoreInfo = (id: string) => {
		history(`/app/admin/setores/${id}`);
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

	const handleChangeFilterValue = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setFilterValue(event.target.value);
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
					<Input
						onChange={handleChangeFilterValue}
						style={{ width: '300px', height: '32px' }}
						placeholder="Buscar por nome..."
					/>
				</div>

				<Link to="/app/admin/setores/novo">
					<Button type="primary">Criar novo setor</Button>
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
