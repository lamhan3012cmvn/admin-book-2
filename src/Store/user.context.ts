import { createStore, createHook, Action } from 'react-sweet-state';
import { UserModel } from '../Models/user.model';

type State = {
	users: Array<UserModel>;
	loading: boolean;
	totalPage: number;
};
type Actions = typeof actions;

const initialState: State = {
	users: [],
	loading: false,
	totalPage: 0
};

const setUser =
	(users: Array<UserModel>, totalPage: number): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			users: users,
			totalPage: totalPage
		});
	};

const actions = {
	setUser
};

export const selector = (state: State) => {
	return {
		users: state.users || [],
		totalPage: state.totalPage
	};
};
const Store = createStore<State, Actions>({
	initialState,
	actions
});

export const userCtx = createHook(Store, {
	selector
});
