<template>
	<div class="app-container">
		<FormItems />
		<FormStructure />
		<Preview />
	</div>
</template>
<script setup lang="ts">
import FormItems from '../components/FormItems.vue';
import FormStructure from '../components/FormStructure.vue';
import Preview from '../components/Preview.vue';
import { theme } from '../theme/index';

const {
	colors: { background },
	spacings: { medium }
} = theme;
</script>
<style>
.app-container {
	width: 100vw;
	height: 100vh;
	background: v-bind(background);
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10vh 10vw;
	gap: v-bind(medium);
}
</style>
