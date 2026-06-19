<script lang="ts">
	import { goto } from "$app/navigation";
	import { ROUTES } from '$lib/constants';

	function startQuiz() {
		goto(ROUTES.quiz);
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

	@media (max-width: 640px) {
		.welcome {
			margin-top: 3rem;
		}

		.welcome h2 {
			font-size: 1.3rem;
			text-align: center;
		}
	}
</style>
