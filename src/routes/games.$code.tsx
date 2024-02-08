import { createFileRoute, useNavigate } from "@tanstack/react-router";
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

export const Route = createFileRoute("/games/$code")({
	component: GamePage,
});

function GamePage() {
	const { code } = Route.useParams();
	const navigate = useNavigate();

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
						onClick={async () => {
							await navigate({
								to: "/casino/explore",
							});
						}}
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
