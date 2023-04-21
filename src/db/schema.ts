import {
	boolean,
	customType,
	datetime,
	int,
	mysqlTable,
	serial,
	text,
	timestamp,
	uniqueIndex,
	varchar,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable(
	'users',
	{
		id: serial('id').primaryKey(),
		name: varchar('name', { length: 191 }).notNull(),
		email: varchar('email', { length: 191 }).notNull(),
		emailVerified: datetime('email_verified'),
		image: text('image'),
		password: text('password').notNull(),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
		isMockAccount: boolean('is_mock_account').default(false).notNull(),
	},
	(table) => ({
		emailIdx: uniqueIndex('email_idx').on(table.email),
	})
);

//add bigint unsigned to drizzle-orm
const bigintUnsigned = customType<{ data: number; driverData: string }>({
	dataType: () => 'bigint unsigned',
	fromDriver: (value) => Number(value),
});
export const listings = mysqlTable('listings', {
	id: serial('id').primaryKey(),
	ownerId: bigintUnsigned('owner_id').notNull(),
	//.references(() => users.id, { onDelete: 'cascade' }), not supported by planetscale
	category: varchar('category', { length: 191 }).notNull(),
	country: varchar('country', { length: 191 }).notNull(),
	state: varchar('state', { length: 191 }).notNull(),
	city: varchar('city', { length: 191 }).notNull(),
	postalCode: varchar('postal_code', { length: 191 }).notNull(),
	addressLine1: text('address_line_1').notNull(),
	addressLine2: text('address_line_2'),
	guestsCount: int('guests_count').notNull(),
	bedroomsCount: int('bedrooms_count').notNull(),
	bedsCount: int('beds_count').notNull(),
	bathroomsCount: int('baths_count').notNull(),
	imagesCSV: text('image_csv').notNull(),
	title: varchar('title', { length: 191 }).notNull(),
	description: text('description').notNull(),
	price: int('price').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});
