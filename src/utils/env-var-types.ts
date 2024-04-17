declare global {
	namespace NodeJS {
		interface ProcessEnv {
			POSTGRES_URL: string
			UNSPLASH_ACCESS_KEY: string
		}
	}
}

export {}
