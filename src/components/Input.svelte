<script context="module" lang="ts">
	export type InputRef = {
		triggerError: (message?: string) => void;
		focus: () => void;
	};
</script>

<script lang="ts">
	import { error } from '@sveltejs/kit';

	import { createEventDispatcher } from 'svelte';
	import type { HTMLInputAttributes } from 'svelte/elements';
	export let label = '';
	export let type: HTMLInputAttributes['type'] = 'text';
	export let placeholder: HTMLInputAttributes['placeholder'] = '';
	export let autocomplete: HTMLInputAttributes['autocomplete'] = '';
	export let minlength: HTMLInputAttributes['minlength'] = undefined;
	export let required: HTMLInputAttributes['required'] = false;
	export let value = '';

	let hasError = false;
	let errorMessage = '';

	let inputRef: HTMLInputElement;

	export const ref: InputRef = {
		triggerError: (message) => {
			hasError = true;
			errorMessage = message ?? '';
		},
		focus: () => {
			inputRef.focus();
		}
	};

	const dispatch = createEventDispatcher<{
		input: { value: string };
	}>();

	const onInput = (e: Event) => {
		value = (e.target as HTMLInputElement).value;
		errorMessage = '';
		hasError = false;
		dispatch('input', { value });
	};

	const onInvalid = (e: Event) => {
		e.preventDefault();
		const target = e.target as HTMLInputElement;
		const { validity } = target;
		if (validity.valueMissing) {
			errorMessage = "Can't be empty";
		} else if (validity.typeMismatch) {
			if (type === 'email') {
				errorMessage = 'Invalid email';
			} else {
				errorMessage = 'Invalid';
			}
		} else if (validity.tooShort) {
			errorMessage = 'Too short';
		} else {
			errorMessage = 'Please check again';
		}
	};
</script>

<label
	>{label}
	<div>
		<input
			on:invalid={onInvalid}
			bind:this={inputRef}
			class:error={!!hasError}
			{required}
			{type}
			{placeholder}
			{autocomplete}
			{value}
			{minlength}
			on:input={onInput}
		/>
		<span>{errorMessage}</span>
	</div>
</label>

<style lang="scss">
	label {
		font-size: 0.75rem;

		div {
			position: relative;
			input {
				--clr-focus-rgb: var(--clr-primary-400-rgb);
				margin-top: 0.25rem;
				width: 100%;
				font-size: 1rem;
				display: block;
				border-radius: 0.5rem;
				padding: 0.75rem 1rem;
				border: 1px solid var(--clr-base-600);
				background: none no-repeat 1rem center;
				color: var(--base-400);

				transition: all var(--anim-duration);

				&.error {
					--clr-focus-rgb: var(--clr-accent-rgb);
					color: var(--clr-accent);
					border-color: var(--clr-accent);
				}

				&[type='email'],
				&[type='url'],
				&[type='password'] {
					padding-left: 2.75rem;
					background-color: white;
					background-repeat: no-repeat;
					background-position: 1rem center;

					&[type='email'] {
						background-image: url('/images/icon-email.svg');
					}

					&[type='url'] {
						background-image: url('/images/icon-link.svg');
					}

					&[type='password'] {
						background-image: url('/images/icon-password.svg');
					}
				}

				&:focus {
					outline: none;
					border: 1px solid rgb(var(--clr-focus-rgb));
					box-shadow: 0 0 2rem rgba(var(--clr-focus-rgb), 25%);
				}

				&::-webkit-input-placeholder {
					color: var(--clr-base-400);
					opacity: 0.5;
				}
			}

			span {
				color: var(--clr-accent);
				font-size: 0.75rem;
				position: absolute;
				right: 0;
				top: 50%;
				transform: translateY(-50%);
				right: 1rem;
			}
		}
	}
</style>
