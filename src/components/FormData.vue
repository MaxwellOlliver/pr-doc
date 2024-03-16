<template>
	<div class="form-data__wrapper">
		<Tabs :tabs="tabs" variant="button" />
	</div>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import SummaryForm from './form-structure/form-sections/SummaryForm.vue';
import IssueForm from './form-structure/form-sections/IssueForm.vue';
import ChangesForm from './form-structure/form-sections/ChangesForm.vue';
import ImportantNotesForm from './form-structure/form-sections/ImportantNotesForm.vue';
import { formStructureStore } from '../store/form-structure';
import { theme } from '../theme';
import Tabs from './Tabs.vue';
import { Tab } from '../store/types';

const { spacings } = theme;

const sectionComponent: Record<string, Tab['component']> = {
	summary: SummaryForm,
	issue: IssueForm,
	changes: ChangesForm,
	importantNotes: ImportantNotesForm
};

const tabs = computed(() =>
	formStructureStore.formSections.map(
		(section) =>
			({
				id: section.id,
				title: section.name,
				component: sectionComponent[section.id]
			}) as Tab
	)
);
</script>
<style>
.form-data__wrapper {
	width: 100%;
	height: 100%;
	gap: v-bind('spacings.medium');
	display: flex;
	flex-direction: column;
}

.form-section__wrapper {
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: v-bind('spacings.small');
}

.wrapper__title {
	font-weight: 500;
}
</style>
