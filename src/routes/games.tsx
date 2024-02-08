import {
	Outlet,
	createFileRoute,
	redirect,
	useMatchRoute,
	useNavigate,
} from "@tanstack/react-router";
import { z } from "zod";
import { getAllCategories, getAllGames } from "../lib/api";
import { GameItem } from "../components/game-item";
import { CategoryItem } from "../components/category-item";
import { useAuthStore } from "../lib/store";
import { PlayerItem } from "../components/player-item";
import { Category, Game } from "../types/api";
import { NOT_LOGGED_IN } from "../lib/codes";

function redirectToLogin() {
	return redirect({
		to: "/",
		search: { error: NOT_LOGGED_IN },
	});
}

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

export const Route = createFileRoute("/games")({
	component: GamesPage,
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) {
			throw redirectToLogin();
		}
	},
	loader: () => Promise.all([getAllGames(), getAllCategories()]),
	staleTime: 30 * 60 * 60 * 1000,
	validateSearch: gamesSearchSchema,
});

function GamesPage() {
	const [games, categories] = Route.useLoaderData();
	const { filterCategories, filterGames } = Route.useSearch();

	const player = useAuthStore((state) => state.player);
	if (!player) {
		throw redirectToLogin();
	}

	const matchRoute = useMatchRoute();
	const params = matchRoute({ to: "/games/$code" });
	const isPlayingGame = params !== false;

	const navigate = useNavigate();

	async function playGame(game: Game) {
		await navigate({ to: "/games/$code", params: { code: game.code } });
	}

	async function handleCategoryClick(category: Category) {
		await navigate({
			to: "/games",
			search: () => ({ filterCategories: category.id }),
		});
	}

	async function onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		await navigate({
			to: "/games",
			search: () => ({ filterGames: value, filterCategories }),
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
		<>
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
						{!isPlayingGame && (
							<div className="search ui small icon input ">
								<input
									type="text"
									placeholder="Search Game"
									onChange={onSearchChange}
								/>
								<i className="search icon" />
							</div>
						)}
					</div>
				</div>
				{!isPlayingGame && (
					<div className="ui grid">
						<div className="twelve wide column">
							<h3 className="ui dividing header">Games</h3>

							<div className="ui relaxed divided game items links">
								{filteredGames.map((game) => (
									<GameItem
										key={game.code}
										game={game}
										onPlayClicked={playGame}
									/>
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
											onClick={() => navigate({ to: "/games" })}
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
										onCategoryClick={handleCategoryClick}
										isActive={category.id === filterCategories}
									/>
								))}
							</div>
						</div>
					</div>
				)}
			</div>
			<Outlet />
		</>
	);
}
