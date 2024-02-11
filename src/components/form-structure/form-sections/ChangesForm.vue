<template>
	<div class="form-section__wrapper">
		<h3 class="wrapper__title">Issue</h3>
		<TextInput label="Relative Path" />
		<TextInput label="Description" as-textarea />
		<Button variant="solid" color="secondary">new change</Button>
	</div>
</template>
<script setup lang="ts">
import Button from '../../Button.vue';
import TextInput from '../../TextInput.vue';
</script>
