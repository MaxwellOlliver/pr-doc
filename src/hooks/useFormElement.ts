import { computed } from 'vue';
import { formDataStore } from '../store/form-data';
import { FormRawValue } from '../store/types';

interface UseFormElement<T = FormRawValue> {
	readonly setValue: (value: FormRawValue) => void;
	readonly value: ReturnType<typeof computed<T>>;
	readonly error: ReturnType<typeof computed<{ message: string }>>;
}

export function useFormElement<T = FormRawValue>(
	name: string,
	initialValue?: FormRawValue
): UseFormElement<T> {
	const error = computed(() => formDataStore.errors[name] ?? {});
	const value = computed<T>(
		() => (formDataStore.data[name] ?? initialValue) as T
	);

	return {
		setValue: (value: FormRawValue) => formDataStore.setValue(name, value),
		value,
		error
	};
}
