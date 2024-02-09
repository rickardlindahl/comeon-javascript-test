import { useEffect } from "react";

declare global {
	interface Window {
		comeon: {
			game: {
				launch: (code: string) => void;
			};
		};
	}
}

type PlayGameProps = {
	code: string;
};

export function PlayGame({ code }: PlayGameProps) {
	useEffect(() => {
		window.comeon.game.launch(code);
	}, [code]);

	return (
		<div
			id="game-launch"
			className="relative h-0 pt-[56.25%] overflow-hidden [&>iframe]:absolute [&>iframe]:top-0 [&>iframe]:left-0 [&>iframe]:w-full [&>iframe]:h-full"
		/>
	);
}
