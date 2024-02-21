<template>
	<div class="form-section__wrapper">
		<h3 class="wrapper__title">Summary</h3>
		<TextInput
			:value="summaryDescriptionField.value.value"
			label="Description"
			:error-message="summaryDescriptionField.error?.value.message"
			as-textarea
			@input="summaryDescriptionField.setValue"
		/>
	</div>
</template>
<script setup lang="ts">
import { useFormElement } from '../../../hooks/useFormElement';
import TextInput from '../../TextInput.vue';

const summaryDescriptionField = useFormElement('summary.description');
</script>
