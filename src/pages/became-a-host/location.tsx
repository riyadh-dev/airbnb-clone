import BecameHostNavigation from '@/components/BecameHostNavigation';
import CustomInput from '@/components/Forms/CustomInput';
import useZodForm from '@/hooks/useZodForm';
import { listingLocationAtom } from '@/jotai/atoms';
import { listingLocationSchema } from '@/zod/listings';
import { useAtom } from 'jotai';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function LocationStep() {
	const [location, setLocation] = useAtom(listingLocationAtom);
	const {
		register,
		handleSubmit,
		formState: { errors: formErrors },
		setValue,
	} = useZodForm(listingLocationSchema);
	const router = useRouter();

	useEffect(() => {
		setValue('country', location.country);
		setValue('addressLine1', location.addressLine1);
		setValue('addressLine2', location.addressLine2);
		setValue('city', location.city);
		setValue('state', location.state);
		setValue('postalCode', location.postalCode);
	}, [location, setValue]);

	const next = handleSubmit((data) => {
		setLocation(data);
		router.push('/became-a-host/floor-plan');
	});
	return (
		<>
			<div className='mx-auto max-w-[630px] space-y-4 px-4 pb-4'>
				<Head>
					<title>Location</title>
				</Head>
				<h1 className='text-4xl font-semibold'>
					Where&apos;s your place located?
				</h1>
				<h3 className='text-lg text-gray-400'>
					Your address is only shared with guests after they’ve made a
					reservation.
				</h3>
				<div className='space-y-3 pt-8'>
					<CustomInput
						inputProps={{
							type: 'text',
							placeholder: 'Country / Region',
							defaultValue: location.country,
							...register('country'),
						}}
						errorMessage={formErrors.country?.message}
					/>
					<CustomInput
						inputProps={{
							type: 'text',
							placeholder: 'Address line 1 (if applicable)',
							defaultValue: location.addressLine1,
							...register('addressLine1'),
						}}
						errorMessage={formErrors.addressLine1?.message}
					/>
					<CustomInput
						inputProps={{
							type: 'text',
							placeholder: 'Address line 2 (if applicable)',
							defaultValue: location?.addressLine2 ?? '',
							...register('addressLine2'),
						}}
						errorMessage={formErrors.addressLine2?.message}
					/>
					<CustomInput
						inputProps={{
							type: 'text',
							placeholder: 'City / village (if applicable)',
							defaultValue: location.city,
							...register('city'),
						}}
						errorMessage={formErrors.city?.message}
					/>
					<CustomInput
						inputProps={{
							type: 'text',
							placeholder: 'State / province / territory (if applicable)',
							defaultValue: location.state,
							...register('state'),
						}}
						errorMessage={formErrors.state?.message}
					/>
					<CustomInput
						inputProps={{
							type: 'text',
							placeholder: 'Postal code (if applicable)',
							defaultValue: location.postalCode,
							...register('postalCode'),
						}}
						errorMessage={formErrors.postalCode?.message}
					/>
				</div>
			</div>
			<BecameHostNavigation back='category' next={next} />
		</>
	);
}
