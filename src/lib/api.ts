import {
	GetAllCategoriesResponse,
	GetAllGamesResponse,
	LoginResponse,
} from "../types/api";

export async function login(credentials: {
	username: string;
	password: string;
}): Promise<LoginResponse> {
	const res = await fetch("http://localhost:3001/login", {
		method: "POST",
		body: JSON.stringify(credentials),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	return res.json();
}

export async function logout(credentials: {
	username: string;
}): Promise<LoginResponse> {
	const res = await fetch("http://localhost:3001/logout", {
		method: "POST",
		body: JSON.stringify(credentials),
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	return res.json();
}

export async function getAllGames(): Promise<GetAllGamesResponse> {
	const res = await fetch("http://localhost:3001/games", {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	return res.json();
}

export async function getAllCategories(): Promise<GetAllCategoriesResponse> {
	const res = await fetch("http://localhost:3001/categories", {
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
	});
	return res.json();
}
