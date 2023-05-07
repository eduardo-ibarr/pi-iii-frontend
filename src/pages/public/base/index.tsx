import { Layout } from 'antd';
import React from 'react';

import { ParentPage } from '../../../interfaces/parentPage';

const { Header, Content, Footer } = Layout;

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
			<Footer style={{ textAlign: 'center' }}>
				© 2023 Eduardo Ibarr de Paula. Todos os direitos reservados.
			</Footer>
		</Layout>
	);
};
