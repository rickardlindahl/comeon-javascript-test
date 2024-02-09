import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../lib/store";
import { useCasinoApi } from "./casino-api-context";
import { Icons } from "./icons";
import { Button } from "./ui/button";

export function LogoutButton() {
	const { isLoading, logout, username } = useAuthStore((state) => ({
		isLoading: state.isLoading,
		logout: state.logout,
		username: state.username,
	}));
	const casinoApi = useCasinoApi();

	const navigate = useNavigate();

	return (
		<Button
			className="px-0 flex gap-2"
			variant="ghost"
			disabled={isLoading}
			onClick={async () => {
				try {
					const success = await logout(casinoApi.logout, username ?? "");
					if (!success) {
						throw new Error("Failed to logout. Please try again.");
					}

					await navigate({ to: "/" });
				} catch (e) {
					console.error("Failed to logout. Please try again.", e);
				}
			}}
		>
			<Icons.logOut className="h-4 w-4" />
			Log Out
		</Button>
	);
}
