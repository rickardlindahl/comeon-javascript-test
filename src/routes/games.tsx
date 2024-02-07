import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/games")({
	component: GamesPage,
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: "/",
				search: {
					error: "You must be logged in to access this page",
				},
			});
		}
	},
});

function GamesPage() {
	return <div>GAMES!</div>;
}
