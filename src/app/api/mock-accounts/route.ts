import { exclude } from '@/common/utils';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const users = await prisma.user.findMany({
			where: { isMockAccount: true },
		});
		return NextResponse.json(users.map((user) => exclude(user, ['password'])));
	} catch {
		return new Response('DB Error', { status: 502 });
	}
}
