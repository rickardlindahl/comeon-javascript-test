import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "../lib/store";
import { useCasinoApi } from "./casino-api-context";

export function LogoutButton() {
	const { logout, username } = useAuthStore((state) => ({
		logout: state.logout,
		username: state.username,
	}));
	const casinoApi = useCasinoApi();

	const navigate = useNavigate();

	return (
		<button
			className="logout ui left floated secondary button inverted"
			type="button"
			onClick={async () => {
				try {
					const success = await logout(casinoApi.logout, username ?? "");
					if (!success) {
						throw new Error("Failed to logout. Please try again.");
					}

					await navigate({ to: "/" });
				} catch (e) {
					console.error("Failed to logout. Please try again.", e);
					// handle error
				}
			}}
		>
			<i className="left chevron icon" />
			Log Out
		</button>
	);
}
