<script lang="ts">
	import { goto } from '$app/navigation';
	import { user } from '$lib/stores/auth';

	let userName = $state('');
	let error = $state('');

	function handleLogin(event: SubmitEvent) {
		event.preventDefault();
		const name = userName.trim();
		if (!name) {
			error = 'User Name is required';
			return;
		}
        if (name.length < 3) {
            error = "User Name must be at least 3 characters long";
            return;
        }
		user.set({ userName: name });
		goto('/');
	}
</script>

<div class="login-wrapper">
	<div class="login-card">
		<h1>Sign in</h1>
		<form onsubmit={handleLogin}>
			<div class="field">
				<input
					id="userName"
					type="text"
					name="userName"
					placeholder="Enter your name"
					bind:value={userName}
					class:invalid={error}
				/>
				{#if error}
					<span class="field-error">{error}</span>
				{/if}
			</div>

			<button type="submit">Sign in</button>
		</form>
	</div>
</div>

<style>
	.login-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: calc(100vh - 10rem);
	}

	.login-card {
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

	button[type='submit']:hover {
		background: var(--primary-hover);
	}
</style>
