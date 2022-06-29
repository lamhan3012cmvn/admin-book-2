import { createStore, createHook, Action } from 'react-sweet-state';
import { BlogDetail, BlogModel } from '../Models/blog.model';

type State = {
	blogs: Array<BlogModel>;
	blogDetail: BlogDetail;
	loading: boolean;
};
type Actions = typeof actions;

const initialState: State = {
	blogs: [],
	blogDetail: undefined,
	loading: false
};

const setBlog =
	(blogs: Array<BlogModel>): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			blogs: blogs
		});
	};

const setBlogDetail =
	(blogDetail: BlogDetail): Action<State> =>
	({ setState, getState }) => {
		setState({
			...getState(),
			blogDetail: blogDetail
		});
	};
const actions = {
	setBlog,
	setBlogDetail
};

export const selector = (state: State) => {
	return {
		blogs: state.blogs || [],
		blogDetail: state.blogDetail || undefined
	};
};
const Store = createStore<State, Actions>({
	initialState,
	actions
});

export const blogCtx = createHook(Store, {
	selector
});
