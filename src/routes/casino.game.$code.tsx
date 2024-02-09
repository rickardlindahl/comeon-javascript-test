import {
	Link,
	createFileRoute,
	useNavigate,
	notFound,
	redirect,
} from "@tanstack/react-router";
import { PlayGame } from "../components/play-game";
import { NOT_LOGGED_IN } from "../lib/codes";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

export const Route = createFileRoute("/casino/game/$code")({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated()) {
			throw redirect({
				to: "/",
				search: { error: NOT_LOGGED_IN },
			});
		}
	},
	loader: async ({ context, params }) => {
		const games = await context.casinoApi.getGames({ code: params.code });
		if (games.length === 0) {
			throw notFound();
		}
		return games[0];
	},
	component: PlayGamePage,
	notFoundComponent: GameNotFoundPage,
});

function PlayGamePage() {
	const game = Route.useLoaderData();

	return (
		<div className="grid gap-4">
			<div>
				<Button asChild variant="link">
					<Link to="/casino/explore">
						<Icons.arrowLeft className="h-4 w-4" />
						Back
					</Link>
				</Button>
			</div>

			<h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
				{game.name}
			</h1>

			<PlayGame code={game.code} />
		</div>
	);
}

function GameNotFoundPage() {
	return (
		<div className="grid gap-4">
			<div>
				<Button asChild variant="link">
					<Link to="/casino/explore">
						<Icons.arrowLeft className="h-4 w-4" />
						Back
					</Link>
				</Button>
			</div>

			<h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
				Game not found.
			</h1>
		</div>
	);
}
