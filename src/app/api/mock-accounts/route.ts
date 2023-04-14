import db from '@/db';
import { users } from '@/db/schema';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const mockedUsers = await db
			.select({
				id: users.id,
				name: users.name,
				email: users.email,
				image: users.image,
			})
			.from(users);
		return NextResponse.json(mockedUsers);
	} catch (e) {
		return new Response('DB Error', { status: 502 });
	}
}
