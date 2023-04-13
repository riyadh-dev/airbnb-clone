'use client';

import { useState } from 'react';
import CustomInput from './CustomInput';

export default function AddressForm() {
	const [photosNumber, setPhotosNumber] = useState(3);
	const increasePhotosNumber = () => setPhotosNumber((prev) => prev + 1);

	return (
		<div className='space-y-3 pt-8'>
			{[...Array(photosNumber)].map((_, index) => (
				<div key={index} className='flex gap-x-4'>
					<div className='grow'>
						<CustomInput
							inputProps={{
								type: 'text',
								placeholder: `Photo #${index + 1}`,
							}}
						/>
					</div>

					<button className='h-14 w-14 rounded-lg border border-gray-400'>
						<i className='ri-subtract-line text-xl text-gray-400'></i>
					</button>
				</div>
			))}
			<button
				onClick={increasePhotosNumber}
				className='h-14 w-14 rounded-lg border border-gray-400'
			>
				<i className='ri-add-line text-xl text-gray-400'></i>
			</button>
		</div>
	);
}
