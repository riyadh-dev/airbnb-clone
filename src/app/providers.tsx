'use client';

import { Provider as JotaiProvider } from 'jotai';
import { DevTools } from 'jotai-devtools';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<JotaiProvider>
			<NextThemeProvider attribute='class'>
				<SessionProvider>{children}</SessionProvider>
			</NextThemeProvider>
			<DevTools theme='dark' />
		</JotaiProvider>
	);
}
