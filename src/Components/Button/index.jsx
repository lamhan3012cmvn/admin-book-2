import React from 'react';
import { yellow } from '../../Colors';
import { classNames } from '../../helper/classNames';
import './style.css';

const Button = ({ className = '', children, onClick }) => {
	return (
		<button
			onClick={onClick}
			className={classNames(
				`relative min-w-[160px] border-2 rounded-lg border-green-500 px-6 py-2 text-base lg:text-xl text-green-500 z-[1]`,
				`before:absolute before:top-[0] before:left-[0] before:h-full before:w-[0%] before:bg-[#FADA5E] before:rounded-lg before:transition-all before:ease-in-out before:duration-150`
				// `hover:before:w-[100%] hover:before:transition-all hover:before:ease-in-out hover:before:duration-150 hover:text-[#fff]`
			)}>
			{children}
		</button>
	);
};

export default Button;
