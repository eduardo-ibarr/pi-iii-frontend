import { Spin } from 'antd';
import React from 'react';

export const LoadingSpin = () => {
	return (
		<div
			style={{
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<Spin size="large" />
		</div>
	);
};
