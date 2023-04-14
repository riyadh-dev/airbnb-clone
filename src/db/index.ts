import { connect } from '@planetscale/database';
import { drizzle as mysqlDrizzle } from 'drizzle-orm/mysql2';
import { drizzle as planetscaleDrizzle } from 'drizzle-orm/planetscale-serverless';
import { createPool } from 'mysql2/promise';

const IS_PROD = process.env.NODE_ENV === 'production';

const db = IS_PROD
	? planetscaleDrizzle(connect({ url: process.env.DATABASE_URL }))
	: mysqlDrizzle(createPool(process.env.DATABASE_URL as string), {
			logger: true,
	  });

export default db;
