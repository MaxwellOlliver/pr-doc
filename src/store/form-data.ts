import { reactive } from 'vue';
import { FormDataType, FormRawValue, FormValue } from './types';

interface FormDataStore {
	data: Record<string, FormRawValue>;
	errors: Record<string, { message: string }>;
	isValid: boolean;
	setIsValid: (value: boolean) => void;
	setValue: (name: string, value: FormRawValue) => void;
	clearErrors: () => void;
	setError: (name: string, message: string, replaceAll?: boolean) => void;
	clearFieldError: (name: string) => void;
	getTransformedRawData: () => FormDataType;
}

export const formDataStore = reactive<FormDataStore>({
	data: {},
	errors: {},
	isValid: true,
	getTransformedRawData() {
		const obj = this.data;
		const result: Record<string, FormValue> = {};

		Object.keys(obj).forEach((key) => {
			const value = obj[key];
			const keys = key.split('.');

			// @ts-expect-error - Reduce type is not working properly with object mapping
			keys.reduce((acc, cur, idx) => {
				if (idx === keys.length - 1) {
					acc[cur] = value as FormValue;
					return value;
				}

				if (!acc[cur]) {
					acc[cur] = {};
				}

				return acc[cur];
			}, result);
		});

		return result as FormDataType;
	},
	setIsValid(value: boolean) {
		this.isValid = value;
	},
	setValue(name: string, value: FormRawValue) {
		this.data[name] = value;
	},
	clearErrors() {
		this.errors = {};
	},
	setError(name: string, message: string) {
		this.errors[name] = { message };
	},
	clearFieldError(name: string) {
		if (this.errors[name]) {
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			const { [name]: _, ...rest } = this.errors;
			this.errors = rest;
		}
	}
});
