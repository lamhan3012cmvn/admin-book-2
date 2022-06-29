import { createStore, createHook, Action } from 'react-sweet-state';
import { StatisticModel } from '../Models/statistic.model';

type State = {
	statistic: StatisticModel;
	loading: boolean;
};
type Actions = typeof actions;

const initialState: State = {
	statistic: undefined,
	loading: false
};

const setStatistic =
	(statistic: StatisticModel): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			statistic: statistic
		});
	};

const actions = {
	setStatistic
};

export const selector = (state: State) => {
	return {
		statistic: state.statistic || undefined
	};
};
const Store = createStore<State, Actions>({
	initialState,
	actions
});

export const statisticCtx = createHook(Store, {
	selector
});
