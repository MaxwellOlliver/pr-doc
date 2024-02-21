<template>
	<div class="form-section__wrapper">
		<h3 class="wrapper__title">Issue</h3>
		<TextInput
			label="ID"
			:value="issueIdField.value.value"
			:error-message="issueIdField.error?.value.message"
			@input="issueIdField.setValue"
		/>
	</div>
</template>
<script setup lang="ts">
import { useFormElement } from '../../../hooks/useFormElement';
import TextInput from '../../TextInput.vue';

const issueIdField = useFormElement('issue.taskId');
</script>
