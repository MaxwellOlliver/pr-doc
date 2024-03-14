<template>
	<div class="form-provider__wrapper">
		<form style="height: 100%">
			<slot />
		</form>
	</div>
</template>
<script setup lang="ts">
import { formDataStore } from '../../store/form-data';
import { computed, watch } from 'vue';
import { summarySchema } from '../../validations';

const data = computed(() => formDataStore.getTransformedRawData());
const errors = computed(() => formDataStore.errors);

watch(data.value, () => {
	const result = summarySchema.safeParse(data.value);

	if (!result.success) {
		formDataStore.clearErrors();

		result.error.issues.forEach((issue) => {
			formDataStore.setError(issue.path[0] as string, issue.message);
		});
		return;
	}

	formDataStore.clearErrors();
});

watch(errors.value, () => {
	if (Object.keys(errors.value).length > 0) {
		formDataStore.setIsValid(false);
		return;
	}

	formDataStore.setIsValid(true);
});
</script>
<style>
.form-provider__wrapper {
	display: flex;
	height: 100%;
	width: 100%;
}

.form-provider__wrapper form {
	width: 100%;
	height: 100%;
}
</style>
