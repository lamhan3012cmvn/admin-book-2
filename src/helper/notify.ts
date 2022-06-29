import { toast } from 'react-toastify';
export const notify = (content: string) => {
	return toast(content);
};
