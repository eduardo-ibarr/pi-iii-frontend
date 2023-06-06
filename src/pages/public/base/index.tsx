import { Layout } from 'antd';
import React from 'react';

import { ParentPage } from '../../../interfaces/parentPage';

const { Header, Content } = Layout;

export const PublicBase = ({ children }: ParentPage) => {
	return (
		<Layout style={{ minHeight: '100vh' }}>
			<Header style={{ padding: 0 }} />
			<Content
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				{children}
			</Content>
		</Layout>
	);
};
