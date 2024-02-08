import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CasinoApi, type Player } from "../types/api";

type AuthState = {
	player: Player | null;
	isLoading: boolean;
	error: string | null;
	username: string | null;

	isAuthenticated: () => boolean;

	login: (
		loginFn: CasinoApi["login"],
		username: string,
		password: string,
	) => Promise<boolean>;
	logout: (logoutFn: CasinoApi["logout"], username: string) => Promise<boolean>;
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

			login: async (loginFn, username, password) => {
				set({ isLoading: true, error: null });

				try {
					const response = await loginFn({ username, password });

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

			logout: async (logoutFn, username) => {
				set({ isLoading: true, error: null });

				try {
					const response = await logoutFn({ username });

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
