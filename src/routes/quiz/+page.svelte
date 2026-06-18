<script lang="ts">
	import { onMount } from 'svelte';
	import QuestionInput from '$lib/components/quiz/QuestionInput.svelte';
	import { quiz } from '$lib/state/quiz.svelte';
	import ProgressBarReport from '$lib/components/quiz/ProgressBarReport.svelte';
	import { goto } from '$app/navigation';

	const currentQuestion = $derived(quiz.allQuestions[quiz.currentIndex]);
	const answeredCount = $derived(quiz.answers.size);
	const allAnswered = $derived(
		quiz.allQuestions.length > 0 && quiz.allQuestions.length === quiz.answers.size
	);

	const textValue = $derived.by(() => {
		if (!currentQuestion) return '';

		const saved = quiz.getAnswer(currentQuestion.id);
		return typeof saved === 'string' ? saved : '';
	});

	const multipleValue = $derived.by(() => {
		if (!currentQuestion) return [];

		const saved = quiz.getAnswer(currentQuestion.id);
		return Array.isArray(saved) ? [...saved] : [];
	});

	onMount(() => {
		quiz.resetQuiz();
		quiz.loadQuestions();
	});

	function handleTextChange(value: string) {
		value.trim()
			? quiz.setAnswer(currentQuestion.id, value)
			: quiz.deleteAnswer(currentQuestion.id);
	}

	function handleRadio(option: string) {
		quiz.setAnswer(currentQuestion.id, option);
	}

	function toggleOption(option: string) {
		const next = multipleValue.includes(option)
			? multipleValue.filter((o) => o !== option)
			: [...multipleValue, option];

		next.length ? quiz.setAnswer(currentQuestion.id, next) : quiz.deleteAnswer(currentQuestion.id);
	}

	function handleSubmit() {
		quiz.submitQuiz();
		goto('/quiz/results');
	}
</script>

{#if quiz.loading}
	<div class="status">Loading.....</div>
{:else if quiz.errorMessage}
	<div class="status error">{quiz.errorMessage}</div>
{:else if currentQuestion}
	<div class="quiz-wrapper">
		<ProgressBarReport
			total={quiz.allQuestions.length}
			answered={answeredCount}
			elapsed={quiz.timeElapsed}
			{allAnswered}
			onsubmit={handleSubmit}
		/>
		<section class="quiz">
			<p class="progress">
				Question {quiz.currentIndex + 1} of {quiz.allQuestions.length}
			</p>
			<h2>{currentQuestion.question}</h2>

			<QuestionInput
				question={currentQuestion}
				{textValue}
				{multipleValue}
				onTextChange={handleTextChange}
				onRadioChange={handleRadio}
				onCheckboxToggle={toggleOption}
			/>

			<div class="actions">
				<button
					class="btn-secondary"
					onclick={() => quiz.prevQuestion()}
					disabled={quiz.currentIndex === 0}>Back</button
				>
				<button
					class="btn-primary"
					onclick={() => quiz.nextQuestion()}
					disabled={quiz.currentIndex === quiz.allQuestions.length - 1}>Next</button
				>
			</div>
		</section>
	</div>
{/if}

<style lang="scss">
	.status {
		text-align: center;
		margin-top: 3rem;
		color: var(--text-muted);

		&.error {
			color: var(--error);
		}
	}

	.quiz-wrapper {
		max-width: 680px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		gap: 1.25rem;

		.quiz {
			background: var(--surface);
			border-radius: 12px;
			box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
			padding: 2rem;
			display: flex;
			flex-direction: column;
			gap: 1.5rem;
		}

		.progress {
			font-size: 0.8rem;
			font-weight: 600;
			color: var(--text-subtle);
			text-transform: uppercase;
			letter-spacing: 0.05em;
		}

		h2 {
			font-size: 1.2rem;
			line-height: 1.6;
			color: var(--text);
		}

		.actions {
			display: flex;
			gap: 0.75rem;
			padding-top: 0.5rem;
			border-top: 1px solid var(--surface-alt);
		}

		.btn-primary,
		.btn-secondary {
			padding: 0.6rem 1.5rem;
			cursor: pointer;
			border: none;
			border-radius: 6px;
			font-size: 0.95rem;
			font-weight: 500;
			transition: background 0.2s;

			&:disabled {
				opacity: 0.35;
				cursor: not-allowed;
			}
		}

		.btn-primary {
			background: var(--primary);
			color: white;
			margin-left: auto;

			&:hover:not(:disabled) {
				background: var(--primary-hover);
			}
		}

		.btn-secondary {
			background: var(--surface-alt);
			color: var(--primary-hover);

			&:hover:not(:disabled) {
				background: var(--border);
			}
		}
	}
</style>
