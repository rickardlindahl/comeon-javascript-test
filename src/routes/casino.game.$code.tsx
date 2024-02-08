import {
	Link,
	createFileRoute,
	useNavigate,
	notFound,
} from "@tanstack/react-router";
import { PlayGame } from "../components/play-game";

export const Route = createFileRoute("/casino/game/$code")({
	loader: async ({ context, params }) => {
		const games = await context.casinoApi.getAllGames();
		const { code } = params;
		const game = games.find((game) => game.code === code);
		if (!game) {
			throw notFound();
		}
		return game;
	},
	component: PlayGamePage,
	notFoundComponent: GameNotFoundPage,
});

function PlayGamePage() {
	const game = Route.useLoaderData();
	const navigate = useNavigate();

	return (
		<div className="ui grid">
			<div className="twelve wide column">
				<h3 className="ui dividing header">{game.name}</h3>
				<PlayGame
					code={game.code}
					onBackClicked={async () => {
						await navigate({
							to: "/casino/explore",
						});
					}}
				/>
			</div>
		</div>
	);
}

function GameNotFoundPage() {
	return (
		<div>
			<h1>Game not found.</h1>
			<Link to="/casino/explore">Explore games</Link>
		</div>
	);
}
