import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { auth } from '$lib/stores/auth';
import { ROUTES } from '$lib/constants/routes';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = ({ url }) => {
    if (!get(auth.isLoggedIn) && url.pathname !== ROUTES.login) {
        throw redirect(302, ROUTES.login);
    }
};
