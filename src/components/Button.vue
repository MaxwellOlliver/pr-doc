<template>
	<button type="button" :class="[variants[btnType]]" @click="onClick">
		<slot />
	</button>
</template>
<script setup lang="ts">
import { theme } from '../theme';
import { computed, withDefaults } from 'vue';

interface ButtonProps {
	variant?: 'solid' | 'outline';
	color?: 'primary' | 'secondary';
	onClick?: () => void;
}

const { primary, secondary, background } = theme.colors;

const { color, onClick, variant } = withDefaults(defineProps<ButtonProps>(), {
	variant: 'solid',
	color: 'primary',
	onClick: () => {}
});

const btnType = computed(() => `--${variant}-${color}`);
</script>
<style module="variants">
.--solid-primary {
	background: v-bind(primary);
	color: v-bind(background);
}
.--outline-primary {
	border: 1px solid !important;
	border-color: v-bind(primary);
	color: v-bind(primary);
	background: transparent;
}
.--solid-secondary {
	background: v-bind(secondary);
	color: v-bind(background);
}
.--outline-secondary {
	border: 1px solid !important;
	border-color: v-bind(secondary);
	color: v-bind(secondary);
	background: transparent;
}
</style>
<style scoped>
button {
	width: fit-content;
	padding: 0 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 45px;
	min-height: 45px;
	border: none;
	border-radius: 5px;
	cursor: pointer;
	font-size: 1rem;
	font-weight: bold;
	transition: filter 0.3s;
}

button:disabled {
	opacity: 0.5;
	cursor: not-allowed;
}

button:hover {
	filter: brightness(0.8);
}

button:active {
	filter: brightness(0.6);
}
</style>
