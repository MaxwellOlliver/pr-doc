<!-- eslint-disable vue/no-v-html -->
<template>
	<div class="pr-doc__preview">
		<div class="preview__header">
			<div class="header__title">
				<ScanEye />
				<h2 class="header__title">Preview</h2>
			</div>
			<Button variant="outline" color="primary" @click="handleCopy">
				<Copy :size="16" />
			</Button>
		</div>
		<div class="preview__body">
			<div v-html="markdown.render(markdownData)"></div>
		</div>
	</div>
</template>
<script setup lang="ts">
import MarkdownIt from 'markdown-it';
import MarkdownItAnchor from 'markdown-it-anchor';
import MarkdownItHighlightjs from 'markdown-it-highlightjs';
import MarkdownItTOC from 'markdown-it-toc-done-right';
import { computed } from 'vue';
import { formDataStore } from '../store/form-data';
import { theme } from '../theme';
import { ScanEye, Copy } from 'lucide-vue-next';
import Button from './Button.vue';
import { FormDataType } from '../store/types';
import { formStructureStore } from '../store/form-structure';

const {
	colors: { lightBackground, primary, secondary },
	spacings: { normal, small, large }
} = theme;

const markdown = new MarkdownIt({
	html: true,
	linkify: true,
	typographer: true,
	breaks: true
})
	.use(MarkdownItAnchor)
	.use(MarkdownItHighlightjs)
	.use(MarkdownItTOC);

const data = computed(() => formDataStore.getTransformedRawData());

function getTextByFormItem(formItem: keyof FormDataType) {
	switch (formItem) {
		case 'summary':
			return `${data.value.summary ? `**Summary**\n` : ''}${data.value.summary ? `${data.value.summary.description}\n\n` : ''}`;
		case 'issue':
			return `${data.value.summary ? `**References**\n` : ''}${data.value.issue?.taskId ? `- **Issue**: #${data.value.issue.taskId}\n\n` : ''}${data.value.issue?.prId ? `- **Pull Request**: !${data.value.issue.prId}\n\n` : ''}`;
		case 'changes':
			return `${data.value.changes?.length ? '**Changes**\n' : ''}${
				data.value.changes?.length
					? data.value.changes
							?.map(
								(change) =>
									`- \`\`\`${change.relativePath}\`\`\`: ${change.description}\n`
							)
							.join('\n')
					: ''
			}\n\n`;
		case 'importantNotes':
			return `${data.value.importantNotes ? `\\*\\* **Important Notes** \\*\\*\n` : ''}${data.value.importantNotes.description ? `${data.value.importantNotes.description}\n\n` : ''}`;
		default:
			return '';
	}
}

const markdownData = computed(() => {
	let output = formStructureStore.formSections.map((item) => {
		return getTextByFormItem(item.id as keyof FormDataType);
	});

	return output.join('');
});

function handleCopy() {
	navigator.clipboard.writeText(markdownData.value);
}
</script>
<style>
.pr-doc__preview {
	width: max(500px, 40vw);
	height: 100%;
	background: v-bind(lightBackground);
	padding: v-bind(normal);
	border-radius: 5px;
}

.preview__header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: v-bind(small);
}

.preview__header .header__title {
	display: flex;
	align-items: center;
	gap: v-bind(small);
}

.preview__body {
	width: 100%;
	margin-top: v-bind(normal);
}

.preview__body ul {
	padding-left: v-bind(large);
	margin-bottom: v-bind(normal);
}

.preview__body p {
	word-break: break-all;
	margin-bottom: v-bind(normal);
}

.preview__body a {
	word-break: break-all;
	margin-bottom: v-bind(normal);
	color: v-bind(primary);
}

.preview__body a:visited {
	color: v-bind(secondary);
}

.preview__body li p {
	margin-bottom: 0;
}

.hljs {
	padding: v-bind(small) !important;
	margin-bottom: v-bind(normal) 0 !important;
	border-radius: 5px;
}

.preview__body code:not(.hljs) {
	background-color: #333;
	width: fit-content;
	padding: 0.1rem 0.5rem;
	margin: v-bind(normal) 0;
	border-radius: 5px;
}
</style>
