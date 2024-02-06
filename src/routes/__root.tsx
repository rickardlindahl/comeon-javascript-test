import React from "react";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

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

export const Route = createRootRoute({
    component: () => (
        <>
            <Link to="/" className="[&.active]:font-bold">
                Home
            </Link>
            <hr />
            <Outlet />
            <React.Suspense>
                <TanStackRouterDevtools />
            </React.Suspense>
        </>
    ),
});
