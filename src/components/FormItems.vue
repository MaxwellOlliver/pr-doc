<template>
	<div class="pr-doc__draggable-items">
		<div
			v-for="item in draggableFormItems"
			:key="item.id"
			:class="[
				'draggable-items__item',
				{ '--disabled': formSectionsId.includes(item.id) }
			]"
			:draggable="!formSectionsId.includes(item.id)"
			@dragstart="handleDrag($event, item.id)"
		>
			<component :is="item.icon" class="item__icon" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { draggableFormItems, dragNDropStore } from '../store/drag-and-drop';
import { formStructureStore } from '../store/form-structure';
import { theme } from '../theme';

const {
	spacings: { small },
	colors: { lightBackground, primary }
} = theme;

const formSectionsId = formStructureStore.formSections.map(
	(section) => section.id
);

function handleDrag(e: DragEvent, item: string) {
	e.dataTransfer?.setData('itemID', item);
	dragNDropStore.setDraggingItem(item);
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
}

.draggable-items__item:active {
	cursor: grabbing;
}

.draggable-items__item.--disabled {
	cursor: not-allowed !important;
	opacity: 0.5;
}

.item__icon {
	color: v-bind(primary);
	width: 2rem;
	height: 2rem;
	display: block;
	pointer-events: none;
}
</style>
