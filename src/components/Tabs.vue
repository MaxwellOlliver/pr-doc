<template>
	<div
		v-if="!!currentTab"
		:class="[
			{
				'--button-tabs': _variant === 'button',
				'--default-tabs': _variant === 'default'
			},
			'tabs'
		]"
	>
		<div class="tabs__header">
			<div ref="floatBar" class="header__float-bar"></div>
			<div
				v-for="tab in tabs"
				:key="tab.id"
				:class="[{ '--current': currentTab === tab.id }, 'header__tab']"
				:data-tab="tab.id"
				:data-disabled="tab.disabled"
				@click="handleChangeTab(tab.id)"
			>
				{{ tab.title }}
			</div>
		</div>
		<div class="tabs__content">
			<component :is="currentTabComponent" class="content__wrapper" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { theme } from '../theme';
import { Tab } from '../store/types';

interface TabsProps {
	tabs: Tab[] | never[];
	defaultActiveTab?: string;
	variant?: 'default' | 'button';
}

interface TabsEmits {
	(e: 'change', value: string): void;
}

const {
	colors: { primary },
	spacings: { normal }
} = theme;

const { tabs, defaultActiveTab, variant } = defineProps<TabsProps>();

const emit = defineEmits<TabsEmits>();

const _variant = computed(() => variant ?? 'default');

const currentTab = ref(defaultActiveTab ?? tabs[0]?.id ?? null);
const floatBar = ref<HTMLDivElement>();

const currentTabComponent = computed(() => {
	if (!tabs.length) return;

	return (tabs.find((tab) => tab.id === currentTab.value) ?? tabs[0].component)
		.component;
});

function calculateFloatBarPosition() {
	if (!floatBar.value) return;

	const currentTabElement = document.querySelector(
		`[data-tab="${currentTab.value}"]`
	) as HTMLElement;

	if (!currentTabElement) return;

	floatBar.value.style.width = `${currentTabElement.offsetWidth}px`;
	floatBar.value.style.left = `${currentTabElement.offsetLeft}px`;
}

function handleChangeTab(id: string) {
	currentTab.value = id;
	emit('change', id);
	calculateFloatBarPosition();
}

onMounted(() => {
	calculateFloatBarPosition();
});
</script>
<style scoped>
.tabs {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.tabs__header {
	display: flex;
	position: relative;
}

.header__tab {
	padding: 10px 20px;
	cursor: pointer;
	transition:
		color 0.3s,
		background-color 0.3s;
	z-index: 2;
	font-size: 14px;
}
.header__tab[data-disabled='true'] {
	pointer-events: none;
	opacity: 0.5;
}

.--default-tabs > .tabs__header > .header__float-bar {
	width: 0px;
	height: 2px;
	background: v-bind(primary);
	position: absolute;
	transition:
		width 0.3s,
		left 0.3s;
	bottom: 0;
	left: 0;
}
.--button-tabs > .tabs__header > .header__float-bar {
	width: 0px;
	height: 100%;
	background: v-bind(primary);
	position: absolute;
	border-radius: 5px;
	transition:
		width 0.3s,
		left 0.3s;
	bottom: 0;
	left: 0;
	z-index: 1;
}

.--default-tabs > .tabs__header > .header__tab.--current {
	color: v-bind(primary);
}

.tabs__content {
	width: 100%;
	height: 100%;
	display: flex;
	overflow: hidden;
	scroll-behavior: smooth;
}

.content__wrapper {
	width: 100%;
	animation: fadein 0.3s;
	padding: v-bind(normal);
}

@keyframes fadein {
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
}
</style>
