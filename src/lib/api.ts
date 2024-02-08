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
	async function getAllGames(): Promise<GetAllGamesResponse> {
		const res = await fetch(`${baseUrl}/games`, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		return res.json();
	}

	async function getGameByCode(code: string) {
		const res = await fetch(`${baseUrl}/games?code=${code}`, {
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
		});
		const json = await res.json();
		if (json.length === 0) {
			throw new Error("Game not found");
		}
		return json[0];
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
		getAllGames,
		getGameByCode,
		getAllCategories,
	};
}

export const casinoApi = createCasinoApi(import.meta.env.VITE_API_URL);
