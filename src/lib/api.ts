import {
	GetCategoriesResponse,
	GetGamesResponse,
	LoginResponse,
	LogoutResponse,
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
	}): Promise<LogoutResponse> {
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
		categoryIds_like?: number;
		q?: string;
	};

	async function getGames(
		options: GetGamesOptions = {},
	): Promise<GetGamesResponse> {
		const searchParams = new URLSearchParams();
		if (options.code) {
			searchParams.append("code", options.code);
		}

		if (options.categoryIds_like !== undefined) {
			searchParams.append(
				"categoryIds_like",
				options.categoryIds_like.toString(),
			);
		}

		if (options.q) {
			searchParams.append("q", options.q);
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

	async function getCategories(): Promise<GetCategoriesResponse> {
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
		getCategories,
	};
}
