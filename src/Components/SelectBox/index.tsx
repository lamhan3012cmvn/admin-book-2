import React from 'react';
import './style.css';
interface Props {
	idCheckBox: string;
	list: Array<any>;
	state: string;
	registerForm?: any;
	handleChoose: (value: { id: number; value: string }) => void;
}

const SelectBox = (props: Props) => {
	const { idCheckBox, list, state, registerForm, handleChoose } = props;
	const refChecked = React.useRef<HTMLInputElement>();
	const _handleChoose = (value: { id: number; value: string }) => {
		refChecked.current.checked = false;
		handleChoose(value);
	};
	return (
		<div className='relative'>
			<label
				htmlFor={idCheckBox}
				className='cursor-pointer outline-none focus:outline-none transition-all text-gray-300 hover:text-gray-600'>
				<div className='h-10 bg-white flex border border-gray-200 rounded items-center'>
					<input {...registerForm} type='text' defaultValue='' hidden />
					<span className='px-4 appearance-none outline-none select-none text-gray-800 w-full'>
						{state}
					</span>
					<svg
						className='w-4 h-4 mx-2 fill-current'
						xmlns='http://www.w3.org/2000/svg'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth='2'
						strokeLinecap='round'
						strokeLinejoin='round'>
						<polyline points='18 15 12 9 6 15'></polyline>
					</svg>
				</div>
			</label>

			<input
				type='checkbox'
				id={idCheckBox}
				className='peer'
				ref={refChecked}
				hidden
			/>
			<div className='absolute rounded shadow bg-white overflow-hidden hidden peer-checked:flex flex-col w-full mt-1 border border-gray-200 z-10'>
				{list.map((e, i) => {
					return (
						<div
							className='cursor-pointer group'
							onClick={() => _handleChoose(e)}
							key={i}>
							<a className='block p-2 border-transparent border-l-4 group-hover:border-blue-600 group-hover:bg-gray-100'>
								{e.value}
							</a>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default SelectBox;
