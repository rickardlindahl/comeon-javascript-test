export type Player = {
	name: string;
	avatar: string;
	event: string;
};

export type LoginResponse =
	| { status: "success"; player: Player }
	| { status: "fail"; error: string };
