import inquirer from 'inquirer';
import { seedListings, seedReservations, seedUsers } from '../src/db/seed';

inquirer
	.prompt([
		{
			type: 'checkbox',
			name: 'mock',
			message: 'choose witch data to mock',
			choices: [
				{ name: 'User', value: seedUsers },
				{ name: 'Listing', value: seedListings },
				{ name: 'Reservation', value: seedReservations },
			],
		},
	])
	.then(async (answers) => {
		for (const seedFunction of answers.mock) {
			await seedFunction();
		}
		process.exit(0);
	})
	.catch((error) => {
		if (error instanceof Error) console.error(error.message);
		process.exit(1);
	});
