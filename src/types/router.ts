import { CasinoApi } from "./api";

export type RouterContext = {
	auth: {
		isAuthenticated: () => boolean;
	};
	casinoApi: CasinoApi;
};
