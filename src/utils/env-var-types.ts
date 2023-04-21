declare global {
	namespace NodeJS {
		interface ProcessEnv {
			DATABASE_URL: string;
			UNSPLASH_ACCESS_KEY: string;
		}
	}
}

export {};
