import { Nunito } from 'next/font/google';
import Categories from './Categories';
import Navbar from './Navbar';

import './globals.css';
import './icons.css';

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

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang='en' className={`${nunito.variable}`}>
			<body className='font-primary'>
				<Navbar />
				<Categories />
				{children}
			</body>
		</html>
	);
}
