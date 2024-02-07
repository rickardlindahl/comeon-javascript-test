import React from "react";
import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";

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

type RouterContext = {
	auth: {
		isAuthenticated: boolean;
	};
};

export const Route = createRootRouteWithContext<RouterContext>()({
	component: () => (
		<>
			<RootComponent />
			<React.Suspense>
				<TanStackRouterDevtools />
			</React.Suspense>
		</>
	),
});

function RootComponent() {
	return (
		<>
			<div className="ui one column center aligned page grid">
				<div className="column twelve wide">
					<img src="images/logo.svg" alt="logo" />
				</div>
			</div>
			<div className="main container">
				<Outlet />
			</div>
		</>
	);
}
