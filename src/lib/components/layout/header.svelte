<header class="main-header">
	<a href="/" class="brand">Quiz Challenge</a>
	<nav>
		<a href="/">Home</a>
		<a href="/quiz">Start Quiz</a>
	</nav>
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
</style>