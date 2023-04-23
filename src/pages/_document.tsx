import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang='en'>
			<Head />
			<body className='bg-white dark:bg-neutral-950'>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
