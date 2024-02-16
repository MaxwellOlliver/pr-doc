<template>
	<div class="pr-doc__preview">
		<div class="preview__header">
			<ScanEye />
			<h2 class="header__title">Preview</h2>
		</div>
		<div class="preview__body">
			<span>{{ formDataStore.data['summaryDescription'] }}</span>
		</div>
	</div>
</template>
<script setup lang="ts">
import { formDataStore } from '../store/form-data';
import { theme } from '../theme';
import { ScanEye } from 'lucide-vue-next';

const {
	colors: { lightBackground },
	spacings: { normal, small }
} = theme;
</script>
<style scoped>
.pr-doc__preview {
	width: max(500px, 40vw);
	height: 100%;
	background: v-bind(lightBackground);
	padding: v-bind(normal);
	border-radius: 5px;
}

.preview__header {
	display: flex;
	align-items: center;
	gap: v-bind(small);
}
</style>
