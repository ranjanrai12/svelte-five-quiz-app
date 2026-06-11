<script lang="ts">
	import { goto } from '$app/navigation';
	// import { ROUTES } from '$lib/constants/routes';

	function startQuiz() {
		// goto(ROUTES.QUIZ);
        goto('/quiz')
	}
</script>

<section class="welcome">
	<h2>Welcome to Quiz Challenge</h2>

	<p>
		Test your knowledge and improve your skills.
	</p>

	<button onclick={startQuiz}>
		Start Quiz
	</button>
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
		padding: 0.75rem 1.5rem;
		cursor: pointer;
		border: none;
		border-radius: 6px;
	}
</style>