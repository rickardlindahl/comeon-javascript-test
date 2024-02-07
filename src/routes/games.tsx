import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/games")({
	component: GamesPage,
});

function GamesPage() {
	return <div>GAMES!</div>;
}
