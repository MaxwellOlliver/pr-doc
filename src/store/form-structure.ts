import { reactive } from 'vue';
import { DraggableItem } from './types';
import { draggableFormItems } from './drag-and-drop';

interface FormStructureStore {
	formSections: DraggableItem[];
	addFormSection: (section: string) => void;
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
	}
});
