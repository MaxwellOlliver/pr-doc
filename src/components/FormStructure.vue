<template>
	<div class="pr-doc__form-structure">
		<Tabs :tabs="tabs" :default-active-tab="tabs[0].id" />
	</div>
</template>
<script setup lang="ts">
import StructureOrder from './StructureOrder.vue';
import FormData from './FormData.vue';
import Tabs from './Tabs.vue';

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { summarySchema, changesSchema } from '../validations';

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

const form = useForm({
	validationSchema: toTypedSchema(z.union([summarySchema, changesSchema]))
});
</script>
<style scoped>
.pr-doc__form-structure {
	width: max(30vw, 400px);
	height: 100%;
	background: #ffffff01;
}
</style>
