import { Form, Radio, Input, Button, Spin, Card } from 'antd';
import React from 'react';
import { ILogin } from '../../../interfaces/modules';
import { useLogin } from '../../../hooks/api/auth/useLogin';
import useAppContext from '../../../hooks/app/useAppContext';
import { Navigate } from 'react-router';
import { openSuccessNotification } from '../../../components';
import Title from 'antd/es/typography/Title';
import { useTurnAvailability } from '../../../hooks/api/agents/useTurnAvailability';
import { handleError } from '../../../helpers/handleError';

export const LoginPage = () => {
	const [form] = Form.useForm<ILogin>();

	const { handleLogin, typeOfUser, handleSetUserEmail } = useAppContext();

	const {
		mutateAsync: turnAvailability,
		isLoading: isLoadingUpdate,
		isSuccess: isSuccessUpdate,
	} = useTurnAvailability();

	const {
		mutateAsync: login,
		isLoading: isLoadingLogin,
		isSuccess: isSuccessLogin,
	} = useLogin();

	const onFinish = async ({ email, password, type_of_user }: ILogin) => {
		try {
			await login({ email, password, type_of_user });
			await turnAvailability({ email, available: true });

			handleLogin();
			handleSetUserEmail(email);

			openSuccessNotification('Login realizado com sucesso.');
		} catch (error) {
			handleError(error);
		}
	};

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
							{ required: true, message: 'O tipo de usuário é obrigatório' },
						]}
						style={{ marginBottom: '30px' }}
						label="Selecione o tipo de usuário:"
						name="type_of_user"
					>
						<Radio.Group>
							<Radio.Button value="agent">Agente de Suporte</Radio.Button>
							<Radio.Button value="requester">Requisitante</Radio.Button>
						</Radio.Group>
					</Form.Item>
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

			{isSuccessLogin && isSuccessUpdate ? (
				typeOfUser === 'agent' ? (
					<Navigate to="/app/agentes" />
				) : typeOfUser === 'requester' ? (
					<Navigate to="/app/requisitantes" />
				) : (
					<></>
				)
			) : (
				<></>
			)}
		</div>
	);
};
