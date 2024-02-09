import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CasinoApi, type Player } from "../types/api";
import { toast } from "sonner";

type AuthState = {
	player: Player | null;
	isLoading: boolean;
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
			username: null,

			isAuthenticated: () => {
				const state = get();
				return Boolean(state.username && state.player);
			},

			login: async (loginFn, username, password) => {
				set({ isLoading: true });
				const loadingToast = toast.loading("Logging in...");

				try {
					const response = await loginFn({ username, password });
					toast.dismiss(loadingToast);

					if (response.status === "fail") {
						set({ isLoading: false });

						toast.error("Incorrect username or password.");

						return false;
					}

					set({ isLoading: false, player: response.player, username });

					toast.success(`Welcome back ${response.player.name}!`);
					setTimeout(() => {
						toast.success(response.player.event);
					}, 2500);

					return true;
				} catch (error) {
					set({ isLoading: false });
					toast.dismiss(loadingToast);

					toast.error("An error occurred. Please try again.");

					return false;
				}
			},

			logout: async (logoutFn, username) => {
				set({ isLoading: true });
				const loadingToast = toast.loading("Logging out...");

				try {
					const response = await logoutFn({ username });
					toast.dismiss(loadingToast);

					if (response.status === "fail") {
						set({ isLoading: false });

						toast.error("Invalid credentials.");

						return false;
					}

					set({ isLoading: false, player: null, username: null });

					toast.success("You have been logged out. Welcome back soon!");

					return true;
				} catch (error) {
					set({ isLoading: false });
					toast.dismiss(loadingToast);

					toast.error("An error occurred. Please try again.");

					return false;
				}
			},
		}),
		{ name: "auth-storage", storage: createJSONStorage(() => sessionStorage) },
	),
);
