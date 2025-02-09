import { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type SearchGameInputProps = {
	onInputChange: (q: string) => void;
};

export function SearchGameInput({ onInputChange }: SearchGameInputProps) {
	const ref = useRef<HTMLInputElement>(null);
	const [inputValue, setInputValue] = useState("");
	const [debouncedValue] = useDebounce(inputValue, 200);

	useEffect(() => {
		onInputChange(debouncedValue);
	}, [debouncedValue, onInputChange]);

	return (
		<div className="relative flex items-center gap-x-2">
			<Input
				ref={ref}
				type="text"
				placeholder="Search Game"
				onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
					const value = event.target.value;
					setInputValue(value);
				}}
			/>
			{inputValue && (
				<Button
					variant="link"
					onClick={() => {
						setInputValue("");

						// biome-ignore lint/style/noNonNullAssertion: The ref exists :)
						ref.current!.value = "";
					}}
				>
					<span className="flex items-center gap-x-1">Clear</span>
				</Button>
			)}
		</div>
	);
}
