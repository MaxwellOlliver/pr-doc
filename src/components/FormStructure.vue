<template>
	<div class="pr-doc__form-structure">
		<FormProvider>
			<Tabs :tabs="tabs" :default-active-tab="tabs[0].id" />
		</FormProvider>
	</div>
</template>
<script setup lang="ts">
import StructureOrder from './StructureOrder.vue';
import FormData from './FormData.vue';
import Tabs from './Tabs.vue';

import FormProvider from './form-structure/FormProvider.vue';

const tabs = [
	{
		title: 'Structure',
		id: 'structure',
		component: StructureOrder
	},
	{
		title: 'Data',
		id: 'data',
		component: FormData
	}
];
</script>
<style scoped>
.pr-doc__form-structure {
	width: 100%;
	height: 100%;
	background: #ffffff01;
}
</style>
