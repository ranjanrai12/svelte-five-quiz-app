<script lang="ts">
	import Header from '$lib/components/layout/header.svelte';
	import Footer from '$lib/components/layout/footer.svelte';
	import '../styles/global.css';
	const { children } = $props();
</script>

<div class="main-quiz-container-app">
	<Header />
	<main>
		{@render children()}
	</main>
	<Footer />
</div>

<style>
	.main-quiz-container-app {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	main {
		flex: 1;
		padding: 2rem;
	}
</style>
