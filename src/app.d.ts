import type { User } from 'firebase/auth';
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			isLogin: boolean | undefined;
			user: User | undefined;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
