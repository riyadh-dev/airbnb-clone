import { z } from 'zod';

export const signUpBodySchema = z.object({
	name: z.string().min(2),
	email: z.string().email().toLowerCase(),
	password: z.string().min(8),
});

export const signUpInputSchema = signUpBodySchema
	.extend({
		confirmEmail: z.string().email().toLowerCase(),
		confirmPassword: z.string().min(8),
	})
	.refine((data) => data.confirmEmail === data.email, {
		message: 'Emails do not match',
		path: ['confirmEmail'],
	})
	.refine((data) => data.confirmPassword === data.password, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	});

export const loginInputSchema = signUpBodySchema.pick({
	email: true,
	password: true,
});
