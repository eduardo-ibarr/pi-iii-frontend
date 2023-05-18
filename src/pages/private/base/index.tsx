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
import React, { useState } from 'react';

import {
	DesktopOutlined,
	FileOutlined,
	UserOutlined,
	LogoutOutlined,
} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { ParentPage } from '../../../interfaces/parentPage';
import { useNavigate } from 'react-router';
import { useLogoff } from '../../../hooks/api/auth/useLogoff';
import { openErrorNotification } from '../../../components';
import { translateErrorMessage } from '../../../helpers/translateErrorMessage';
import { AxiosError } from 'axios';
import { IRequestError } from '../../../interfaces/requestError';
import useAppContext from '../../../hooks/app/useAppContext';
import { clearAccessToken } from '../../../helpers/auth';
import { useTurnAvailability } from '../../../hooks/api/agents/useTurnAvailability';

const { Header, Content, Footer, Sider } = Layout;

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
	const history = useNavigate();

	const { mutateAsync: logoff, isLoading: isLoadingLogoff } = useLogoff();
	const { mutateAsync: turnAvailability, isLoading: isLoadingUpdate } =
		useTurnAvailability();

	const { handleLogoff, userEmail, typeOfUser } = useAppContext();

	const [isModalOpen, setIsModalOpen] = useState(false);

	const showModal = () => {
		setIsModalOpen(true);
	};

	const handleOk = async () => {
		try {
			handleLogoff();

			if (typeOfUser === 'agent') {
				await turnAvailability({ email: userEmail || '', available: false });
			}

			// await logoff();

			clearAccessToken();
		} catch (error) {
			if (error instanceof AxiosError) {
				const errorObj: IRequestError = error?.response?.data;
				openErrorNotification(translateErrorMessage(errorObj.message));
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
		history(
			`/app/${(
				items.find((i) => i?.key === event.key) as MenuItem & { label: string }
			)?.label.toLowerCase()}`
		);
	};

	// getItem('User', 'sub1', <UserOutlined />, [
	// 	getItem('Tom', '3'),
	// 	getItem('Bill', '4'),
	// 	getItem('Alex', '5'),
	// ]),

	let items: MenuItem[] = [];

	if (typeOfUser === 'agent') {
		items = [
			getItem('Agentes', '1', <UserOutlined />),
			getItem('Categorias', '2', <FileOutlined />),
			getItem('Tickets', '3', <FileOutlined />),
		];
	}

	if (typeOfUser === 'requester') {
		items = [
			getItem('Requisitantes', '1', <UserOutlined />),
			getItem('Setores', '2', <DesktopOutlined />),
			getItem('Tickets', '3', <FileOutlined />),
		];
	}

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
							background: 'rgba(255, 255, 255, 0.2)',
						}}
					/>
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
									fontSize: '18px',
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
					<Footer style={{ textAlign: 'center' }}>
						© 2023 Eduardo Ibarr de Paula. Todos os direitos reservados.
					</Footer>
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
