import { redirect } from '@sveltejs/kit';
import { get } from 'svelte/store';
import { auth } from '$lib/stores';
import { ROUTES } from '$lib/constants';
import type { LayoutLoad } from './$types';

// `ssr` is a reserved "page option" name that SvelteKit reads automatically —
// we never call it ourselves; the framework imports this file and checks it.
// Setting it to `false` turns off server-side rendering, so this app runs as a
// pure client-side SPA (every route renders in the browser only).
//
// Why we need that here: our auth/quiz state lives in sessionStorage and
// in-memory stores, which DON'T exist on the server. With SSR on, the server
// always sees the user as logged out and redirects to "/", while the browser
// (where sessionStorage exists) sees them logged in and redirects back — an
// infinite redirect loop. Disabling SSR makes the guard below run only where
// the state actually exists, so server and client always agree.
export const ssr = false;

// `load` is another reserved name: SvelteKit runs this before rendering any
// route under this layout. We use it as a route guard. Thanks to `ssr = false`,
// it runs in the browser only, so `sessionStorage`-backed auth is reliable here.
export const load: LayoutLoad = ({ url }) => {
    // Check if there is a logged-in user right now (read once from the auth store)
    const loggedIn = get(auth.isLoggedIn);

    // Not logged in and trying to open any page other than the login page then send back to login.
    if (!loggedIn && url.pathname !== ROUTES.home) {
        throw redirect(302, ROUTES.home);
    }

    // Already logged in but sitting on the login page then skip straight to the quiz.
    if (loggedIn && url.pathname === ROUTES.home) {
        throw redirect(302, ROUTES.quiz);
    }
};
