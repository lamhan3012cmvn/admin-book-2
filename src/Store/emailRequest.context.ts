import { createStore, createHook, Action } from 'react-sweet-state';
import { EmailModel } from '../Models/emailRequests.model';

type State = {
	emails: Array<EmailModel>;
	loading: boolean;
	totalPage: number;
};
type Actions = typeof actions;

const initialState: State = {
	emails: [],
	loading: false,
	totalPage: 0
};

const setEmails =
	(emails: Array<EmailModel>, totalPage: number): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			emails: emails,
			totalPage: totalPage
		});
	};

const actions = {
	setEmails
};

export const selector = (state: State) => {
	return {
		emails: state.emails || [],
		totalPage: state.totalPage
	};
};
const Store = createStore<State, Actions>({
	initialState,
	actions,
	name: 'emailRequestCtx'
});

export const emailRequestCtx = createHook(Store, {
	selector
});
