export default function LoginForm() {
	return (
		<form>
			<h1 className='pb-3 text-center text-gray-400'>Login to your account</h1>

			<input
				type='text'
				placeholder='Username'
				className='h-14 w-full rounded-t-md border-x border-t border-gray-400 bg-transparent p-4'
			/>
			<div>
				<input
					type='email'
					placeholder='Email'
					className='h-14 w-1/2 border-l border-t border-gray-400 bg-transparent p-4'
				/>
				<input
					type='email'
					placeholder='Confirm Email'
					className='h-14 w-1/2 border-x border-t border-gray-400 bg-transparent p-4'
				/>
			</div>
			<div>
				<input
					type='password'
					placeholder='Password'
					className='h-14 w-1/2 rounded-bl-md border-y border-l border-gray-400 bg-transparent p-4'
				/>
				<input
					type='password'
					placeholder='Confirm Password'
					className='h-14 w-1/2 rounded-br-md border border-gray-400 bg-transparent p-4'
				/>
			</div>

			<button
				type='submit'
				className='mt-5 h-12 w-full rounded-md bg-gradient-to-r from-[#e61e4d] from-30% to-[#bd1e59] font-bold text-white'
			>
				Continue
			</button>
		</form>
	);
}
