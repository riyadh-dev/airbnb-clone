import { router } from '../trpc';
import listingsRouter from './listings';
import usersRouter from './users';

export const appRouter = router({
	users: usersRouter,
	listings: listingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
