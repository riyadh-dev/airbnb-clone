import { TRentModalStep } from '@/common/types';
import Link from 'next/link';

//TODO make a handle next for each switch case;
interface IProps {
	back: TRentModalStep | (() => unknown);
	next: TRentModalStep | (() => unknown);
	nextButtonText?: string;
	disabled?: boolean;
}
export default function BecameHostNavigation({
	back,
	next,
	nextButtonText = 'Next',
	disabled = false,
}: IProps) {
	return (
		<nav className='sticky bottom-0 flex min-h-[80px] items-center justify-between border-t bg-white px-10 text-lg font-bold dark:bg-neutral-950 xl:px-20'>
			{typeof back === 'string' ? (
				<Link
					href={`/became-a-host/${back}`}
					className='flex h-12 items-center rounded-lg border px-8 py-3'
				>
					Back
				</Link>
			) : (
				<button
					onClick={back}
					className='flex h-12 items-center rounded-lg border px-8 py-3'
				>
					Back
				</button>
			)}
			{typeof next === 'string' ? (
				<Link
					href={`/became-a-host/${next}`}
					className='flex items-center rounded-lg bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] px-8 py-3 text-white'
				>
					{nextButtonText}
				</Link>
			) : (
				<button
					disabled={disabled}
					onClick={next}
					className='flex items-center rounded-lg bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] px-8 py-3 text-white'
				>
					{nextButtonText}
				</button>
			)}
		</nav>
	);
}
