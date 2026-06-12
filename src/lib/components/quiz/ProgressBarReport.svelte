<script lang="ts">
	interface Props {
		total: number;
		answered: number;
		elapsed: number;
		allAnswered: boolean;
		onsubmit: () => void;
	}

	const { total, answered, elapsed, allAnswered, onsubmit }: Props = $props();

	function formatTime(seconds: number): string {
		const m = String(Math.floor(seconds / 60)).padStart(2, "0");
		const s = String(seconds % 60).padStart(2, "0");
		return `${m}:${s}`;
	}

	const progress = $derived(
		total > 0 ? Math.round((answered / total) * 100) : 0,
	);
</script>

<div class="status-bar">
	<div class="stats">
		<div class="stat-item">
			<span class="stat-label">Answered</span>
			<span class="stat-value">{answered} / {total}</span>
		</div>
		<div class="divider"></div>
		<div class="stat-item">
			<span class="stat-label">Time</span>
			<span class="stat-value timer">{formatTime(elapsed)}</span>
		</div>
	</div>

	<div class="progress-wrap">
		<div class="progress-bar">
			<div class="progress-fill" style="width: {progress}%"></div>
		</div>
	</div>

	<button onclick={onsubmit} disabled={!allAnswered}>Submit Quiz</button>
</div>

<style>
	.status-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1.5rem;
		padding: 0.85rem 1.5rem;
		background: white;
		border-radius: 10px;
		box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);

		.stats {
			display: flex;
			align-items: center;
			gap: 1rem;
		}

		.stat-item {
			display: flex;
			flex-direction: column;
			gap: 0.1rem;

			.stat-label {
				font-size: 0.7rem;
				color: #9ca3af;
				text-transform: uppercase;
				letter-spacing: 0.05em;
			}

			.stat-value {
				font-size: 0.95rem;
				font-weight: 600;
				color: #111827;
			}

			&.timer {
				font-variant-numeric: tabular-nums;
			}
		}

		.divider {
			width: 1px;
			height: 2rem;
			background: #e5e7eb;
		}

		.progress-wrap {
			flex: 1;

			.progress-bar {
				height: 6px;
				background: #e5e7eb;
				border-radius: 99px;
				overflow: hidden;

				.progress-fill {
					height: 100%;
					background: #1f2937;
					border-radius: 99px;
					transition: width 0.3s ease;
				}
			}
		}

		button {
			padding: 0.55rem 1.25rem;
			border: none;
			border-radius: 6px;
			background: #1f2937;
			color: white;
			font-size: 0.875rem;
			font-weight: 500;
			cursor: pointer;
			white-space: nowrap;
			transition: background 0.2s;

			&:hover:not(:disabled) {
				background: #374151;
			}

			&:disabled {
				opacity: 0.35;
				cursor: not-allowed;
			}
		}
	}
</style>
