let idNumber = 0;

export const useId = () => {
	idNumber += 1;

	return `:v-${idNumber}:`;
};
