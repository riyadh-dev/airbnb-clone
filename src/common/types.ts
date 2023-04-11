import { loginInputSchema, signUpBodySchema } from '@/zod/user';
import { UserModel } from '@zod-schemas/user';
import { z } from 'zod';

export type TLoginInSignUpFormTypes = 'sign-up' | 'login' | 'mock-list';
export type TSignUpBody = z.infer<typeof signUpBodySchema>;
export type TLoginInput = z.infer<typeof loginInputSchema>;

export type TUiUser = Omit<z.infer<typeof UserModel>, 'password'>;

export type TThemeRemixIcon =
	| 'ri-moon-line'
	| 'ri-computer-line'
	| 'ri-sun-line';
