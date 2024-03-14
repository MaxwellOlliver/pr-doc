import { computed } from 'vue';
import { formDataStore } from '../store/form-data';
import { FormRawValue } from '../store/types';

type SetValueProps<T = FormRawValue> = T | ((currentValue: T) => FormRawValue);

function isFunction<T>(
	value: SetValueProps<T>
): value is (currentValue: T) => FormRawValue {
	return typeof value === 'function';
}

interface UseFormElement<T = FormRawValue> {
	readonly setValue: (value: SetValueProps<T>) => void;
	readonly value: ReturnType<typeof computed<T>>;
	readonly error: ReturnType<typeof computed<{ message: string }>>;
}

export function useFormElement<T = FormRawValue>(
	name: string,
	initialValue?: T
): UseFormElement<T> {
	const error = computed(() => formDataStore.errors[name] ?? {});
	const value = computed<T>(
		() => (formDataStore.data[name] ?? initialValue) as T
	);

	function setValue(value: SetValueProps<T>) {
		if (isFunction(value)) {
			formDataStore.setValue(name, value(formDataStore.data[name] as T));
			return;
		}

		formDataStore.setValue(name, value as FormRawValue);
	}

	return {
		setValue,
		value,
		error
	};
}
