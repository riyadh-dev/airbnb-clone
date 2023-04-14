import {
	boolean,
	datetime,
	mysqlTable,
	serial,
	text,
	timestamp,
	varchar,
} from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
	id: serial('id').primaryKey(),
	name: varchar('name', { length: 191 }).notNull(),
	email: varchar('email', { length: 191 }).notNull(),
	emailVerified: datetime('email_verified'),
	image: text('image'),
	password: text('password').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
	isMockAccount: boolean('is_mock_account').default(false).notNull(),
});
