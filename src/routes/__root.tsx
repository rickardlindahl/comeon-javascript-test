import React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { RouterContext } from "../types/router";
import { Header } from "@/components/header";

const TanStackRouterDevtools =
	process.env.NODE_ENV === "production"
		? () => null // Render nothing in production
		: React.lazy(() =>
				// Lazy load in development
				import("@tanstack/router-devtools").then((res) => ({
					default: res.TanStackRouterDevtools,
					// For Embedded Mode
					// default: res.TanStackRouterDevtoolsPanel
				})),
		  );

export const Route = createRootRouteWithContext<RouterContext>()({
	component: RootComponent,
	notFoundComponent: RouteNotFoundComponent,
});

function RootComponent() {
	return (
		<>
			<Header />
			<div className="main container">
				<Outlet />
			</div>
			<React.Suspense>
				<TanStackRouterDevtools />
			</React.Suspense>
		</>
	);
}

function RouteNotFoundComponent() {
	return (
		<div>
			<h1>404 Not Found</h1>
		</div>
	);
}
