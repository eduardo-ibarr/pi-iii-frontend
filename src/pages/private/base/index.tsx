/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable indent */
import {
	Layout,
	Menu,
	Breadcrumb,
	theme,
	Button,
	Modal,
	Typography,
	Spin,
} from 'antd';
import React, { useState, useEffect } from 'react';

import {
	DesktopOutlined,
	UserOutlined,
	LogoutOutlined,
	ToolOutlined,
} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { ParentPage } from '../../../interfaces/parentPage';
import { useNavigate } from 'react-router';
import { useLogoff } from '../../../hooks/api/auth/useLogoff';
import { openErrorNotification } from '../../../components';
import { translate } from '../../../helpers/translate';
import { AxiosError } from 'axios';
import { IRequestError } from '../../../interfaces/requestError';
import useAppContext from '../../../hooks/app/useAppContext';
import { useTurnAvailability } from '../../../hooks/api/agents/useTurnAvailability';

import { BsFillTicketDetailedFill } from 'react-icons/bs';

const { Header, Content, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
	label: React.ReactNode,
	key: React.Key,
	icon?: React.ReactNode,
	children?: MenuItem[]
): MenuItem {
	return {
		key,
		icon,
		children,
		label,
	} as MenuItem;
}

export const PrivateBase = ({ children }: ParentPage) => {
	const [collapsed, setCollapsed] = useState(false);
	const [items, setItems] = useState<MenuItem[]>([]);
	const navigate = useNavigate();

	const { mutateAsync: logoff, isLoading: isLoadingLogoff } = useLogoff();
	const { mutateAsync: turnAvailability, isLoading: isLoadingUpdate } =
		useTurnAvailability();

	const { handleLogoff, userEmail, typeOfUser, userId } = useAppContext();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		try {
			if (typeOfUser === 'agent') {
				await turnAvailability({ email: userEmail || '', available: false });
			}

			await logoff();

			handleLogoff();
		} catch (error) {
			if (error instanceof AxiosError) {
				const errorObj: IRequestError = error?.response?.data;
				openErrorNotification(
					translate({ message: errorObj.message, type: 'error' })
				);
				console.error(errorObj);
			}
		}

		setIsModalOpen(false);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const breadcrumbItems = window.location.pathname
		.split('/')
		.filter((item) => item !== 'app');

	const handleNavigate = (event: any) => {
		const menuItem = items.find((i) => i?.key === event.key) as MenuItem & {
			label: string;
		};

		let path =
			typeOfUser === 'admin'
				? `/app/admin/${menuItem.label.toLocaleLowerCase()}`
				: `/app/${menuItem.label.toLocaleLowerCase()}`;

		switch (menuItem.label) {
			case 'Tickets': {
				if (typeOfUser === 'agent') {
					path = '/app/agentes/tickets';
				}

				if (typeOfUser === 'requester') {
					path = '/app/requisitantes/tickets';
				}

				break;
			}
			case 'Minha Conta': {
				if (typeOfUser === 'agent') {
					path = `/app/agentes/${userId}`;
				}

				if (typeOfUser === 'requester') {
					path = `/app/requisitantes/${userId}`;
				}

				break;
			}
			default:
				break;
		}

		navigate(path);
	};

	useEffect(() => {
		if (typeOfUser === 'agent') {
			setItems(() => [
				getItem('Minha Conta', '1', <UserOutlined />),
				getItem('Tickets', '3', <BsFillTicketDetailedFill />),
			]);
		}

		if (typeOfUser === 'requester') {
			setItems(() => [
				getItem('Minha Conta', '1', <UserOutlined />),
				getItem('Tickets', '2', <BsFillTicketDetailedFill />),
			]);
		}

		if (typeOfUser === 'admin') {
			setItems(() => [
				getItem('Agentes', '1', <UserOutlined />),
				getItem('Requisitantes', '2', <UserOutlined />),
				getItem('Categorias', '3', <ToolOutlined />),
				getItem('Setores', '4', <DesktopOutlined />),
				getItem('Tickets', '5', <BsFillTicketDetailedFill />),
			]);
		}
	}, [typeOfUser]);

	return (
		<>
			<Layout style={{ minHeight: '100vh' }}>
				<Sider
					collapsible
					collapsed={collapsed}
					onCollapse={(value) => setCollapsed(value)}
				>
					<div
						style={{
							height: 32,
							margin: 16,
							borderRadius: '5px',
							background: 'rgba(255, 255, 255, 0.2)',
						}}
					>
						{typeOfUser === 'admin' && (
							<Typography
								style={{
									color: 'white',
									marginLeft: '2.5rem',
									paddingTop: '5px',
								}}
							>
								Administrador
							</Typography>
						)}

						{typeOfUser === 'agent' && (
							<Typography
								style={{
									color: 'white',
									marginLeft: '3.8rem',
									paddingTop: '5px',
								}}
							>
								Agente
							</Typography>
						)}

						{typeOfUser === 'requester' && (
							<Typography
								style={{
									color: 'white',
									marginLeft: '2.9rem',
									paddingTop: '5px',
								}}
							>
								Requisitante
							</Typography>
						)}
					</div>
					<Menu
						theme="dark"
						defaultSelectedKeys={['1']}
						mode="inline"
						items={items}
						onClick={handleNavigate}
					/>
				</Sider>
				<Layout className="site-layout">
					<Header
						style={{
							padding: 0,
							background: colorBgContainer,
							display: 'flex',
							justifyContent: 'flex-end',
							alignItems: 'center',
						}}
					>
						{isLoadingLogoff || isLoadingUpdate ? (
							<Spin />
						) : (
							<Button
								type="ghost"
								style={{
									fontSize: '15px',
									marginRight: '10px',
								}}
								onClick={showModal}
								icon={<LogoutOutlined />}
							>
								Sair
							</Button>
						)}
					</Header>
					<Content style={{ margin: '0 16px' }}>
						<Breadcrumb style={{ margin: '16px 0' }}>
							{breadcrumbItems.map((item, i) => (
								<Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
							))}
						</Breadcrumb>
						{children}
					</Content>
				</Layout>
			</Layout>
			<Modal
				title="Confirmação"
				open={isModalOpen}
				centered
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<Typography>Deseja sair da aplicação?</Typography>
			</Modal>
		</>
	);
};
