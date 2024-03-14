<template>
	<FormItems :show="currentTab === 'structure'" />
	<div class="pr-doc__form-structure">
		<FormProvider>
			<Tabs
				:tabs="tabs"
				:default-active-tab="tabs[0].id"
				@change="handleCurrentTabChange"
			/>
		</FormProvider>
	</div>
</template>
<script setup lang="ts">
import StructureOrder from './StructureOrder.vue';
import FormData from './FormData.vue';
import Tabs from './Tabs.vue';

import FormProvider from './form-structure/FormProvider.vue';
import { ref } from 'vue';
import FormItems from './FormItems.vue';

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

const currentTab = ref(tabs[0].id);

function handleCurrentTabChange(tab: string) {
	console.log(tab);
	currentTab.value = tab;
}
</script>
<style scoped>
.pr-doc__form-structure {
	width: 100%;
	height: 100%;
	background: #ffffff01;
}
</style>
