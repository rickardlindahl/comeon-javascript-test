import { useAuthStore } from "@/lib/store";
import { Icons } from "./icons";
import { UserNav } from "./user-nav";

export function Header() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	return (
		<header>
			<nav
				className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<span className="sr-only">Your Company</span>
					<Icons.logo className="h-8" />
				</div>
				{isAuthenticated() ? <UserNav /> : null}
			</nav>
		</header>
	);
}
