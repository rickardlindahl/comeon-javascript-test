import { useRef, useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

type SearchGameInputProps = {
	onInputChange: (q: string) => void;
};

export function SearchGameInput({ onInputChange }: SearchGameInputProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [inputValue, setInputValue] = useState("");
	const [debouncedValue] = useDebounce(inputValue, 200);

	useEffect(() => {
		onInputChange(debouncedValue);
	}, [debouncedValue, onInputChange]);

	return (
		<div className="search ui small icon input ">
			<input
				ref={inputRef}
				type="text"
				placeholder="Search Game"
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					const value = event.target.value;
					setInputValue(value);
				}}
			/>
			<i className="search icon" />
		</div>
	);
}
