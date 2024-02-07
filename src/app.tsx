import { RouterProvider, createRouter } from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { useAuthStore } from "./lib/store";

// Create a new router instance
const router = createRouter({
	routeTree,
	context: {
		auth: {
			isAuthenticated: false,
		},
	},
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

export function App() {
	const auth = useAuthStore();
	return (
		<RouterProvider
			router={router}
			context={{
				auth: {
					isAuthenticated: Boolean(auth.player),
				},
			}}
		/>
	);
}
