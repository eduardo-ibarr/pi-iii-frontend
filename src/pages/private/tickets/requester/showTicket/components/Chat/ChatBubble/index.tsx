import React from 'react';
import { List, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { TUser } from '../../../../../../../../types/TUser';
import { blue, green } from '@ant-design/colors';

interface IChatBubbleProps {
	content: string;
	readStatus: boolean;
	typeOfUser: TUser;
}

const ChatBubble: React.FC<IChatBubbleProps> = ({
	content,
	typeOfUser,
	readStatus,
}) => {
	const author = typeOfUser === 'requester' ? 'Você' : 'Agente';

	const bubbleStyle: React.CSSProperties = {
		backgroundColor: typeOfUser === 'agent' ? '#f5f5f5' : '#1976D2',
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
				{typeOfUser === 'requester' && (
					<Typography.Text style={{ margin: '0 16px 0 16px' }}>
						{readStatus ? (
							<>
								<CheckOutlined
									style={{
										color: green[5],
										marginRight: '5px',
										marginTop: '10px',
									}}
								/>
								Lida
							</>
						) : (
							<>
								<CheckOutlined
									style={{ marginRight: '5px', marginTop: '10px' }}
								/>
								Não lida
							</>
						)}
					</Typography.Text>
				)}
			</div>
		</List.Item>
	);
};

export default ChatBubble;
