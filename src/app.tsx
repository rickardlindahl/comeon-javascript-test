import { RouterProvider, createRouter } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { createCasinoApi } from "./lib/api";
import { useAuthStore } from "./lib/store";

// Create a new router instance
const router = createRouter({
	routeTree,
	context: {
		auth: {
			isAuthenticated: () => false,
		},
		casinoApi: createCasinoApi(""),
	},
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const queryClient = new QueryClient();

export function App() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider
				router={router}
				context={{
					auth: {
						isAuthenticated,
					},
					casinoApi: createCasinoApi(import.meta.env.VITE_API_URL),
				}}
			/>
		</QueryClientProvider>
	);
}
