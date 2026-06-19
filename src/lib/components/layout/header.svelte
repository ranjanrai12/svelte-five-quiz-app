<script lang="ts">
	import { goto } from '$app/navigation';
	import { auth } from '$lib/stores';
	import { ROUTES } from '$lib/constants';

	const { user, isLoggedIn } = auth;

	function handleLogout() {
		auth.logout();
		goto(ROUTES.login);
	}
</script>

<header class="main-header">
	<a href={ROUTES.home} class="brand">Quiz Challenge</a>

	{#if $isLoggedIn}
		<nav>
			<a href={ROUTES.home}>Home</a>
			<a href={ROUTES.quiz}>Start Quiz</a>
			<span class="user-label">{$user?.userName}</span>
			<button class="logout-btn" onclick={handleLogout}>Logout</button>
		</nav>
	{/if}
</header>

<style>
	.main-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
		background: var(--primary);
		color: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
	}

	.brand {
		font-size: 1.25rem;
		font-weight: 700;
		color: white;
		text-decoration: none;
		letter-spacing: 0.5px;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	nav a {
		color: var(--border-strong);
		text-decoration: none;
		font-size: 0.95rem;
		transition: color 0.2s;
	}

	nav a:hover {
		color: white;
	}

	.user-label {
		font-size: 0.875rem;
		color: var(--border-strong);
		padding: 0.25rem 0.6rem;
		background: rgba(255, 255, 255, 0.1);
		border-radius: 4px;
	}

	.logout-btn {
		background: transparent;
		border: 1px solid rgba(255, 255, 255, 0.3);
		color: var(--border-strong);
		font-size: 0.875rem;
		padding: 0.3rem 0.75rem;
		border-radius: 4px;
		cursor: pointer;
	}

	.logout-btn:hover {
		background: rgba(255, 255, 255, 0.15);
		color: white;
	}

	@media (max-width: 640px) {
		.main-header {
			flex-wrap: wrap;
			gap: 0.75rem 1rem;
			padding: 0.85rem 1rem;
		}

		nav {
			width: 100%;
			gap: 1rem;
			flex-wrap: wrap;
		}

		nav a {
			font-size: 0.9rem;
		}
	}
</style>
