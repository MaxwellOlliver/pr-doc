<template>
	<div
		class="structure-order__sections"
		@drop="onDrop"
		@dragover.prevent
		@dragenter.prevent
	>
		<div
			v-for="section in formSections"
			:key="section.id"
			class="sections__item"
			draggable="true"
		>
			<div class="item__data">
				<component :is="section.icon" class="data__icon" />
				<p>{{ section.name }}</p>
			</div>
			<div class="item__actions">
				<AlignJustify class="actions__icon" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { AlignJustify } from 'lucide-vue-next';
import { computed } from 'vue';
import { formStructureStore } from '../store/form-structure';
import { theme } from '../theme';

const {
	spacings,
	colors: { lightBackground }
} = theme;

const formSections = computed(() => formStructureStore.formSections);

function onDrop(e: DragEvent) {
	const itemID = e.dataTransfer?.getData('itemID') as string;

	formStructureStore.addFormSection(itemID);
}
</script>
<style>
.structure-order__sections {
	width: 100%;
	height: 100%;
	gap: v-bind('spacings.normal');
	display: flex;
	flex-direction: column;
}

.sections__item {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem;
	border-radius: 5px;
	background: v-bind(lightBackground);
	cursor: pointer;
}

.item__data {
	display: flex;
	align-items: center;
	gap: v-bind('spacings.small');
}

.item__actions {
	display: flex;
	align-items: center;
	gap: v-bind('spacings.small');
}

.data__icon,
.actions__icon {
	width: 1.25rem;
	height: 1.25rem;
	display: block;
	pointer-events: none;
}
</style>
