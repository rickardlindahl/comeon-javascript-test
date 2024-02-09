import { Icons } from "./icons";

export function Header() {
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
			</nav>
		</header>
	);
}
