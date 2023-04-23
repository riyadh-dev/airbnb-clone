import '@/styles/globals.css';
import { classNames } from '@/utils/helpers';
import { trpc } from '@/utils/trpc';
import { Provider as JotaiProvider } from 'jotai';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { AppProps } from 'next/app';
import { Nunito } from 'next/font/google';
import { usePathname } from 'next/navigation';
import 'remixicon/fonts/remixicon.css';
import BecameHostLayout from '../components/BecameHostLayout';
import MainLayout from '../components/MainLayout';

import { useMemo } from 'react';
const nunito = Nunito({
	variable: '--font-primary',
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	display: 'swap',
});

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	const pathname = usePathname();
	const Layout = useMemo(
		() => (pathname?.includes('became-a-host') ? BecameHostLayout : MainLayout),
		[pathname]
	);

	return (
		<JotaiProvider>
			<NextThemeProvider attribute='class'>
				<SessionProvider session={session}>
					<div className={classNames(nunito.variable, 'font-primary')}>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</div>
				</SessionProvider>
			</NextThemeProvider>
		</JotaiProvider>
	);
}

export default trpc.withTRPC(App);
