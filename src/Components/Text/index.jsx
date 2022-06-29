import React from 'react';
import { yellow } from '../../Colors';

const Text = ({ color = `[#000]` | `[#fff]` | `${yellow}`, children }) => {
	return (
		<h4
			className={`font-light text-xl sm:text-2xl md:text-3xl truncate text-${color}`}>
			{children}
		</h4>
	);
};

export default Text;
