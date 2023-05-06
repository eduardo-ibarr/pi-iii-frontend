import { Layout, Menu, Breadcrumb, theme } from 'antd';
import React, { useState } from 'react';

import {
	DesktopOutlined,
	FileOutlined,
	PieChartOutlined,
	TeamOutlined,
	UserOutlined,
} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { ParentPage } from '../../../interfaces/parentPage';

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

const items: MenuItem[] = [
	getItem('Option 1', '1', <PieChartOutlined />),
	getItem('Option 2', '2', <DesktopOutlined />),
	getItem('User', 'sub1', <UserOutlined />, [
		getItem('Tom', '3'),
		getItem('Bill', '4'),
		getItem('Alex', '5'),
	]),
	getItem('Team', 'sub2', <TeamOutlined />, [
		getItem('Team 1', '6'),
		getItem('Team 2', '8'),
	]),
	getItem('Files', '9', <FileOutlined />),
];

export const PrivateBase = ({ children }: ParentPage) => {
	const [collapsed, setCollapsed] = useState(false);

	const {
		token: { colorBgContainer },
	} = theme.useToken();

	const breadcrumbItems = window.location.pathname
		.split('/')
		.filter((item) => item !== 'app');

	return (
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
				/>
			</Sider>
			<Layout className="site-layout">
				<Header style={{ padding: 0, background: colorBgContainer }} />
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
	);
};
