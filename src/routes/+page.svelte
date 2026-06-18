<script lang="ts">
	import { goto } from "$app/navigation";
	import { get } from 'svelte/store';
	import { isLoggedIn } from '$lib/stores/auth';

	function startQuiz() {
		if (get(isLoggedIn)) {
			goto('/quiz');
		} else {
			goto('/login');
		}
	}
</script>

<section class="welcome">
	<h2>Welcome to Quiz Challenge</h2>

	<button onclick={startQuiz}> Start Quiz </button>
</section>

<style>
	.welcome {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin-top: 5rem;
	}

	button {
		padding: 0.75rem 2rem;
		cursor: pointer;
		border: none;
		border-radius: 6px;
		background: var(--primary);
		color: white;
		font-size: 1rem;
		font-weight: 500;
	}
</style>
