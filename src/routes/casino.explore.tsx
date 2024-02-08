import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { GameItem } from "../components/game-item";
import { CategoryItem } from "../components/category-item";
import { useAuthStore } from "../lib/store";
import { PlayerItem } from "../components/player-item";
import { Game } from "../types/api";
import { NOT_LOGGED_IN } from "../lib/codes";
import { LogoutButton } from "../components/logout-button";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

function isGameMatchingSearch(game: Game, search: string) {
	return (
		game.name.toLowerCase().includes(search.toLowerCase()) ||
		game.description.toLowerCase().includes(search.toLowerCase())
	);
}

const gamesSearchSchema = z.object({
	filterGames: z.string().optional(),
	categoryId: z.number().optional(),
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
	loaderDeps: ({ search: { categoryId, filterGames } }) => ({
		filterGames,
		categoryId,
	}),
	loader: ({ context, deps: { categoryId } }) =>
		Promise.all([
			context.casinoApi.getGames({ categoryIds_like: categoryId }),
			context.casinoApi.getAllCategories(),
		]),
	staleTime: 30 * 60 * 60 * 1000,
	validateSearch: gamesSearchSchema,
});

function CasinoExplorePage() {
	const [games, categories] = Route.useLoaderData();
	const { categoryId, filterGames } = Route.useSearch();

	const inputRef = useRef<HTMLInputElement>(null);
	const [inputValue, setInputValue] = useState("");
	const [debouncedValue] = useDebounce(inputValue, 200);

	const player = useAuthStore((state) => state.player);

	const navigate = useNavigate();

	async function onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		setInputValue(value);
	}

	function getCategoryById(id: number) {
		return categories.find((category) => category.id === id);
	}

	useEffect(() => {
		navigate({
			to: "/casino/explore",
			search: (prev) => ({ ...prev, filterGames: debouncedValue || undefined }),
		});
	}, [debouncedValue, navigate]);

	const filteredGames = filterGames
		? games.filter((game) => isGameMatchingSearch(game, filterGames))
		: games;

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
							ref={inputRef}
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
									{categoryId !== undefined
										? ` in category "${getCategoryById(categoryId)?.name}"`
										: ""}
									.
								</p>
								<button
									className="ui button secondary inverted"
									type="button"
									onClick={() => {
										if (!inputRef.current) return;
										setInputValue("");
										inputRef.current.value = "";
									}}
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
								isActive={categoryId === category.id}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
