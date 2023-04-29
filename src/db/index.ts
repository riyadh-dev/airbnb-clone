import { connect } from '@planetscale/database';
import { drizzle as planetscaleDrizzle } from 'drizzle-orm/planetscale-serverless';
//import { drizzle as mysqlDrizzle } from 'drizzle-orm/mysql2';
//import { createPool } from 'mysql2/promise';

const db = planetscaleDrizzle(connect({ url: process.env.DATABASE_URL }));

//const db = mysqlDrizzle(createPool(process.env.DATABASE_URL as string), {
//logger: true,
//});

export default db;
