import { useMutation } from 'react-query';
import { ticketsService } from '../../../services/api';
import { IUpdateTicket } from '../../../interfaces/update';

export function useUpdateTicket(id: string) {
	return useMutation((values: IUpdateTicket) =>
		ticketsService.updateTicket(values, id)
	);
}
