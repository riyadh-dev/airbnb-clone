import { relations } from 'drizzle-orm'
import {
	boolean,
	date,
	integer,
	pgTable,
	primaryKey,
	serial,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from 'drizzle-orm/pg-core'

export const users = pgTable(
	'users',
	{
		id: serial('id').primaryKey(),
		name: varchar('name', { length: 191 }).notNull(),
		email: varchar('email', { length: 191 }).notNull(),
		emailVerified: date('email_verified', { mode: 'date' }),
		image: text('image'),
		password: text('password').notNull(),
		createdAt: timestamp('created_at', { mode: 'date' })
			.defaultNow()
			.notNull(),
		updatedAt: timestamp('updated_at', { mode: 'date' })
			.defaultNow()
			.$onUpdate(() => new Date())
			.notNull(),
		isMockAccount: boolean('is_mock_account').default(false).notNull(),
	},
	(t) => ({
		emailIdx: uniqueIndex('email_idx').on(t.email),
	})
)

export const listings = pgTable('listings', {
	id: serial('id').primaryKey(),
	ownerId: integer('owner_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	category: varchar('category', { length: 191 }).notNull(),
	country: varchar('country', { length: 191 }).notNull(),
	state: varchar('state', { length: 191 }).notNull(),
	city: varchar('city', { length: 191 }).notNull(),
	postalCode: varchar('postal_code', { length: 191 }).notNull(),
	addressLine1: text('address_line_1').notNull(),
	addressLine2: text('address_line_2'),
	guestCount: integer('guests_count').notNull(),
	bedroomCount: integer('bedrooms_count').notNull(),
	bedCount: integer('beds_count').notNull(),
	bathroomCount: integer('baths_count').notNull(),
	imagesCSV: text('image_csv').notNull(),
	title: varchar('title', { length: 191 }).notNull(),
	description: text('description').notNull(),
	price: integer('price').notNull(),
	createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
	updatedAt: timestamp('updated_at', { mode: 'date' })
		.defaultNow()
		.$onUpdate(() => new Date())
		.notNull(),
})

export const userLikedListings = pgTable(
	'user_liked_listings',
	{
		userId: integer('user_id')
			.references(() => users.id, { onDelete: 'cascade' })
			.notNull(),
		listingId: integer('listing_id')
			.references(() => listings.id, { onDelete: 'cascade' })
			.notNull(),
	},
	(t) => ({
		pk: primaryKey({ columns: [t.userId, t.listingId] }),
	})
)

export const reservations = pgTable('reservations', {
	id: serial('id').primaryKey(),
	ownerId: integer('owner_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	listingId: integer('listing_id')
		.references(() => listings.id, { onDelete: 'cascade' })
		.notNull(),
	startDate: date('start_date', { mode: 'date' }).notNull(),
	endDate: date('end_date', { mode: 'date' }).notNull(),
	adultGuestCount: integer('adult_guest_count').notNull(),
	childGuestCount: integer('child_guest_count').notNull(),
	infantGuestCount: integer('infant_guest_count').notNull(),
	petCount: integer('pet_count').notNull(),
	totalCost: integer('total_cost').notNull(),
	createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
})

export const userRelations = relations(users, ({ many }) => ({
	reservations: many(reservations),
	userLikedListings: many(userLikedListings),
}))

export const listingRelations = relations(listings, ({ many }) => ({
	reservations: many(reservations),
	userLikedListings: many(userLikedListings),
}))

export const reservationRelations = relations(reservations, ({ one }) => ({
	user: one(users, {
		fields: [reservations.ownerId],
		references: [users.id],
	}),
	listing: one(listings, {
		fields: [reservations.listingId],
		references: [listings.id],
	}),
}))

export const userLikedListingsRelations = relations(
	userLikedListings,
	({ one }) => ({
		user: one(users, {
			fields: [userLikedListings.userId],
			references: [users.id],
		}),
		listing: one(listings, {
			fields: [userLikedListings.listingId],
			references: [listings.id],
		}),
	})
)
