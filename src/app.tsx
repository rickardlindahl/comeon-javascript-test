import { RouterProvider, createRouter } from "@tanstack/react-router";

import { CasinoApiProvider } from "./components/casino-api-context";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { createCasinoApi } from "./lib/api";
import { useAuthStore } from "./lib/store";

const casinoApi = createCasinoApi(import.meta.env.VITE_API_URL);

// Create a new router instance
const router = createRouter({
	routeTree,
	context: {
		auth: {
			isAuthenticated: () => false,
		},
		casinoApi,
	},
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export function App() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	return (
		<CasinoApiProvider casinoApi={casinoApi}>
			<RouterProvider
				router={router}
				context={{
					auth: {
						isAuthenticated,
					},
					casinoApi,
				}}
			/>
		</CasinoApiProvider>
	);
}
