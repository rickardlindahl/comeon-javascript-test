import { Link } from "@tanstack/react-router";
import { Game } from "../types/api";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export function GameItem({ game }: { game: Game }) {
	return (
		<Card className="flex flex-col justify-between">
			<CardHeader className="relative">
				<CardTitle>
					<Dialog>
						<DialogTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="absolute top-4 right-0"
							>
								<Icons.info className="h-4 w-4" />
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>{game.name}</DialogTitle>
								<DialogDescription>{game.description}</DialogDescription>
							</DialogHeader>
							<DialogFooter>
								<Button asChild variant="default" size="lg">
									<Link
										to="/casino/game/$code"
										params={{ code: game.code }}
										className="play ui right floated secondary button inverted"
									>
										Play
										<i className="right chevron icon" />
									</Link>
								</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
					{game.name}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="flex justify-center">
					<img
						src={`/${game.icon}`}
						alt={game.name}
						className="w-auto max-h-32 margin-x-auto"
					/>
				</div>
				<p className="line-clamp-3">{game.description}</p>
			</CardContent>
			<CardFooter className="flex items-center justify-center">
				<Button asChild variant="default" size="lg">
					<Link
						to="/casino/game/$code"
						params={{ code: game.code }}
						className="play ui right floated secondary button inverted"
					>
						Play
						<i className="right chevron icon" />
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}

/*



*/
