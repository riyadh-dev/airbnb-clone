export { default } from 'next-auth/middleware';

export const config = {
	matcher: ['/became-a-host/:step*', '/wishlist', '/trips', '/properties'],
	pages: { signIn: '/' },
};
