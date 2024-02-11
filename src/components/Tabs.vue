<template>
	<div class="pr-doc__tabs">
		<div class="tabs__header">
			<div
				v-for="tab in tabs"
				:key="tab.id"
				:class="[{ '--current': currentTab === tab.id }, 'header__tab']"
				:data-tab="tab.id"
				@click="handleChangeTab(tab.id)"
			>
				{{ tab.title }}
			</div>
			<div ref="floatBar" class="header__float-bar"></div>
		</div>
		<div class="tabs__content">
			<component :is="currentTabComponent" class="content__wrapper" />
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, DefineComponent, onMounted, computed } from 'vue';
import { theme } from '../theme';

interface Tab {
	title: string;
	id: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: DefineComponent<Record<string, never>, Record<string, never>, any>;
}

interface TabsProps {
	tabs: Tab[];
	defaultActiveTab: string;
}

const {
	colors: { primary },
	spacings: { normal }
} = theme;

const { tabs, defaultActiveTab } = defineProps<TabsProps>();

const currentTab = ref(defaultActiveTab ?? tabs[0].id);
const floatBar = ref<HTMLDivElement>();

const currentTabComponent = computed(() => {
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
	calculateFloatBarPosition();
}

onMounted(() => {
	calculateFloatBarPosition();
});
</script>
<style scoped>
.pr-doc__tabs {
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
	transition: color 0.3s;
}

.header__float-bar {
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

.header__tab.--current {
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
