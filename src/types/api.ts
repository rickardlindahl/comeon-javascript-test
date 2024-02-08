import { createCasinoApi } from "../lib/api";

export type Player = {
	name: string;
	avatar: string;
	event: string;
};

export type Game = {
	name: string;
	description: string;
	code: string;
	icon: string;
	categoryIds: number[];
};

export type Category = {
	name: string;
	id: number;
};

export type LoginResponse =
	| { status: "success"; player: Player }
	| { status: "fail"; error: string };

export type LogoutResponse =
	| { status: "success" }
	| { status: "fail"; error: string };

export type GetAllGamesResponse = Game[];

export type GetAllCategoriesResponse = Category[];

export type CasinoApi = ReturnType<typeof createCasinoApi>;
