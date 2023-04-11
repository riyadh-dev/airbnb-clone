import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export default function errorHandler(error: unknown) {
	if (
		error instanceof PrismaClientKnownRequestError &&
		error.code === 'P2002'
	) {
		const usedField = (error?.meta?.target as string)?.split('_')[1];
		return new Response(
			JSON.stringify({ [usedField]: `${usedField} field already used` }),
			{
				status: 400,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}

	return new Response('Internal server error', { status: 500 });
}
