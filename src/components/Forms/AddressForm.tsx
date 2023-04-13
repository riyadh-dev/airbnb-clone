import CustomInput from './CustomInput';

export default function AddressForm() {
	return (
		<div className='space-y-3 pt-8'>
			<CustomInput
				inputProps={{
					type: 'text',
					placeholder: 'Country / Region',
				}}
			/>
			<CustomInput
				inputProps={{
					type: 'text',
					placeholder: 'Address line 1 (if applicable)',
				}}
			/>
			<CustomInput
				inputProps={{
					type: 'text',
					placeholder: 'Address line 2 (if applicable)',
				}}
			/>
			<CustomInput
				inputProps={{
					type: 'text',
					placeholder: 'City / village (if applicable)',
				}}
			/>
			<CustomInput
				inputProps={{
					type: 'text',
					placeholder: 'State / province / territory (if applicable)',
				}}
			/>
			<CustomInput
				inputProps={{
					type: 'text',
					placeholder: 'Postal code (if applicable)',
				}}
			/>
		</div>
	);
}
