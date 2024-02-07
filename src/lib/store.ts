import { create } from "zustand";
import { type Player } from "../types/api";
import * as CasinoApi from "../lib/api";

type AuthState = {
	player: Player | null;
	isLoading: boolean;
	error: string | null;

	login: (username: string, password: string) => Promise<boolean>;
};

export const useAuthStore = create<AuthState>((set) => ({
	player: null,
	isLoading: false,
	error: null,

	login: async (username, password) => {
		set({ isLoading: true, error: null });

		try {
			const response = await CasinoApi.login({ username, password });

			if (response.status === "fail") {
				set({ isLoading: false, error: "Incorrect username or password." });
				return false;
			}

			set({ isLoading: false, player: response.player });
			return true;
		} catch (error) {
			set({ isLoading: false, error: "An error occurred. Please try again." });
			return false;
		}
	},
}));
