import { createContext } from '@/server/context';
import { appRouter } from '@/server/router/_app';
import { createNextApiHandler } from '@trpc/server/adapters/next';

// export API handler
// @see https://trpc.io/docs/api-handler
export default createNextApiHandler({
	router: appRouter,
	createContext,
});
