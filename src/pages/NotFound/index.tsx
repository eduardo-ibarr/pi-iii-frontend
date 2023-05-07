import React from 'react';
import { Result } from 'antd';

export const NotFoundPage: React.FC = () => {
	return (
		<div
			style={{
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Result
				status="404"
				title="404"
				subTitle="Desculpe, a página que você está procurando não existe."
			/>
		</div>
	);
};
