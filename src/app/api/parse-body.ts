import { z } from 'zod';
import errorHandler from './error-handler';

export default function parseRouteHandlerBody<TBody>(
	schema: z.Schema<TBody>,
	routeHandler: (parsedBody: TBody, request: Request) => Promise<Response>
) {
	return async (request: Request) => {
		const body = await request.json();
		const safeParseReturn = schema.safeParse(body);
		if (!safeParseReturn.success)
			return new Response('bad input', { status: 400 });

		return routeHandler(safeParseReturn.data, request).catch(errorHandler);
	};
}
