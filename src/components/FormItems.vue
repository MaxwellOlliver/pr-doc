<template>
	<div
		:class="[{ '--show': show, '--hide': !show }, 'pr-doc__draggable-items']"
	>
		<div
			v-for="item in draggableFormItems"
			:key="item.id"
			:class="[
				'draggable-items__item',
				{ '--disabled': formSectionsId.includes(item.id) }
			]"
			:draggable="!formSectionsId.includes(item.id)"
			:style="{
				transitionDelay: `${draggableFormItems.findIndex((i) => i.id === item.id) * 0.1}s`
			}"
			@dragstart="handleDrag($event, item.id)"
		>
			<component :is="item.icon" class="item__icon" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { draggableFormItems } from '../store/drag-and-drop';
import { computed } from 'vue';
import { formStructureStore } from '../store/form-structure';
import { theme } from '../theme';

interface FormItemsProps {
	show: boolean;
}

const { show } = defineProps<FormItemsProps>();

const {
	spacings: { small },
	colors: { lightBackground, primary }
} = theme;

const formSectionsId = computed(() =>
	formStructureStore.formSections.map((section) => section.id)
);

function handleDrag(e: DragEvent, item: string) {
	e.dataTransfer?.setData('itemID', item);
}
</script>
<style>
.pr-doc__draggable-items {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: v-bind(small);
}

.draggable-items__item {
	padding: 1.5rem;
	border-radius: 5px;
	background: v-bind(lightBackground);
	cursor: pointer;
	opacity: 0;
	transform: scale(0);
	transition:
		opacity 0.3s,
		transform 0.3s;
}

.pr-doc__draggable-items.--show .draggable-items__item {
	opacity: 1;
	transform: scale(1);
}

.draggable-items__item:active {
	cursor: grabbing;
}

.draggable-items__item.--disabled {
	cursor: not-allowed !important;
	filter: brightness(0.6);
}

.item__icon {
	color: v-bind(primary);
	width: 2rem;
	height: 2rem;
	display: block;
	pointer-events: none;
}
</style>
