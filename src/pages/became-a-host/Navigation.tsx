import { TRentModalStep } from '@/common/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navigation() {
	const stepName = (usePathname()?.replace('/became-a-host/', '') ??
		'category') as TRentModalStep;
	const [links, setLinks] = useState<{
		prevLink: TRentModalStep;
		nextLink: TRentModalStep;
	}>({ prevLink: 'category', nextLink: 'location' });
	useEffect(() => {
		switch (stepName) {
			case 'category':
				setLinks({ prevLink: 'category', nextLink: 'location' });
				break;
			case 'location':
				setLinks({ prevLink: 'category', nextLink: 'floor-plan' });
				break;
			case 'floor-plan':
				setLinks({ prevLink: 'location', nextLink: 'photos' });
				break;
			case 'photos':
				setLinks({ prevLink: 'floor-plan', nextLink: 'title' });
				break;
			case 'title':
				setLinks({ prevLink: 'floor-plan', nextLink: 'description' });
				break;
			case 'description':
				setLinks({ prevLink: 'title', nextLink: 'price' });
				break;
			case 'price':
				setLinks({ prevLink: 'description', nextLink: 'price' });
				break;
		}
	}, [stepName]);
	return (
		<nav className='sticky bottom-0 flex min-h-[80px] items-center justify-between border-t bg-inherit px-10 text-lg font-bold xl:px-20'>
			<Link
				href={`/became-a-host/${links.prevLink}`}
				className='flex h-12 items-center rounded-lg border px-8 py-3'
			>
				Back
			</Link>
			<Link
				href={`/became-a-host/${links.nextLink}`}
				className='flex items-center rounded-lg bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] px-8 py-3 text-white'
			>
				{stepName === 'price' ? 'Submit' : 'Next'}
			</Link>
		</nav>
	);
}
