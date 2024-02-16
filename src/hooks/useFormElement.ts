import { computed } from 'vue';
import { formDataStore } from '../store/form-data';
import { FormValue } from '../store/types';

interface UseFormElement {
	readonly setValue: (value: FormValue) => void;
	readonly value: ReturnType<typeof computed<FormValue>>;
	readonly error: ReturnType<typeof computed<{ message: string }>>;
}

export function useFormElement(
	name: string,
	initialValue?: string
): UseFormElement {
	const error = computed(() => formDataStore.errors[name] ?? {});
	const value = computed(() => formDataStore.data[name] ?? initialValue);

	return {
		setValue: (value: FormValue) => formDataStore.setValue(name, value),
		value: value,
		error: error
	};
}
