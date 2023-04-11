export default function InputErrorMessage({ message }: { message?: string }) {
	if (!message) return null;
	return (
		<div className='flex items-center gap-x-2 text-rose-500'>
			<i className='ri-error-warning-fill text-lg'></i>
			<span className='text-sm'>{message}</span>
		</div>
	);
}
