'use client';

import { ReactNode } from 'react';
import { JotaiProvider } from './jotai-provider';
import { NextThemeProvider } from './theme-provider';

export function Providers({ children }: { children: ReactNode }) {
	return (
		<JotaiProvider>
			<NextThemeProvider>{children}</NextThemeProvider>
		</JotaiProvider>
	);
}
