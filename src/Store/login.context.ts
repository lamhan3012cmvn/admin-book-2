import { createStore, createHook, Action } from 'react-sweet-state';
import { UserLoginModel, UserModel } from '../Models/user.model';

type State = {
	user: UserLoginModel | undefined;
};
type Actions = typeof actions;

const initialState: State = {
	user: undefined
};

const setUser =
	(user: UserLoginModel): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			user: user
		});
	};

const actions = {
	setUser
};

export const selector = (state: State) => {
	return {
		user: state.user
	};
};
const Store = createStore<State, Actions>({
	initialState,
	actions
});

export const loginCtx = createHook(Store, {
	selector
});
