import {
	AlertCircle,
	BookOpenText,
	Bug,
	FileImage,
	PencilLine
} from 'lucide-vue-next';
import { reactive } from 'vue';

interface DragAndDropState {
	draggingItem: string | null;
}

export const draggableFormItems = [
	{
		id: 'summary',
		name: 'Summary',
		icon: BookOpenText
	},
	{
		id: 'issue',
		name: 'Issue/Task',
		icon: Bug
	},
	{
		id: 'changes',
		name: 'Changes',
		icon: PencilLine
	},
	{
		id: 'images',
		name: 'Images',
		icon: FileImage
	},
	{
		id: 'important-notes',
		name: 'Important Notes',
		icon: AlertCircle
	}
];

export function useDragNDropStore() {
	const store = reactive<DragAndDropState>({
		draggingItem: null
	});

	function setDraggingItem(payload: string | null) {
		store.draggingItem = payload;
	}

	function clearDraggingItem() {
		store.draggingItem = null;
	}

	return {
		store,
		setDraggingItem,
		clearDraggingItem
	};
}
