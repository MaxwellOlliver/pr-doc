import { reactive } from 'vue';
import { DraggableItem } from './types';
import { draggableFormItems } from './drag-and-drop';

interface FormStructureStore {
	formSections: DraggableItem[];
	addFormSection: (section: string) => void;
	moveFormSection: (from: string, to: string) => void;
}

export const formStructureStore = reactive<FormStructureStore>({
	formSections: [],
	addFormSection(sectionId) {
		const section = draggableFormItems.find((item) => item.id === sectionId);

		if (!section) {
			throw new Error(`Section with id ${sectionId} not found`);
		}

		const _section = {
			...section,
			order: this.formSections.length
		};
		this.formSections = [...this.formSections, _section];
	},
	moveFormSection(fromId: string, toId: string) {
		const from = this.formSections.find((item) => item.id === fromId);
		const to = this.formSections.find((item) => item.id === toId);

		if (!from || !to) {
			throw new Error(`Section with id ${fromId} or ${toId} not found`);
		}

		this.formSections = this.formSections.map((item) => {
			if (item.id === fromId) {
				return {
					...item,
					order: to.order
				};
			}

			if (item.id === toId) {
				return {
					...item,
					order: from.order
				};
			}

			return item;
		});
	}
});
