import { createStore, createHook, Action } from 'react-sweet-state';

type State = {
	sideBars: Array<{ id: number; title: string }>;
	loading: boolean;
};
type Actions = typeof actions;

const initialState: State = {
	sideBars: [
    { id: 1, title: 'Dashboard' },
  ],
	loading: false
};

const setSideBar =
	(sideBars: Array<{ id: number; title: string }>): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			sideBars: sideBars
		});
	};

const actions = {
	setSideBar
};

export const selector = (state: State) => {
	return {
		blogs: state.sideBars || []
	};
};
const Store = createStore<State, Actions>({
	initialState,
	actions
});

export const sideBarCtx = createHook(Store, {
	selector
});
