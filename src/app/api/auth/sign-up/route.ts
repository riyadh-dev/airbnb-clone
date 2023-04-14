import db from '@/db';
import { users } from '@/db/schema';
import { signUpBodySchema } from '@/zod/user';
import { hash } from 'bcrypt';
import parseRouteHandlerBody from '../../parse-body';

export const POST = parseRouteHandlerBody(
	signUpBodySchema,
	async (parsedBody) => {
		const { email, password, name } = parsedBody;
		const hashedPassword = await hash(password, 12);
		await db.insert(users).values({
			email,
			name,
			password: hashedPassword,
		});
		return new Response('signed up successfully', { status: 200 });
	}
);
