import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { auth } from '$lib/stores';
import { ROUTES } from '$lib/constants';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => {
    const loggedIn = get(auth.isLoggedIn);

    if (!loggedIn && url.pathname !== ROUTES.home) {
        throw redirect(302, ROUTES.home);
    }

    if (loggedIn && url.pathname === ROUTES.home) {
        throw redirect(302, ROUTES.quiz);
    }
};
