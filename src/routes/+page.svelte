<script lang="ts">
	import { goto } from '$app/navigation';

	function startQuiz() {
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
		padding: 0.75rem 2rem;
		cursor: pointer;
		border: none;
		border-radius: 6px;
		background: #1f2937;
		color: white;
		font-size: 1rem;
		font-weight: 500;
	}
</style>