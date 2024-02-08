import { createContext, useContext } from "react";
import { CasinoApi } from "../types/api";

const CasinoApiContext = createContext<CasinoApi>({
	login: async () => {
		throw new Error("No CasinoApiProvider found");
	},
	logout: async () => {
		throw new Error("No CasinoApiProvider found");
	},
	getGames: async () => {
		throw new Error("No CasinoApiProvider found");
	},
	getAllCategories: async () => {
		throw new Error("No CasinoApiProvider found");
	},
});

export const useCasinoApi = () => {
	const context = useContext(CasinoApiContext);
	if (!context) {
		throw new Error("useApi must be used within an ApiProvider");
	}
	return context;
};

export const CasinoApiProvider = ({
	casinoApi,
	children,
}: React.PropsWithChildren<{ casinoApi: CasinoApi }>) => {
	return (
		<CasinoApiContext.Provider value={casinoApi}>
			{children}
		</CasinoApiContext.Provider>
	);
};
