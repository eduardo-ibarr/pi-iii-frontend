/* eslint-disable indent */
import { Form, Input, Button, Spin, Card } from 'antd';
import React, { useEffect } from 'react';
import { ILogin } from '../../../interfaces/modules';
import { useLogin } from '../../../hooks/api/auth/useLogin';
import useAppContext from '../../../hooks/app/useAppContext';
import { openSuccessNotification } from '../../../components';
import Title from 'antd/es/typography/Title';
import { useTurnAvailability } from '../../../hooks/api/agents/useTurnAvailability';
import { handleError } from '../../../helpers/handleError';
import { useNavigate } from 'react-router';

export const LoginPage = () => {
	const [form] = Form.useForm<ILogin>();

	const navigate = useNavigate();

	const { handleLogin, handleSetUserEmail, isLoggedIn, typeOfUser, userId } =
		useAppContext();

	const { mutateAsync: turnAvailability, isLoading: isLoadingUpdate } =
		useTurnAvailability();

	const { mutateAsync: login, isLoading: isLoadingLogin } = useLogin();

	const onFinish = async ({ email, password }: ILogin) => {
		try {
			await login({ email, password });
			await turnAvailability({ email, available: true });

			handleLogin();
			handleSetUserEmail(email);

			openSuccessNotification('Login realizado com sucesso.');
		} catch (error) {
			handleError(error);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			const redirectUser = async () => {
				if (isLoggedIn && typeOfUser && userId) {
					switch (typeOfUser) {
						case 'agent':
							navigate(`/app/agentes/${userId}`);
							break;
						case 'requester':
							navigate(`/app/requisitantes/${userId}`);
							break;
						case 'admin':
							navigate('/app/admin/agentes');
							break;
						default:
							navigate('/404');
							break;
					}
				}
			};

			redirectUser();
		}, 1500);
	}, [isLoggedIn, typeOfUser, userId, navigate]);

	return (
		<div
			style={{
				height: '65vh',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				gap: '80px',
			}}
		>
			<Title>Realize o seu login na nossa plataforma.</Title>
			<Card bordered={false} style={{ width: '500px' }}>
				<Form layout="vertical" form={form} onFinish={onFinish}>
					<Form.Item
						rules={[
							{ required: true, message: 'O email é obrigatório' },
							{ type: 'email', message: 'Por favor, insira um email válido' },
						]}
						style={{ marginBottom: '30px' }}
						name="email"
						label="Informe o email:"
					>
						<Input />
					</Form.Item>
					<Form.Item
						rules={[{ required: true, message: 'A senha é obrigatória' }]}
						name="password"
						label="Informe a senha:"
					>
						<Input.Password />
					</Form.Item>
					<Form.Item>
						<Button
							style={{ width: '100%', marginTop: '1rem' }}
							type="default"
							htmlType="submit"
						>
							{isLoadingLogin || isLoadingUpdate ? (
								<Spin style={{ color: 'white' }} />
							) : (
								'Login'
							)}
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	);
};
