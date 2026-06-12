<script lang="ts">
    import { onMount } from "svelte";
    import QuestionInput from "$lib/components/quiz/QuestionInput.svelte";
    import { quiz } from "$lib/state/quiz.svelte";

    const currentQuestion = $derived(quiz.allQuestions[quiz.currentIndex]);

    const textValue = $derived.by(() => {
        const saved = quiz.getAnswer(currentQuestion.id);
        return typeof saved === "string" ? saved : "";
    });

    const multipleValue = $derived.by(() => {
        const saved = quiz.getAnswer(currentQuestion.id);
        return Array.isArray(saved) ? [...saved] : [];
    });

    onMount(() => {
        quiz.resetQuiz();
        quiz.loadQuestions();
    });

    function handleTextChange(value: string) {
        // handle the empty string use case
        value.trim()
            ? quiz.setAnswer(currentQuestion.id, value)
            : quiz.deleteAnswer(currentQuestion.id);
    }

    function handleRadio(option: string) {
        quiz.setAnswer(currentQuestion.id, option);
    }

    function toggleOption(option: string) {
        //  true means user already slected previosly and now deselecting, else it's a new item got selected
        const next = multipleValue.includes(option)
            ? multipleValue.filter((o) => o !== option)
            : [...multipleValue, option];

        next.length
            ? quiz.setAnswer(currentQuestion.id, next)
            : quiz.deleteAnswer(currentQuestion.id);
    }

    function handleSubmit() {
        console.log("handle submit");
    }
</script>

{#if quiz.loading}
    <div class="status">Loading.....</div>
{:else if currentQuestion}
    <div class="quiz-wrapper">
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
                onToggle={toggleOption}
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
                    disabled={quiz.currentIndex ===
                        quiz.allQuestions.length - 1}>Next</button
                >
            </div>
        </section>
    </div>
{/if}

<style lang="scss">
    .quiz-wrapper {
        max-width: 680px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 1.25rem;

        .quiz {
            background: white;
            border-radius: 12px;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
            padding: 2rem;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        h2 {
            font-size: 1.2rem;
            line-height: 1.6;
            color: #111827;
        }

        .actions {
            display: flex;
            gap: 0.75rem;
            padding-top: 0.5rem;
            border-top: 1px solid #f3f4f6;
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
            background: #1f2937;
            color: white;
            margin-left: auto;

            &:hover:not(:disabled) {
                background: #374151;
            }
        }

        .btn-secondary {
            background: #f3f4f6;
            color: #374151;

            &:hover:not(:disabled) {
                background: #e5e7eb;
            }
        }
    }
</style>
