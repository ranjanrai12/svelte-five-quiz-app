<script lang="ts">
    import type { QuizQuestion } from "$lib/types/quiz";

	interface Props {
		question: QuizQuestion;
		textValue: string;
		multipleValue: string[];
		onTextChange: (value: string) => void;
		onRadioChange: (option: string) => void;
		onToggle: (option: string) => void;
	}

	const { question, textValue, multipleValue, onTextChange, onRadioChange, onToggle }: Props = $props();
</script>

{#if question.type === 'radio'}
	<div class="options">
		{#each question.options as option}
			<label class="option-card" class:selected={textValue === option}>
				<input
					type="radio"
					name="answer"
					value={option}
					checked={textValue === option}
					onchange={() => onRadioChange(option)}
				/>
				<span>{option}</span>
			</label>
		{/each}
	</div>
{:else if question.type === 'multiple'}
	<div class="options">
		{#each question.options as option}
			<label class="option-card" class:selected={multipleValue.includes(option)}>
				<input
					type="checkbox"
					checked={multipleValue.includes(option)}
					onchange={() => onToggle(option)}
				/>
				<span>{option}</span>
			</label>
		{/each}
	</div>
{:else if question.type === 'textbox'}
	<input
		type="text"
		value={textValue}
		oninput={(e) => onTextChange(e.currentTarget.value)}
	/>
{:else if question.type === 'textarea'}
	<textarea
		value={textValue}
		oninput={(e) => onTextChange(e.currentTarget.value)}
	></textarea>
{/if}

<style>
	.options {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.option-card {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 1rem;
		border: 2px solid var(--border);
		border-radius: 8px;
		cursor: pointer;
		transition: border-color 0.15s, background 0.15s;
	}

	.option-card:hover {
		border-color: var(--text-subtle);
		background: var(--bg);
	}

	.option-card.selected {
		border-color: var(--primary);
		background: var(--surface-alt);
	}

	.option-card input {
		accent-color: var(--primary);
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
	}

	input[type='text'],
	textarea {
		width: 100%;
		padding: 0.6rem 0.875rem;
		border: 2px solid var(--border);
		border-radius: 8px;
		font-size: 1rem;
		outline: none;
		transition: border-color 0.15s;
	}

	input[type='text']:focus,
	textarea:focus {
		border-color: var(--primary);
	}

	textarea {
		resize: vertical;
		min-height: 110px;
	}
</style>
