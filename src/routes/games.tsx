import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAllCategories, getAllGames } from "../lib/api";
import { GameItem } from "../components/game-item";
import { CategoryItem } from "../components/category-item";
import { useAuthStore } from "../lib/store";
import { PlayerItem } from "../components/player-item";

function redirectToLogin() {
	return redirect({
		to: "/",
		search: { error: "You must be logged in to access this page" },
	});
}

export const Route = createFileRoute("/games")({
	component: GamesPage,
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) {
			throw redirectToLogin();
		}
	},
	loader: () => Promise.all([getAllGames(), getAllCategories()]),
	staleTime: 30 * 60 * 60 * 1000,
});

function GamesPage() {
	const [games, categories] = Route.useLoaderData();

	const player = useAuthStore((state) => state.player);
	if (!player) {
		throw redirectToLogin();
	}

	return (
		<div className="casino">
			<div className="ui grid centered">
				<div className="twelve wide column">
					<div className="ui list">
						<PlayerItem player={player} />
					</div>
					<div className="logout ui left floated secondary button inverted">
						<i className="left chevron icon" />
						Log Out
					</div>
				</div>
				<div className="four wide column">
					<div className="search ui small icon input ">
						<input type="text" placeholder="Search Game" />
						<i className="search icon" />
					</div>
				</div>
			</div>
			<div className="ui grid">
				<div className="twelve wide column">
					<h3 className="ui dividing header">Games</h3>

					<div className="ui relaxed divided game items links">
						{games.map((game) => (
							<GameItem key={game.code} game={game} />
						))}
					</div>
				</div>
				<div className="four wide column">
					<h3 className="ui dividing header">Categories</h3>

					<div className="ui selection animated list category items">
						{categories.map((category) => (
							<CategoryItem key={category.id} category={category} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
