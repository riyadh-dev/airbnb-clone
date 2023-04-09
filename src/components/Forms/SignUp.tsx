export default function SignUpForm() {
	return (
		<form>
			<h1 className='pb-3 text-center text-gray-400'>Create an account</h1>

			<input
				type='email'
				placeholder='Email'
				className='h-14 w-full rounded-t-md border-x border-t border-gray-400 bg-transparent p-4'
			/>
			<input
				type='password'
				placeholder='Password'
				className='h-14 w-full rounded-b-md border border-gray-400 bg-transparent p-4'
			/>

			<button
				type='submit'
				className='mt-5 h-12 w-full rounded-md bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] font-bold text-white'
			>
				Continue
			</button>
		</form>
	);
}
