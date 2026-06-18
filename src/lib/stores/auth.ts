import { derived, writable } from 'svelte/store';

interface AuthUser {
    userName: string;
}

export const user = writable<AuthUser | null>(null);

export const isLoggedIn = derived(user, (user) => user !== null);

export function logout() {
    user.set(null);
}
