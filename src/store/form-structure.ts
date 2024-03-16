import { reactive } from 'vue';
import { DraggableItem } from './types';
import { draggableFormItems } from './drag-and-drop';

interface FormStructureStore {
	formSections: DraggableItem[];
	addFormSection: (section: string) => void;
	moveFormSection: (from: number, to: number) => void;
	updateAndOrder: (orderUpdated: DraggableItem[]) => void;
	removeFormSection: (section: string) => void;
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
	updateAndOrder(orderUpdated: DraggableItem[]) {
		this.formSections = orderUpdated.sort((a, b) => a.order - b.order);
	},
	moveFormSection(from: number, to: number) {
		const fromElement = this.formSections.find((item) => item.order === from);
		const toElement = this.formSections.find((item) => item.order === to);

		if (!fromElement || !toElement) {
			return;
		}

		const formSectionsOrderUpdated = this.formSections.map((item) => {
			if (item.id === fromElement.id) {
				return {
					...item,
					order: to
				};
			}

			if (item.id === toElement.id) {
				return {
					...item,
					order: from
				};
			}

			return item;
		});

		this.updateAndOrder(formSectionsOrderUpdated);
	},
	removeFormSection(sectionId) {
		const sections = this.formSections;
		this.formSections = sections.filter((item) => item.id !== sectionId);
	}
});
