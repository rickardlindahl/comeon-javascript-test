import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { GameItem } from "../components/game-item";
import { CategoryItem } from "../components/category-item";
import { useAuthStore } from "../lib/store";
import { PlayerItem } from "../components/player-item";
import { Game } from "../types/api";
import { NOT_LOGGED_IN } from "../lib/codes";
import { LogoutButton } from "../components/logout-button";

function isGameMatchingSearch(game: Game, search: string) {
	return (
		game.name.toLowerCase().includes(search.toLowerCase()) ||
		game.description.toLowerCase().includes(search.toLowerCase())
	);
}

const gamesSearchSchema = z.object({
	filterGames: z.string().optional(),
	filterCategories: z.number().optional(),
});

export const Route = createFileRoute("/casino/explore")({
	component: CasinoExplorePage,
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({
				to: "/",
				search: { error: NOT_LOGGED_IN },
			});
		}
	},
	loader: ({ context }) =>
		Promise.all([
			context.casinoApi.getAllGames(),
			context.casinoApi.getAllCategories(),
		]),
	staleTime: 30 * 60 * 60 * 1000,
	validateSearch: gamesSearchSchema,
});

function CasinoExplorePage() {
	const [games, categories] = Route.useLoaderData();
	const { filterCategories, filterGames } = Route.useSearch();

	const player = useAuthStore((state) => state.player);

	const navigate = useNavigate();

	async function onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		await navigate({
			to: "/casino/explore",
			search: (prev) => ({ ...prev, filterGames: value }),
		});
	}

	function getCategoryById(id: number) {
		return categories.find((category) => category.id === id);
	}

	const gamesFilteredByCategory =
		filterCategories !== undefined
			? games.filter((game) => game.categoryIds.includes(filterCategories))
			: games;

	const filteredGames = filterGames
		? gamesFilteredByCategory.filter((game) =>
				isGameMatchingSearch(game, filterGames),
		  )
		: gamesFilteredByCategory;

	return (
		<div className="casino">
			<div className="ui grid centered">
				<div className="twelve wide column">
					<div className="ui list">
						{player && <PlayerItem player={player} />}
					</div>
					<LogoutButton />
				</div>
				<div className="four wide column">
					<div className="search ui small icon input ">
						<input
							type="text"
							placeholder="Search Game"
							onChange={onSearchChange}
						/>
						<i className="search icon" />
					</div>
				</div>
			</div>
			<div className="ui grid">
				<div className="twelve wide column">
					<h3 className="ui dividing header">Games</h3>

					<div className="ui relaxed divided game items links">
						{filteredGames.map((game) => (
							<GameItem key={game.code} game={game} />
						))}
						{filteredGames.length === 0 && (
							<>
								<p>
									No games found matching "{filterGames}"
									{filterCategories !== undefined
										? ` in category "${
												getCategoryById(filterCategories)?.name
										  }"`
										: ""}
									.
								</p>
								<button
									className="ui button secondary inverted"
									type="button"
									onClick={() => navigate({ to: "/casino/explore" })}
								>
									Reset filters
								</button>
							</>
						)}
					</div>
				</div>
				<div className="four wide column">
					<h3 className="ui dividing header">Categories</h3>

					<div className="ui selection animated list category items">
						{categories.map((category) => (
							<CategoryItem
								key={category.id}
								category={category}
								isActive={filterCategories === category.id}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
