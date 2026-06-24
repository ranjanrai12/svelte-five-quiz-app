<script lang="ts">
	import { goto } from '$app/navigation';
	import { ROUTES } from '$lib/constants';
	import { auth } from '$lib/stores';

	let userName = $state('');
	const trimmedName = $derived(userName.trim());
	const isValid = $derived(trimmedName.length >= 3);

	function handleStart(event: SubmitEvent) {
		event.preventDefault();
		if (!isValid) return;
		auth.login(trimmedName);
		goto(ROUTES.quiz);
	}
</script>

<div class="register-wrapper">
	<div class="register-card">
		<h1>Welcome to Quiz Challenge</h1>
		<p class="subtitle">Enter your name to begin</p>
		<form onsubmit={handleStart}>
			<div class="field">
				<input
					id="userName"
					type="text"
					name="userName"
					placeholder="Enter your name"
					bind:value={userName}
					class:invalid={userName.length > 0 && !isValid}
				/>
				{#if userName.length > 0 && !isValid}
					<span class="field-error">User Name must be at least 3 characters long</span>
				{/if}
			</div>

			<button type="submit" disabled={!isValid}>Start Quiz</button>
		</form>
	</div>
</div>

<style>
	.register-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: calc(100vh - 10rem);
	}

	.register-card {
		background: var(--surface);
		border-radius: 12px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		padding: 2.5rem;
		width: 100%;
		max-width: 400px;
	}

	h1 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--text);
		margin-bottom: 0.25rem;
	}

	.subtitle {
		color: var(--text-muted);
		margin-bottom: 1.25rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.field {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	input {
		padding: 0.6rem 0.85rem;
		border: 1px solid var(--border-strong);
		border-radius: 6px;
		font-size: 0.95rem;
		background: var(--bg);
		color: var(--text);
		transition: border-color 0.15s;
	}

	input:focus {
		outline: none;
		border-color: var(--primary);
	}

	input::placeholder {
		color: var(--text-subtle);
	}

	input.invalid {
		border-color: var(--error);
	}

	.field-error {
		font-size: 0.8rem;
		color: var(--error);
	}

	button[type='submit'] {
		width: 100%;
		padding: 0.7rem;
		background: var(--primary);
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
	}

	button[type='submit']:hover:not(:disabled) {
		background: var(--primary-hover);
	}

	button[type='submit']:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	@media (max-width: 640px) {
		.register-card {
			padding: 1.5rem;
		}
	}
</style>
