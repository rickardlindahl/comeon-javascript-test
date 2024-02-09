import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthStore } from "@/lib/store";
import { LogoutButton } from "./logout-button";

function splitName(name: string) {
	const [first, last] = name.split(" ");
	return { first, last };
}

function getInitials(name: string) {
	const { first, last } = splitName(name);
	return `${first.charAt(0)}${last.charAt(0)}`;
}

export function UserNav() {
	const { username, player } = useAuthStore((state) => ({
		username: state.username,
		player: state.player,
	}));

	if (!username || !player) {
		return null;
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="relative h-8 w-8 rounded-full">
					<Avatar className="h-9 w-9">
						<AvatarImage src={`/${player.avatar}`} alt={player.name} />
						<AvatarFallback>{getInitials(player.name)}</AvatarFallback>
					</Avatar>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="w-56" align="end" forceMount>
				<DropdownMenuLabel className="font-normal">
					<div className="flex flex-col space-y-1">
						<p className="text-sm font-medium leading-none">{player.name}</p>
						<p className="text-xs leading-none text-muted-foreground">
							{username}
						</p>
					</div>
				</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem className="w-full cursor-pointer">
					<LogoutButton />
					<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
