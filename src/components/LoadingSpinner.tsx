import { HTMLAttributes } from 'react';

export default function LoadingSpinner(props: HTMLAttributes<HTMLDivElement>) {
	return (
		<div {...props}>
			<div
				className='mx-auto aspect-square h-full animate-spin rounded-full border-4 border-solid border-primary border-r-transparent'
				role='status'
			/>
		</div>
	);
}
