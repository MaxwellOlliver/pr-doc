import { reactive } from 'vue';
import { FormValue } from './types';

interface FormDataStore {
	data: Record<string, FormValue>;
	errors: Record<string, { message: string }>;
	isValid: boolean;
	setIsValid: (value: boolean) => void;
	setValue: (name: string, value: FormValue) => void;
	clearErrors: () => void;
	setError: (name: string, message: string, replaceAll?: boolean) => void;
	clearFieldError: (name: string) => void;
}

export const formDataStore = reactive<FormDataStore>({
	data: {},
	errors: {},
	isValid: true,
	setIsValid(value: boolean) {
		this.isValid = value;
	},
	setValue(name: string, value: FormValue) {
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
