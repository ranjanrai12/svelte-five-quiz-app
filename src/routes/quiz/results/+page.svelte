<script lang="ts">
	import { goto } from "$app/navigation";
	import { quiz } from "$lib/state/quiz.svelte";
	import type { QuizQuestion } from "$lib/types/quiz";

	function formatTime(seconds: number): string {
		const m = String(Math.floor(seconds / 60)).padStart(2, "0");
		const s = String(seconds % 60).padStart(2, "0");
		return `${m}:${s}`;
	}

	function checkAnswer(
		question: QuizQuestion,
		answer: string | string[],
	): boolean {
		switch (question.type) {
			case "multiple": {
				const correct = [...question.correctAnswer].sort();
				const selected = [...(answer as string[])].sort();

				return (
					correct.length === selected.length &&
					correct.every((item, index) => item === selected[index])
				);
			}

			case "textbox":
				return (
					(answer as string).trim().toLowerCase() ===
					(question.correctAnswer as string).toLowerCase()
				);

			case "textarea":
				return (answer as string).trim().length > 0;

			default:
				return answer === question.correctAnswer;
		}
	}

	const results = $derived(
		quiz.allQuestions.map((q) => ({
			question: q,
			userAnswer: quiz.answers.get(q.id) ?? "",
			correct: checkAnswer(q, quiz.answers.get(q.id) ?? ""),
		})),
	);

	const score = $derived(results.filter((r) => r.correct).length);

	function handleRetake() {
		quiz.resetQuiz();
		goto("/quiz");
	}
</script>

{#if quiz.allQuestions.length === 0}
	<section class="empty">
		<p>No quiz results found.</p>
		<a href="/">Go Home</a>
	</section>
{:else}
	<section class="results">
		<div class="summary">
			<h2>You scored {score} / {quiz.allQuestions.length}</h2>
			<p class="time">Completed in {formatTime(quiz.timeElapsed)}</p>
		</div>

		<ol class="breakdown">
			{#each results as result, i}
				<li class="item {result.correct ? 'correct' : 'wrong'}">
					<p class="question-text">
						{i + 1}. {result.question.question}
					</p>
					<p class="answer-row">
						<span class="label">Your answer:</span>
						<span
							>{Array.isArray(result.userAnswer)
								? result.userAnswer.join(", ")
								: result.userAnswer || "—"}</span
						>
					</p>
					{#if !result.correct}
						<p class="answer-row">
							<span class="label">Correct answer:</span>
							<span
								>{Array.isArray(result.question.correctAnswer)
									? result.question.correctAnswer.join(", ")
									: result.question.correctAnswer}</span
							>
						</p>
					{/if}
				</li>
			{/each}
		</ol>

		<div class="actions">
			<button onclick={handleRetake}>Retake Quiz</button>
			<button class="secondary" onclick={() => goto("/")}>Go Home</button>
		</div>
	</section>
{/if}

<style>
	.empty {
		text-align: center;
		margin-top: 4rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.results {
		max-width: 680px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.summary {
		text-align: center;
	}

	.summary h2 {
		font-size: 1.75rem;
		font-weight: 700;
	}

	.time {
		color: #6b7280;
		margin-top: 0.25rem;
	}

	.breakdown {
		list-style: none;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.item {
		padding: 1rem;
		border-radius: 8px;
		border-left: 4px solid;
	}

	.correct {
		background: #f0fdf4;
		border-color: #16a34a;
	}

	.wrong {
		background: #fef2f2;
		border-color: #dc2626;
	}

	.question-text {
		font-weight: 500;
		margin-bottom: 0.4rem;
	}

	.answer-row {
		font-size: 0.9rem;
		color: #374151;
		display: flex;
		gap: 0.4rem;
	}

	.label {
		color: #6b7280;
	}

	.actions {
		display: flex;
		gap: 0.75rem;
	}

	button {
		padding: 0.65rem 1.5rem;
		border: none;
		border-radius: 6px;
		background: #1f2937;
		color: white;
		font-size: 0.95rem;
		cursor: pointer;
		transition: background 0.2s;
	}

	button:hover {
		background: #374151;
	}

	button.secondary {
		background: #e5e7eb;
		color: #1f2937;
	}

	button.secondary:hover {
		background: #d1d5db;
	}
</style>
