import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { GameItem } from "../components/game-item";
import { CategoryItem } from "../components/category-item";
import { useAuthStore } from "../lib/store";
import { PlayerItem } from "../components/player-item";
import { NOT_LOGGED_IN } from "../lib/codes";
import { LogoutButton } from "../components/logout-button";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "use-debounce";

const gamesSearchSchema = z.object({
	q: z.string().optional(),
	categoryId: z.number().optional(),
});

export const Route = createFileRoute("/casino/explore")({
	component: CasinoExplorePage,
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated()) {
			throw redirect({
				to: "/",
				search: { error: NOT_LOGGED_IN },
			});
		}
	},
	loaderDeps: ({ search: { categoryId, q } }) => ({
		categoryId,
		q,
	}),
	loader: async ({ context, deps: { categoryId, q } }) => {
		const [games, categories] = await Promise.all([
			context.casinoApi.getGames({ categoryIds_like: categoryId, q }),
			context.casinoApi.getAllCategories(),
		]);

		const activeCategory = categories.find(
			(category) => category.id === categoryId,
		);

		return { games, categories, activeCategory };
	},
	staleTime: 30 * 60 * 60 * 1000,
	validateSearch: gamesSearchSchema,
});

function CasinoExplorePage() {
	const { games, categories, activeCategory } = Route.useLoaderData();
	const { q } = Route.useSearch();

	const inputRef = useRef<HTMLInputElement>(null);
	const [inputValue, setInputValue] = useState("");
	const [debouncedValue] = useDebounce(inputValue, 200);

	const player = useAuthStore((state) => state.player);

	const navigate = useNavigate();

	async function onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
		const value = event.target.value;
		setInputValue(value);
	}

	useEffect(() => {
		navigate({
			to: "/casino/explore",
			search: (prev) => ({ ...prev, q: debouncedValue || undefined }),
		});
	}, [debouncedValue, navigate]);

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
						{games.map((game) => (
							<GameItem key={game.code} game={game} />
						))}
						{games.length === 0 && (
							<>
								<p>
									No games found matching "{q}"
									{activeCategory !== undefined
										? ` in category "${activeCategory.name}"`
										: ""}
									.
								</p>
								<button
									className="ui button secondary inverted"
									type="button"
									onClick={() => {
										if (!inputRef.current) return;
										inputRef.current.value = "";
										navigate({ to: "/casino/explore" });
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
								isActive={activeCategory?.id === category.id}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
