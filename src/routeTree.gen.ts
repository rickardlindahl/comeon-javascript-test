/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as GamesImport } from './routes/games'
import { Route as IndexImport } from './routes/index'
import { Route as GamesCodeImport } from './routes/games.$code'

// Create/Update Routes

const GamesRoute = GamesImport.update({
  path: '/games',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const GamesCodeRoute = GamesCodeImport.update({
  path: '/$code',
  getParentRoute: () => GamesRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/games': {
      preLoaderRoute: typeof GamesImport
      parentRoute: typeof rootRoute
    }
    '/games/$code': {
      preLoaderRoute: typeof GamesCodeImport
      parentRoute: typeof GamesImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  GamesRoute.addChildren([GamesCodeRoute]),
])

/* prettier-ignore-end */
