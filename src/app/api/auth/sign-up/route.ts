import { exclude } from '@/common/utils';
import prisma from '@/lib/prisma';
import { signUpBodySchema } from '@/zod/user';
import { hash } from 'bcrypt';
import { NextResponse } from 'next/server';
import parseRouteHandlerBody from '../../parse-body';

export const POST = parseRouteHandlerBody(
	signUpBodySchema,
	async (parsedBody) => {
		const { email, password, name } = parsedBody;
		const hashedPassword = await hash(password, 12);
		const user = await prisma.user.create({
			data: {
				email,
				name,
				password: hashedPassword,
			},
		});
		return NextResponse.json(exclude(user, ['password']));
	}
);
