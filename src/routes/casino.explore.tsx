import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { GameItem } from "../components/game-item";
import { CategoryItem } from "../components/category-item";
import { NOT_LOGGED_IN } from "../lib/codes";
import { SearchGameInput } from "../components/search-game-input";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
			context.casinoApi.getCategories(),
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

	const navigate = useNavigate();

	return (
		<div className="flex flex-col gap-4">
			<div className="md:hidden">
				<SearchGameInput
					onInputChange={(q) => {
						navigate({
							to: "/casino/explore",
							search: (prev) => ({ ...prev, q: q || undefined }),
						});
					}}
				/>
			</div>
			<ScrollArea className="whitespace-nowrap">
				<div className="flex flex-row gap-4">
					{categories.map((category) => (
						<CategoryItem
							key={category.id}
							category={category}
							isActive={activeCategory?.id === category.id}
						/>
					))}
				</div>
				<ScrollBar orientation="horizontal" />
			</ScrollArea>
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
							</>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
