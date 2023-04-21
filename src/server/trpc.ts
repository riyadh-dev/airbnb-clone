import { TRPCError, initTRPC } from '@trpc/server';
import { TContext } from './context';

const t = initTRPC.context<TContext>().create();

export const isAuthenticated = t.middleware(({ ctx, next }) => {
	if (!ctx.session?.user) throw new TRPCError({ code: 'UNAUTHORIZED' });
	return next({
		// Infers the `session` and `user` as non-nullable
		ctx: { session: { ...ctx.session, user: ctx.session.user } },
	});
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthenticated);

export const router = t.router;
export const middleware = t.middleware;
