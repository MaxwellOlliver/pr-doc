<template>
	<div
		class="structure-order__sections"
		@drop="onDrop"
		@dragover.prevent
		@dragenter.prevent
	>
		<div
			v-for="section in formSections.sort((a, b) => a.order - b.order)"
			:id="section.id"
			:key="section.id"
			class="sections__item"
			draggable="true"
			@dragstart="handleDragStart($event, section.id)"
		>
			<div class="item__data">
				<component :is="section.icon" class="data__icon" />
				<p>{{ section.name }}</p>
			</div>
			<div class="item__actions">
				<Trash2 class="actions__icon" />
				<AlignJustify class="actions__icon" />
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { AlignJustify, Trash2 } from 'lucide-vue-next';
import { computed, ref } from 'vue';
import { formStructureStore } from '../store/form-structure';
import { theme } from '../theme';

const {
	spacings,
	colors: { lightBackground, secondary }
} = theme;

const draggingSection = ref<string | null>(null);

const formSections = computed(() => formStructureStore.formSections);

function onDrop(e: DragEvent) {
	const itemID = e.dataTransfer?.getData('itemID') as string;
	const formSectionsId = formStructureStore.formSections.map(
		(section) => section.id
	);

	if ((e.target as HTMLDivElement).id) {
		const targetID = (e.target as HTMLDivElement).id;

		formStructureStore.moveFormSection(itemID, targetID);
		return;
	}

	if (formSectionsId.includes(itemID)) return;

	formStructureStore.addFormSection(itemID);
}

function handleDragStart(e: DragEvent, itemId: string) {
	if (!e.dataTransfer) return;

	e.dataTransfer.dropEffect = 'move';
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('itemID', itemId);

	draggingSection.value = itemId;
}
</script>
<style scoped>
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
	gap: v-bind('spacings.normal');
}

.data__icon,
.actions__icon {
	width: 1.25rem;
	height: 1.25rem;
	display: block;
	pointer-events: none;
}

.actions__icon:first-child {
	color: v-bind(secondary);
}
</style>
