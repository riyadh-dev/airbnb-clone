import Providers from '@/app/providers';
import { Nunito } from 'next/font/google';
export const metadata = {
	title: 'Airbnb Clone',
	description: 'An airbnb clone app using NexJS 13',
};

const nunito = Nunito({
	variable: '--font-primary',
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	display: 'swap',
});

import 'remixicon/fonts/remixicon.css';
import './globals.css';

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang='en'
			//HACK to stop errors caused by next-themes
			suppressHydrationWarning
			className={`${nunito.variable}`}
		>
			<body className='bg-white font-primary dark:bg-neutral-950'>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
