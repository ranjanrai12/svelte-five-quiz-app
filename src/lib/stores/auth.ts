import { derived, writable } from 'svelte/store';
import { browser } from '$app/environment';
import type { AuthUser } from '$lib/types';

const STORAGE_KEY = 'quiz-user';

function readStoredUser(): AuthUser | null {
    // sessionStorage only exists in the browser to avoid a ReferenceError on SSR
    if (!browser) return null;

    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    try {
        return JSON.parse(raw) as AuthUser;
    } catch {
        sessionStorage.removeItem(STORAGE_KEY);
        return null;
    }
}

class AuthStore {
    readonly user = writable<AuthUser | null>(readStoredUser());
    readonly isLoggedIn = derived(this.user, (user) => user !== null);

    constructor() {
        if (browser) {
            this.user.subscribe((value) => {
                if (value) {
                    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value));
                } else {
                    sessionStorage.removeItem(STORAGE_KEY);
                }
            });
        }
    }

    login(userName: string) {
        this.user.set({ userName });
    }

    logout() {
        this.user.set(null);
    }
}

export const auth = new AuthStore();
