import React, { useEffect } from 'react';
import { List, Typography } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
import { blue, green } from '@ant-design/colors';
import moment from 'moment';
import { TUser } from '../../../../types/TUser';
import { useUpdateMessage } from '../../../../hooks/api/messages/useUpdateMessage';
import { handleError } from '../../../../helpers';

interface IChatBubbleByRequesterSideProps {
	content: string;
	readStatus: boolean;
	sender: TUser;
	date: Date;
	messageId: string;
}

export const ChatBubbleByRequesterSide = ({
	content,
	sender,
	readStatus,
	date,
	messageId,
}: IChatBubbleByRequesterSideProps) => {
	const isAuthorRequester = sender === 'requester';

	const author = isAuthorRequester ? 'Você' : 'Agente';

	const bubbleStyle: React.CSSProperties = {
		backgroundColor: !isAuthorRequester ? '#f5f5f5' : '#4798e9',
		color: !isAuthorRequester ? '#333333' : 'white',
		textAlign: !isAuthorRequester ? 'left' : 'right',
		padding: '5px 15px 5px 15px',
		borderRadius: '8px',
		border: `1px solid ${!isAuthorRequester ? '#f0f0f0' : blue[2]}`,
		maxWidth: '70%',
		width: 'auto',
		marginLeft: isAuthorRequester ? 'auto' : undefined,
		display: 'flex',
		flexDirection: 'column',
		alignItems: isAuthorRequester ? 'flex-end' : 'flex-start',
	};

	const { mutateAsync: readMessage } = useUpdateMessage(messageId);

	const handleReadMessage = async () => {
		try {
			if (!isAuthorRequester && readStatus === false) {
				await readMessage({ read_status: true });
			}
		} catch (error) {
			handleError(error);
		}
	};

	useEffect(() => {
		handleReadMessage();
	}, []);

	return (
		<List.Item style={{ marginBottom: '16px' }}>
			<div style={{ textAlign: !isAuthorRequester ? 'left' : 'right' }}>
				<List.Item.Meta
					title={author}
					style={bubbleStyle}
					description={content}
					className={sender}
				/>

				<Typography.Text
					style={{ marginLeft: '0.6rem', marginTop: '2px', fontSize: '12px' }}
				>
					{moment(date).format('DD/MM/yyyy hh:mm:ss')}
				</Typography.Text>

				{isAuthorRequester && (
					<Typography.Text style={{ margin: '0 5px 0 16px', fontSize: '12px' }}>
						{readStatus ? (
							<CheckOutlined
								style={{
									color: green[5],
									marginRight: '5px',
									marginTop: '5px',
								}}
							/>
						) : (
							<CheckOutlined style={{ marginRight: '5px' }} />
						)}
					</Typography.Text>
				)}
			</div>
		</List.Item>
	);
};
