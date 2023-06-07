/* eslint-disable indent */
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useAppContext from '../../hooks/app/useAppContext';

import {
	CreateAgent,
	ListAgents,
	ShowAgent,
	UpdateAgent,
} from '../../pages/private/agents';

import {
	CreateCategory,
	ListCategories,
	ShowCategory,
	UpdateCategory,
} from '../../pages/private/categories';

import {
	CreateRequester,
	ListRequesters,
	ShowRequester,
	UpdateRequester,
} from '../../pages/private/requesters';

import { PrivateBase } from '../../pages/private/base';

import {
	CreateSector,
	ListSectors,
	ShowSector,
	UpdateSector,
} from '../../pages/private/sectors';
import { CreateTicket } from '../../pages/private/tickets/requester/createTicket';
import ListTicketsByRequesterSide from '../../pages/private/tickets/requester/listTickets';
import { ShowTicketsByRequesterSide } from '../../pages/private/tickets/requester/showTicket';
import ListTicketsByAgentSide from '../../pages/private/tickets/agent/listTickets';
import { ShowTicketsByAgentSide } from '../../pages/private/tickets/agent/showTicket';
import ListTicketsByAdminSide from '../../pages/private/tickets/admin/listTickets';
import { ShowTicketsByAdminSide } from '../../pages/private/tickets/admin/showTicket';

export const PrivateRoutes = () => {
	const { isLoggedIn, typeOfUser } = useAppContext();

	if (!isLoggedIn) {
		return <Navigate to="/login" />;
	}

	if (!typeOfUser) {
		return null;
	}

	if (typeOfUser === 'agent') {
		return (
			<PrivateBase>
				<Routes>
					<Route path="/agentes/:id" element={<ShowAgent />} />
					<Route path="/agentes/:id/atualizar" element={<UpdateAgent />} />

					<Route path="/agentes/tickets" element={<ListTicketsByAgentSide />} />
					<Route
						path="/agentes/tickets/:id"
						element={<ShowTicketsByAgentSide />}
					/>
				</Routes>
			</PrivateBase>
		);
	}

	if (typeOfUser === 'requester') {
		return (
			<PrivateBase>
				<Routes>
					<Route path="/requisitantes/:id" element={<ShowRequester />} />
					<Route
						path="/requisitantes/:id/atualizar"
						element={<UpdateRequester />}
					/>

					<Route
						path="/requisitantes/tickets/novo"
						element={<CreateTicket />}
					/>
					<Route
						path="/requisitantes/tickets"
						element={<ListTicketsByRequesterSide />}
					/>
					<Route
						path="/requisitantes/tickets/:id"
						element={<ShowTicketsByRequesterSide />}
					/>
				</Routes>
			</PrivateBase>
		);
	}

	if (typeOfUser === 'admin') {
		return (
			<PrivateBase>
				<Routes>
					<Route path="/admin/requisitantes" element={<ListRequesters />} />
					<Route
						path="/admin/requisitantes/novo"
						element={<CreateRequester />}
					/>
					<Route path="/admin/requisitantes/:id" element={<ShowRequester />} />
					<Route
						path="/admin/requisitantes/:id/atualizar"
						element={<UpdateRequester />}
					/>

					<Route path="/admin/setores" element={<ListSectors />} />
					<Route path="/admin/setores/novo" element={<CreateSector />} />
					<Route path="/admin/setores/:id" element={<ShowSector />} />
					<Route
						path="/admin/setores/:id/atualizar"
						element={<UpdateSector />}
					/>

					<Route path="/admin/categorias" element={<ListCategories />} />
					<Route path="/admin/categorias/nova" element={<CreateCategory />} />
					<Route path="/admin/categorias/:id" element={<ShowCategory />} />
					<Route
						path="/admin/categorias/:id/atualizar"
						element={<UpdateCategory />}
					/>

					<Route path="/admin/tickets" element={<ListTicketsByAdminSide />} />
					<Route
						path="/admin/tickets/:id"
						element={<ShowTicketsByAdminSide />}
					/>

					<Route path="/admin/agentes" element={<ListAgents />} />

					<Route path="/admin/agentes/novo" element={<CreateAgent />} />
				</Routes>
			</PrivateBase>
		);
	}

	return <Navigate to="/404" replace />;
};
