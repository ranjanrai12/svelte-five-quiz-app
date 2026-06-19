import { derived, writable } from 'svelte/store';
import type { AuthUser } from '$lib/types/auth';

export const user = writable<AuthUser | null>(null);

export const isLoggedIn = derived(user, (user) => user !== null);

export function logout() {
    user.set(null);
}
