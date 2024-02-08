import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { PlayGame } from "../components/play-game";

export const Route = createFileRoute("/casino/game/$code")({
	component: PlayGamePage,
});

function PlayGamePage() {
	const { code } = Route.useParams();
	const navigate = useNavigate();

	return (
		<PlayGame
			code={code}
			onBackClicked={async () => {
				await navigate({
					to: "/casino/explore",
				});
			}}
		/>
	);
}
