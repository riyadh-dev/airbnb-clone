import { classNames } from '@/common/utils';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import InputErrorMessage from './InputErrorMessage';

interface IProps {
	inputProps: Omit<
		DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
		'className'
	>;
	errorMessage?: string;
}

export default function CustomInput({ inputProps, errorMessage }: IProps) {
	return (
		<div className='space-y-2'>
			<input
				{...inputProps}
				className={classNames(
					errorMessage
						? 'border-rose-600 bg-rose-400/5 text-red-400 placeholder:text-red-400/75 focus:border-rose-500 focus:outline-none focus:ring-1 focus:ring-rose-500'
						: 'border-gray-400 bg-transparent',
					'h-14 w-full rounded-md border p-4'
				)}
			/>
			<InputErrorMessage message={errorMessage} />
		</div>
	);
}
