import { faker } from '@faker-js/faker';
import { hashSync } from 'bcrypt';
import 'dotenv/config';
import { createApi } from 'unsplash-js';
import db from '.';
import { listings, users } from './schema';

const USERS_NUMBER = 10;
const LISTINGS_PER_USER = 2;
const UNSPLASH_PARAMETERS = '?fm=webp&h=720&fit=max';

const password = hashSync('password', 10);

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

export async function seedUsers() {
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

	console.log('Clearing old users ...');
	await db.delete(users);
	console.log(`Start users seeding ...`);
	await Promise.all(insertUsersPromises);
	console.log(`Seeding users finished ✔`);
}

export async function seedListings() {
	let page = 1;
	const insertListingsPromises: Promise<unknown>[] = [];
	for (let ownerId = 1; ownerId < USERS_NUMBER + 1; ownerId++) {
		for (let index = 0; index < LISTINGS_PER_USER; index++) {
			console.log('fetching photos:', page, ownerId, index);
			const photosResponse = await unsplash.search.getPhotos({
				query: 'interior design',
				page,
				perPage: 5,
				orientation: 'landscape',
			});

			if (!photosResponse.response?.results)
				throw new Error('unsplash request failed');

			page++;
			const imagesCSV = photosResponse.response.results
				.map((image) => image.links.download + UNSPLASH_PARAMETERS)
				.join(',');

			insertListingsPromises.push(
				db.insert(listings).values({
					ownerId,
					category: faker.lorem.word(2),
					title: faker.lorem.words(2),
					description: faker.lorem.paragraphs(1),
					price: faker.datatype.number({ min: 10, max: 1000 }),
					addressLine1: faker.address.streetAddress(),
					addressLine2: faker.address.streetAddress(),
					city: faker.address.city(),
					state: faker.address.state(),
					country: faker.address.country(),
					bathroomsCount: faker.datatype.number({ min: 1, max: 5 }),
					bedroomsCount: faker.datatype.number({ min: 1, max: 5 }),
					bedsCount: faker.datatype.number({ min: 1, max: 5 }),
					guestsCount: faker.datatype.number({ min: 1, max: 5 }),
					postalCode: faker.address.zipCode(),
					imagesCSV,
				})
			);
		}
	}

	console.log('Clearing old listings ...');
	await db.delete(listings);
	console.log(`Start listings seeding ...`);
	await Promise.all(insertListingsPromises);
	console.log(`Seeding listings finished ✔`);
}
