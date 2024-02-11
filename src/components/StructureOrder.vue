<template>
	<div class="structure-order__dropzone" @drop.prevent="onDrop"></div>
</template>
<script setup lang="ts">
import { useDragNDropStore } from '../store/drag-and-drop';

const {
	store: { draggingItem }
} = useDragNDropStore();

function onDrop(t) {
	console.log(draggingItem);
}
</script>
<style scoped>
.structure-order__dropzone {
	width: 100%;
	height: 100%;
}
</style>
