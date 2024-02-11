import {
	AlertCircle,
	BookOpenText,
	Bug,
	FileImage,
	PencilLine
} from 'lucide-vue-next';
import { reactive } from 'vue';

interface DragNDropStore {
	draggingItem: string | null;
	setDraggingItem: (payload: string | null) => void;
	clearDraggingItem: () => void;
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

export const dragNDropStore = reactive<DragNDropStore>({
	draggingItem: null,
	setDraggingItem(payload: string | null) {
		this.draggingItem = payload;
	},
	clearDraggingItem() {
		this.draggingItem = null;
	}
});
