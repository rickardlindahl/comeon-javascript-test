import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { type Player } from "../types/api";
import { casinoApi } from "./api";

type AuthState = {
	player: Player | null;
	isLoading: boolean;
	error: string | null;
	username: string | null;

	isAuthenticated: () => boolean;

	login: (username: string, password: string) => Promise<boolean>;
	logout: (username: string) => Promise<boolean>;
};

export const useAuthStore = create(
	persist<AuthState>(
		(set, get) => ({
			player: null,
			isLoading: false,
			error: null,
			username: null,

			isAuthenticated: () => {
				const state = get();
				return Boolean(state.username && state.player);
			},

			login: async (username, password) => {
				set({ isLoading: true, error: null });

				try {
					const response = await casinoApi.login({ username, password });

					if (response.status === "fail") {
						set({ isLoading: false, error: "Incorrect username or password." });
						return false;
					}

					set({ isLoading: false, player: response.player, username });
					return true;
				} catch (error) {
					set({
						isLoading: false,
						error: "An error occurred. Please try again.",
					});
					return false;
				}
			},

			logout: async (username) => {
				set({ isLoading: true, error: null });

				try {
					const response = await casinoApi.logout({ username });

					if (response.status === "fail") {
						set({ isLoading: false, error: "User does not exist." });
						return false;
					}

					set({ isLoading: false, player: null, username: null });
					return true;
				} catch (error) {
					set({
						isLoading: false,
						error: "An error occurred. Please try again.",
					});
					return false;
				}
			},
		}),
		{ name: "auth-storage", storage: createJSONStorage(() => sessionStorage) },
	),
);
