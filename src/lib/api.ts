import {
	GetAllCategoriesResponse,
	GetAllGamesResponse,
	LoginResponse,
} from "../types/api";

export function createCasinoApi(baseUrl: string) {
	async function login(credentials: {
		username: string;
		password: string;
	}): Promise<LoginResponse> {
		const res = await fetch(`${baseUrl}/login`, {
			method: "POST",
			body: JSON.stringify(credentials),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		return res.json();
	}
	async function logout(credentials: {
		username: string;
	}): Promise<LoginResponse> {
		const res = await fetch(`${baseUrl}/logout`, {
			method: "POST",
			body: JSON.stringify(credentials),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		return res.json();
	}

	type GetGamesOptions = {
		code?: string;
	};

	async function getGames(
		options: GetGamesOptions = {},
	): Promise<GetAllGamesResponse> {
		const searchParams = new URLSearchParams();
		if (options.code) {
			searchParams.append("code", options.code);
		}

		const queryString =
			searchParams.size > 0 ? `?${searchParams.toString()}` : "";

		const res = await fetch(`${baseUrl}/games${queryString}`, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		return res.json();
	}

	async function getAllCategories(): Promise<GetAllCategoriesResponse> {
		const res = await fetch(`${baseUrl}/categories`, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		return res.json();
	}

	return {
		login,
		logout,
		getGames,
		getAllCategories,
	};
}

export const casinoApi = createCasinoApi(import.meta.env.VITE_API_URL);
