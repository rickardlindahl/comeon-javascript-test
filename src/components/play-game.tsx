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
	onBackClicked: () => void;
};

export function PlayGame({ code, onBackClicked }: PlayGameProps) {
	useEffect(() => {
		window.comeon.game.launch(code);
	}, [code]);

	return (
		<div className="ingame">
			<div className="ui grid centered">
				<div className="three wide column">
					<button
						type="button"
						className="ui right floated secondary button inverted"
						onClick={onBackClicked}
					>
						<i className="left chevron icon" />
						Back
					</button>
				</div>
				<div className="ten wide column">
					<div id="game-launch" />
				</div>
				<div className="three wide column" />
			</div>
		</div>
	);
}
