import React from 'react';

interface Props {
	title: string;
}

const ErrorMessage = (props: Props) => {
	const { title } = props;
	return <span className='text-red-600'>{title}</span>;
};

export default ErrorMessage;
