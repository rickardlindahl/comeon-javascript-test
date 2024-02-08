import { getAllCategories, getAllGames } from "../lib/api";

export type RouterContext = {
	auth: {
		isAuthenticated: boolean;
	};
	casinoApi: {
		getAllCategories: typeof getAllCategories;
		getAllGames: typeof getAllGames;
	};
};
