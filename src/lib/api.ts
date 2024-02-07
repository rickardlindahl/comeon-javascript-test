import { LoginResponse } from "../types/api";

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
