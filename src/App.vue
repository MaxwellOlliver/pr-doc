<template>
	<Home />
</template>
<script setup lang="ts">
import Home from './views/Home.vue';
import { theme } from './theme';

const { primary } = theme.fonts;
</script>
<style>
* {
	box-sizing: border-box;
	margin: 0;
	border: 0;
	padding: 0;
	outline: none;
	font-family: v-bind(primary) !important;
}

html,
body,
button,
label,
textarea,
input {
	font-size: 1rem;
	line-height: normal;
	color: #fff;
}

h1::selection {
	background: v-bind(primary);
	color: #fff;
}

h1,
h2,
h3,
h4,
h5,
h6 {
	font-family: v-bind(primary);
}
</style>
