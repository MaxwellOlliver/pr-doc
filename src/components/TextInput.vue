<template>
	<div class="input-wrapper">
		<input
			v-if="!asTextarea"
			:id="_id"
			class="text-input"
			:value="value"
			@focus="isFocused = true"
			@blur="isFocused = false"
			@input="handleChange"
			@keypress.enter="$emit('next')"
		/>
		<textarea
			v-else
			:id="_id"
			class="text-input"
			:value="value"
			@focus="isFocused = true"
			@blur="isFocused = false"
			@input="handleChange"
		/>
		<label
			:for="_id"
			:class="{
				'--focused': isFocused || !!value
			}"
		>
			{{ label }}
		</label>
	</div>
	{{ errorMessage }}
</template>
<script setup lang="ts">
import { useId } from '../hooks/useId';
import { type InputHTMLAttributes, ref } from 'vue';
import { theme } from '../theme';

interface InputProps {
	label?: string;
	value?: InputHTMLAttributes['value'];
	id?: string;
	errorMessage?: string;
	asTextarea?: boolean;
}

interface InputEmits {
	(e: 'input', value: string): void;
	(e: 'next'): void;
}

const {
	colors: { background, secondary },
	fontSizes: { small }
} = theme;

const { label, id, asTextarea, value } = defineProps<InputProps>();

const emit = defineEmits<InputEmits>();

const _id = id ?? useId();
const isFocused = ref(false);

function handleChange(e: Event) {
	const target = e.target as HTMLInputElement;
	emit('input', target.value);
}
</script>
<style scoped>
.input-wrapper {
	display: flex;
	flex-direction: column;
	width: 100%;
	position: relative;
	margin-top: 0.325rem;
}

input {
	height: 45px;
	max-height: 45px;
}

textarea {
	min-height: 100px;
	max-height: 200px;
	resize: vertical;
	padding: 0.875rem 1rem !important;
}

.text-input {
	border: 1px solid #fff;
	border-radius: 5px;
	background: transparent;
	width: 100%;
	color: #fff;
	padding: 0 1rem;
	transition: border-color 0.2s ease-in-out;
}

.text-input:focus {
	border-color: v-bind(secondary);
}

.text-input::placeholder {
	visibility: hidden;
}

label {
	color: #fff;
	position: absolute;
	left: 0.5rem;
	top: calc(45px / 2);
	transition:
		left 0.2s ease-in-out,
		top 0.2s ease-in-out,
		font-size 0.2s ease-in-out,
		color 0.2s ease-in-out;
	padding: 0.25rem;
	background: v-bind(background);
	transform: translateY(-50%);
	border-radius: 5px;
	pointer-events: none;
	line-height: 1;
}

label.--focused {
	top: 0px;
	font-size: v-bind(small);
}

.text-input:focus + label {
	color: v-bind(secondary);
}
</style>
