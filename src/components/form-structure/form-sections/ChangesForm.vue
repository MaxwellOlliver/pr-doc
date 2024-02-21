<template>
	<div class="form-section__wrapper">
		<h3 class="wrapper__title">Issue</h3>
		<TextInput v-model="relativePath" label="Relative Path" />
		<TextInput v-model="description" label="Description" as-textarea />
		<Button
			variant="solid"
			color="secondary"
			:disabled="!relativePath || !description"
		>
			new change
		</Button>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useFormElement } from '../../../hooks/useFormElement';
import Button from '../../Button.vue';
import TextInput from '../../TextInput.vue';

type IChange = {
	relativePath: string;
	description: string;
};

const relativePath = ref('');
const description = ref('');

const changesElement = useFormElement<IChange[]>('changes');

function handleAddChange() {
	changesElement.setValue([
		{ relativePath: relativePath.value, description: description.value },
		...changesElement.value.value
	]);
}
</script>
