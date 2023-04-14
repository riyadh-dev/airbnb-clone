import { faker } from '@faker-js/faker';
import { connect } from '@planetscale/database';
import { hashSync } from 'bcrypt';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { users } from './schema';

const USERS_NUMBER = 15;
const password = hashSync('password', 10);

export const db = drizzle(
	connect({ url: process.env.DATABASE_URL as string }),
	{
		logger: true,
	}
);

const insertUsersPromises: Promise<unknown>[] = [];
for (let index = 0; index < USERS_NUMBER; index++) {
	const sex = index % 2 ? 'male' : 'female';
	insertUsersPromises.push(
		db.insert(users).values({
			name: faker.name.fullName({ sex }),
			email: faker.internet.email(),
			image: `https://xsgames.co/randomusers/assets/avatars/${sex}/${index}.jpg`,
			password,
			isMockAccount: true,
		})
	);
}

async function dbSeed() {
	console.log('Clearing old data ...');
	await db.delete(users);
	console.log(`Start seeding ...`);
	await Promise.all(insertUsersPromises);
	console.log(`Seeding finished.`);
}

dbSeed()
	.then(() => process.exit(0))
	.catch(async (e) => {
		console.error(e);
		process.exit(1);
	});
