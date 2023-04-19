import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import errorHandler from './api-error-handler';

export default function parseRouteHandlerBody<TBody>(
	schema: z.Schema<TBody>,
	routeHandler: (parsedBody: TBody, res: NextApiResponse) => Promise<void>
) {
	return async (req: NextApiRequest, res: NextApiResponse) => {
		if (req.method !== 'POST') return;
		const safeParseReturn = schema.safeParse(req.body);
		if (!safeParseReturn.success) return res.status(400).send('bad input');

		return routeHandler(safeParseReturn.data, res).catch(errorHandler);
	};
}
