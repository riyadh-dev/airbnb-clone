export default function errorHandler(error: unknown) {
	return new Response('Internal server error', { status: 500 });
}
