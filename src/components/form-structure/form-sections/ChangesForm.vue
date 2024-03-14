<template>
	<div class="form-section__wrapper">
		<h3 class="wrapper__title">Issue</h3>
		<TextInput
			label="Relative Path"
			:value="relativePath"
			@input="(v) => (relativePath = v)"
		/>
		<TextInput
			:value="description"
			label="Description"
			as-textarea
			@input="(v) => (description = v)"
		/>
		<Button
			variant="solid"
			color="secondary"
			:disabled="!relativePath || !description"
			@click="handleAddChange"
		>
			add change
		</Button>
		<div class="wrapper__changes">
			<div
				v-for="change in changesElement.value.value"
				:key="change.relativePath"
				class="changes__item"
			>
				<div class="item__data">
					<span>{{ change.relativePath }}</span>
					<p>{{ change.description }}</p>
				</div>
				<div class="item__actions">
					<Trash2
						class="actions__icon"
						@click="handleDeleteChange(change.id)"
					/>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { Trash2 } from 'lucide-vue-next';
import { v4 as uuidv4 } from 'uuid';

import { useFormElement } from '../../../hooks/useFormElement';
import Button from '../../Button.vue';
import TextInput from '../../TextInput.vue';
import { theme } from '../../../theme';

type IChange = {
	id: string;
	relativePath: string;
	description: string;
};

const { lightBackground, secondary } = theme.colors;

const relativePath = ref('');
const description = ref('');

const changesElement = useFormElement<IChange[]>('changes', []);

function handleAddChange() {
	changesElement.setValue([
		{
			relativePath: relativePath.value,
			description: description.value,
			id: uuidv4()
		},
		...changesElement.value.value
	]);
	relativePath.value = '';
	description.value = '';
}

function handleDeleteChange(id: string) {
	changesElement.setValue((currentValue) =>
		currentValue ? currentValue.filter((change) => change.id !== id) : []
	);
}
</script>
<style scoped>
.form-section__wrapper > button {
	margin-top: 1rem;
	margin-bottom: 1rem;
}
.wrapper__changes {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 1rem;
	overflow: auto;
	padding-right: 0.5rem;
}

.changes__item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	border-radius: 5px;
	background: v-bind(lightBackground);
}

.item__data {
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
}

.item__data > span {
	background-color: #333;
	width: fit-content;
	padding: 0.25rem 0.5rem;
	border-radius: 5px;
}

.actions__icon {
	width: 1.25rem;
	height: 1.25rem;
	display: block;
	pointer-events: none;
}

.actions__icon:first-child {
	color: v-bind(secondary);
}
</style>
