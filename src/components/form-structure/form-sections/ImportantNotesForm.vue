<template>
	<div class="form-section__wrapper">
		<h3 class="wrapper__title">Important Notes</h3>
		<TextInput
			:value="importantNotesDescriptionField.value.value"
			label="Description"
			:error-message="importantNotesDescriptionField.error?.value.message"
			as-textarea
			@input="importantNotesDescriptionField.setValue"
		/>
	</div>
</template>
<script setup lang="ts">
import { useFormElement } from '../../../hooks/useFormElement';
import TextInput from '../../TextInput.vue';

const importantNotesDescriptionField = useFormElement(
	'importantNotes.description'
);
</script>
