export type CheckboxProps = {
	htmlFor: string;
	name: string;
	id: string;
	className?: string;
	onFilterSelect?: (selectedFilter: string, isCheckboxChecked: boolean) => void;
	isFiltersReset?: boolean;
};
