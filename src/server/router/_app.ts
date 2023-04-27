import { router } from '../trpc';
import listingsRouter from './listings';
import reservationsRouter from './reservations';
import usersRouter from './users';

export const appRouter = router({
	users: usersRouter,
	listings: listingsRouter,
	reservations: reservationsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
