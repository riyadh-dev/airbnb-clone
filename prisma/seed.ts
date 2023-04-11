import { faker } from '@faker-js/faker';
import { Prisma, PrismaClient } from '@prisma/client';
import { hashSync } from 'bcrypt';

const USERS_NUMBER = 15;
const password = hashSync('password', 10);

const prisma = new PrismaClient();
const userData: Prisma.UserCreateInput[] = [];

for (let index = 0; index < USERS_NUMBER; index++) {
	const sex = index % 2 ? 'male' : 'female';
	userData.push({
		name: faker.name.fullName({ sex }),
		email: faker.internet.email(),
		avatar: `https://xsgames.co/randomusers/assets/avatars/${sex}/${index}.jpg`,
		password,
		isMockAccount: true,
	});
}

async function main() {
	console.log('Clearing old data ...');
	await prisma.user.deleteMany();
	console.log(`Start seeding ...`);
	await prisma.user.createMany({ data: userData });
	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
