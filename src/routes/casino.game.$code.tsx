import {
	Link,
	createFileRoute,
	notFound,
	redirect,
} from "@tanstack/react-router";
import { PlayGame } from "../components/play-game";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { toast } from "sonner";

export const Route = createFileRoute("/casino/game/$code")({
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated()) {
			toast.error("You must be logged in to play games");

			throw redirect({ to: "/" });
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

function BackButton() {
	return (
		<Button asChild variant="link" className="px-0">
			<Link to="/casino/explore">
				<Icons.arrowLeft className="h-4 w-4" />
				Back
			</Link>
		</Button>
	);
}

function PlayGamePage() {
	const game = Route.useLoaderData();

	return (
		<div className="grid gap-4 py-4">
			<div>
				<BackButton />
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
		<div className="grid gap-4 py-4">
			<div>
				<BackButton />
			</div>

			<h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
				Game not found.
			</h1>
		</div>
	);
}
