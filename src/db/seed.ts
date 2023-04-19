import { faker } from '@faker-js/faker';
import { hashSync } from 'bcrypt';
import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/mysql2';
import { createPool } from 'mysql2/promise';
import { users } from './schema';
config();

const USERS_NUMBER = 15;
const password = hashSync('password', 10);

const db = drizzle(createPool(process.env.DATABASE_URL), {
	logger: true,
});

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
