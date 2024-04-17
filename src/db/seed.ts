import { faker } from '@faker-js/faker'
import { hashSync } from 'bcrypt'
import 'dotenv/config'
import { createApi } from 'unsplash-js'
import db from '.'
import { listings, reservations, users } from './schema'

const USERS_NUMBER = 10
const LISTINGS_PER_USER = 2
const RESERVATION_PER_USER = 3

const UNSPLASH_PARAMETERS = '?fm=webp&h=720&fit=max'

const password = hashSync('password', 10)

const unsplash = createApi({
	accessKey: process.env.UNSPLASH_ACCESS_KEY,
})

const LISTING_CATEGORIES = [
	'Trending',
	'Amazing views',
	'Tiny homes',
	'OMG!',
	'Golfing',
	'Private rooms',
	'Beachfront',
	'Boats',
	'Amazing pools',
	'Bed and breakfast',
	'Castles',
	'Bowling',
	'Cabins',
	'Towers',
] as const

export async function seedUsers() {
	const insertUsersPromises: Promise<unknown>[] = []
	for (let index = 0; index < USERS_NUMBER; index++) {
		const sex = index % 2 ? 'male' : 'female'
		insertUsersPromises.push(
			db.insert(users).values({
				name: faker.person.fullName({ sex }),
				email: faker.internet.email(),
				image: `https://xsgames.co/randomusers/assets/avatars/${sex}/${index}.jpg`,
				password,
				isMockAccount: true,
			})
		)
	}

	console.log('Clearing old users 🙉 🕐')
	await db.delete(users)
	console.log(`Users seeding 🙉 🕐`)
	await Promise.all(insertUsersPromises)
	console.log(`Seeding users finished 🙉 ✅`)
}

export async function seedListings() {
	let page = 1
	let listing_count = 0
	const insertListingsPromises: Promise<unknown>[] = []
	for (let ownerId = 1; ownerId < USERS_NUMBER + 1; ownerId++) {
		for (let index = 0; index < LISTINGS_PER_USER; index++) {
			const photosResponse = await unsplash.search.getPhotos({
				query: 'interior design',
				page,
				perPage: 5,
				orientation: 'landscape',
			})

			if (!photosResponse.response?.results)
				throw new Error('unsplash request failed')

			page++
			const imagesCSV = photosResponse.response.results
				.map((image) => image.links.download + UNSPLASH_PARAMETERS)
				.join(',')

			insertListingsPromises.push(
				db.insert(listings).values({
					ownerId,
					category:
						LISTING_CATEGORIES[
							listing_count % LISTING_CATEGORIES.length
						],
					title: faker.lorem.words(2),
					description: faker.lorem.paragraphs(1),
					price: faker.number.int({ min: 10, max: 1000 }),
					addressLine1: faker.location.streetAddress(),
					addressLine2: faker.location.streetAddress(),
					city: faker.location.city(),
					state: faker.location.state(),
					country: faker.location.country(),
					bathroomCount: faker.number.int({ min: 1, max: 5 }),
					bedroomCount: faker.number.int({ min: 1, max: 5 }),
					bedCount: faker.number.int({ min: 1, max: 5 }),
					guestCount: faker.number.int({ min: 1, max: 5 }),
					postalCode: faker.location.zipCode(),
					imagesCSV,
				})
			)

			listing_count++
		}
	}

	console.log('Clearing old listings 🛌 🕐')
	await db.delete(listings)
	console.log(`Listings seeding 🛌 🕐`)
	await Promise.all(insertListingsPromises)
	console.log(`Seeding listings finished 🛌 ✅`)
}

export async function seedReservations() {
	const insertReservationPromises: Promise<unknown>[] = []
	let listingId = 1
	for (let ownerId = 1; ownerId < USERS_NUMBER + 1; ownerId++) {
		for (let index = 0; index < RESERVATION_PER_USER; index++) {
			insertReservationPromises.push(
				db.insert(reservations).values({
					ownerId,
					listingId,
					startDate: faker.date.recent({ days: 356 }),
					endDate: faker.date.recent({ days: 356 }),
					adultGuestCount: faker.number.int({ min: 1, max: 5 }),
					childGuestCount: faker.number.int({ min: 0, max: 3 }),
					infantGuestCount: faker.number.int({ min: 0, max: 3 }),
					petCount: faker.number.int({ min: 0, max: 3 }),
					totalCost: faker.number.int({ min: 10, max: 1000000 }),
				})
			)
			listingId++
		}
	}

	console.log('Clearing old reservation 🧾 🕐')
	await db.delete(reservations)
	console.log(`Reservation seeding 🧾 🕐`)
	await Promise.all(insertReservationPromises)
	console.log(`Seeding reservation finished 🧾 ✅`)
}
