import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { isLoggedIn } from '$lib/stores/auth';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => {
    if (!get(isLoggedIn) && url.pathname !== '/login') {
        redirect(302, '/login');
    }
};
