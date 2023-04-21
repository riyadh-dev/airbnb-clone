import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { inferAsyncReturnType } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';

export async function createContext({ req, res }: CreateNextContextOptions) {
	const session = await getServerSession(req, res, authOptions);
	return { session };
}

export type TContext = inferAsyncReturnType<typeof createContext>;
