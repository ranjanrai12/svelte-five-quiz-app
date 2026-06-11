<script lang="ts">
	import { page } from '$app/state';
</script>

<section class="error">
	<h2>{page.error?.message}</h2>
	<a href="/">Go back home</a>
</section>

<style>
	.error {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
		margin-top: 5rem;
	}
</style>
