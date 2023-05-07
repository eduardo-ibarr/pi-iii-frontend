import { useMutation } from 'react-query';
import { agentsService } from '../../../services/api';

interface IValues {
	available: boolean;
	email: string;
}

export function useTurnAvailability() {
	return useMutation(async ({ email, available }: IValues) => {
		const agents = await agentsService.listAgents();

		const agent = agents.find((agent) => agent.email === email);

		if (agent) {
			return agentsService.updateAgent({ available }, agent.id);
		}
	});
}
