<template>
	<div class="pr-doc__preview">
		<div class="preview__header">
			<ScanEye />
			<h2 class="header__title">Preview</h2>
		</div>
	</div>
</template>
<script setup lang="ts">
import { theme } from '../theme';
import { ScanEye } from 'lucide-vue-next';

const {
	colors: { lightBackground },
	spacings: { normal, small }
} = theme;
</script>
<style scoped>
.pr-doc__preview {
	width: max(25vw, 400px);
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
