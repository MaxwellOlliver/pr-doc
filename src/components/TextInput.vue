<template>
	<div class="input-wrapper">
		<input
			v-if="!asTextarea"
			:id="_id"
			class="text-input"
			v-bind="props"
			:value="_value"
			@focus="isFocused = true"
			@blur="isFocused = false"
			@input="handleChange"
		/>
		<textarea
			v-else
			:id="_id"
			class="text-input"
			v-bind="props"
			:value="_value"
			@focus="isFocused = true"
			@blur="isFocused = false"
			@input="handleChange"
		/>
		<label :for="_id" :class="{ '--focused': isFocused || !!_value }">{{
			label
		}}</label>
	</div>
</template>
<script setup lang="ts">
import { useId } from '../hooks/useId';
import { type InputHTMLAttributes, ref } from 'vue';
import { theme } from '../theme';

interface InputProps {
	label?: string;
	value?: InputHTMLAttributes['value'];
	onChange?: InputHTMLAttributes['onChange'];
	placeholder?: string;
	id?: string;
	asTextarea?: boolean;
}

const {
	colors: { background },
	fontSizes: { small }
} = theme;

const { label, id, asTextarea, onChange, ...props } = defineProps<InputProps>();

const _id = id ?? useId();
const _value = ref(props.value);
const isFocused = ref(false);

function handleChange(e: Event) {
	const target = e.target as HTMLInputElement;
	_value.value = target.value;
	onChange?.(e);
}
</script>
<style scoped>
.input-wrapper {
	display: flex;
	flex-direction: column;
	width: 100%;
	position: relative;
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
}

.text-input::placeholder {
	color: rgba(255, 255, 255, 0.5);
}

label {
	color: #fff;
	position: absolute;
	left: 0.5rem;
	top: calc(45px / 2);
	transition:
		left 0.2s ease-in-out,
		top 0.2s ease-in-out,
		font-size 0.2s ease-in-out;
	padding: 0.25rem;
	background: v-bind(background);
	transform: translateY(-50%);
	border-radius: 5px;
}

label.--focused {
	top: 0px;
	font-size: v-bind(small);
}
</style>
