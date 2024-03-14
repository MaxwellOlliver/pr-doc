import {
	DefineComponent,
	type FunctionalComponent,
	type SVGAttributes
} from 'vue';

export interface DraggableItem {
	id: string;
	icon: FunctionalComponent<SVGAttributes>;
	name: string;
	order: number;
}

export interface Tab {
	title: string;
	id: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: DefineComponent<Record<string, never>, Record<string, never>, any>;
}

export type FormValue = string | number | boolean | object;
export type FormRawValue = string | number | boolean | FormValue[] | undefined;
export type FormData = {
	summary: {
		description: string;
	};
	issue: {
		taskId: string;
		prId: string;
	};
	changes: { relativePath: string; description: string }[];
};
