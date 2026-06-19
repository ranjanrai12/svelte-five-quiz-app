import { derived, writable } from 'svelte/store';
import type { AuthUser } from '$lib/types';

class AuthStore {
    readonly user = writable<AuthUser | null>(null);
    readonly isLoggedIn = derived(this.user, (user) => user !== null);

    login(userName: string) {
        this.user.set({ userName });
    }

    logout() {
        this.user.set(null);
    }
}

export const auth = new AuthStore();
