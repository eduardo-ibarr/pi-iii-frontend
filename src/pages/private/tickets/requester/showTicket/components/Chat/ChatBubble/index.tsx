import React from 'react';
import { List, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { TUser } from '../../../../../../../../types/TUser';
import { blue, green } from '@ant-design/colors';
import moment from 'moment';

interface IChatBubbleProps {
	content: string;
	readStatus: boolean;
	typeOfUser: TUser;
	date: Date;
}

export const ChatBubble = ({
	content,
	typeOfUser,
	readStatus,
	date,
}: IChatBubbleProps) => {
	const author = typeOfUser === 'requester' ? 'Você' : 'Agente';

	const bubbleStyle: React.CSSProperties = {
		backgroundColor: typeOfUser === 'agent' ? '#f5f5f5' : '#3288df',
		color: typeOfUser === 'agent' ? '#333333' : 'white',
		textAlign: typeOfUser === 'agent' ? 'left' : 'right',
		padding: '5px 15px 5px 15px',
		borderRadius: '8px',
		border: `1px solid ${typeOfUser === 'agent' ? '#f0f0f0' : blue[2]}`,
		maxWidth: '70%',
		width: 'auto',
		marginLeft: typeOfUser === 'requester' ? 'auto' : undefined,
		display: 'flex',
		flexDirection: 'column',
		alignItems: typeOfUser === 'requester' ? 'flex-end' : 'flex-start',
	};

	return (
		<List.Item style={{ marginBottom: '16px' }}>
			<div style={{ textAlign: typeOfUser === 'agent' ? 'left' : 'right' }}>
				<List.Item.Meta
					title={author}
					style={bubbleStyle}
					description={content}
					className={typeOfUser}
				/>

				<Typography.Text style={{ margin: '0 4.5rem 0 0', fontSize: '12px' }}>
					{moment(date).format('DD/MM/yyyy hh:mm:ss')}
				</Typography.Text>

				{typeOfUser === 'requester' && (
					<Typography.Text style={{ margin: '0 5px 0 16px', fontSize: '12px' }}>
						{readStatus ? (
							<>
								<CheckOutlined
									style={{
										color: green[5],
										marginRight: '5px',
										marginTop: '5px',
									}}
								/>
								Lida
							</>
						) : (
							<CheckOutlined style={{ marginRight: '5px', marginTop: '5px' }} />
						)}
					</Typography.Text>
				)}
			</div>
		</List.Item>
	);
};
