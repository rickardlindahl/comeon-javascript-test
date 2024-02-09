import { useAuthStore } from "@/lib/store";
import { Icons } from "./icons";
import { UserNav } from "./user-nav";
import { Link } from "@tanstack/react-router";

export function Header() {
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

	return (
		<header>
			<nav
				className="flex items-center justify-between py-6"
				aria-label="Global"
			>
				<div className="flex lg:flex-1">
					<span className="sr-only">ComeOn!</span>
					<Link to="/casino/explore">
						<Icons.logo className="h-8" />
					</Link>
				</div>
				{isAuthenticated() ? <UserNav /> : null}
			</nav>
		</header>
	);
}
